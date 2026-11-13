#!/usr/bin/env python3
"""Sanity checks for the ideas catalogue and the prototypes. Run before every commit:

    python3 scripts/check.py

Exit code 0 = all good, 1 = something to fix. No dependencies beyond Python 3.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IDEAS_JS = ROOT / "assets" / "js" / "ideas.js"
STATUSES = {"built", "todo", "deck"}

errors, warnings = [], []


def err(msg):
    errors.append(msg)


def warn(msg):
    warnings.append(msg)


def load_entries(text):
    """Split ideas.js into one text block per idea (blocks start at `id: 'NN'`)."""
    start = text.index("window.XM_IDEAS")
    body = text[start:]
    parts = re.split(r"\n  \{\n\s+id:\s*'", body)[1:]
    entries = []
    for p in parts:
        m = re.match(r"(\w+)'", p)
        entries.append((m.group(1) if m else "?", p))
    return entries


def field(block, name):
    m = re.search(r"\b%s:\s*'((?:[^'\\]|\\.)*)'" % name, block)
    return m.group(1) if m else None


def main():
    if not IDEAS_JS.exists():
        err("assets/js/ideas.js is missing")
        return finish()
    text = IDEAS_JS.read_text(encoding="utf-8")

    areas = set(re.findall(r"^\s{2}(\w+):\s*\{\s*label:", text.split("window.XM_AREAS")[1].split("};")[0], re.M))
    if not areas:
        err("No areas found in XM_AREAS")

    entries = load_entries(text)
    if not entries:
        err("No ideas found in XM_IDEAS")

    seen, last = set(), None
    built_paths = {}
    counts = {"built": 0, "todo": 0, "deck": 0}
    for idea_id, block in entries:
        tag = "idea %s" % idea_id
        if not re.fullmatch(r"\d\d", idea_id):
            err("%s: id must be two digits, e.g. '07'" % tag)
        if idea_id in seen:
            err("%s: duplicate id" % tag)
        seen.add(idea_id)
        if last is not None and idea_id < last:
            warn("%s: ids should stay in deck order (after %s)" % (tag, last))
        last = idea_id

        area, status, title = field(block, "area"), field(block, "status"), field(block, "title")
        if not title:
            err("%s: missing title" % tag)
        if area not in areas:
            err("%s: area '%s' is not one of %s" % (tag, area, sorted(areas)))
        if status not in STATUSES:
            err("%s: status must be one of %s, got '%s'" % (tag, sorted(STATUSES), status))
            continue
        counts[status] += 1

        pr = re.search(r"shortlist:\s*\{\s*priority:\s*(\d)", block)
        if pr and pr.group(1) not in ("1", "2"):
            err("%s: shortlist priority must be 1 or 2" % tag)
        if status == "todo" and not pr:
            warn("%s: status 'todo' but no shortlist entry" % tag)

        for img in re.findall(r"'(assets/deck/[^']+)'", block):
            if not (ROOT / img).exists():
                err("%s: image not found: %s" % (tag, img))

        path = field(block, "path")
        if status == "built":
            if not path:
                err("%s: status 'built' needs a path" % tag)
            elif not (ROOT / path).exists():
                err("%s: path does not exist: %s" % (tag, path))
            else:
                built_paths[path] = idea_id
                check_page(idea_id, ROOT / path)
            if not re.search(r"\bshows:\s*\[\s*'", block):
                err("%s: status 'built' needs a non-empty shows: [...]" % tag)
        elif path:
            warn("%s: has a path but status is '%s'; set status: 'built'" % (tag, status))

    # folders on disk that no idea points to
    for d in sorted((ROOT / "ideas").iterdir()):
        if d.is_dir() and not d.name.startswith("_"):
            rel = "ideas/%s/index.html" % d.name
            if rel not in built_paths:
                warn("%s is not linked from any idea in ideas.js" % rel)
            if not re.match(r"\d\d-[a-z0-9-]+$", d.name):
                warn("folder name '%s' should look like 10-xmp-spread-saver" % d.name)

    print("%d ideas: %d built, %d to build, %d deck only" % (len(entries), counts["built"], counts["todo"], counts["deck"]))
    return finish()


def check_page(idea_id, page):
    rel = page.relative_to(ROOT).as_posix()
    html = page.read_text(encoding="utf-8")
    if "assets/js/gate.js" not in html:
        err("%s: missing the gate.js script (password gate)" % rel)
    elif html.find("gate.js") > html.find("<style"):
        warn("%s: gate.js should be the first script in <head>" % rel)
    if "assets/css/xm.css" not in html:
        err("%s: missing assets/css/xm.css" % rel)
    if "assets/js/common.js" not in html:
        err("%s: missing assets/js/common.js" % rel)
    m = re.search(r"assets/js/review\.js\"\s+data-idea=\"(\d+)\"", html)
    if not m:
        err("%s: missing <script src=\"../../assets/js/review.js\" data-idea=\"%s\"></script>" % (rel, idea_id))
    elif m.group(1) != idea_id:
        err("%s: data-idea=\"%s\" does not match the idea id %s" % (rel, m.group(1), idea_id))
    if "XM.notes(" not in html:
        warn("%s: no XM.notes({...}) 'What changes?' panel" % rel)
    if "{{" in html:
        err("%s: still contains template placeholders ({{...}})" % rel)
    if re.search(r"(?:src|href)=\"https?://(?!fonts\.)", html):
        warn("%s: loads an external file; prototypes should work offline" % rel)
    if re.search(r"(?:src|href)=\"/", html):
        err("%s: uses an absolute path; use relative paths like ../../assets/..." % rel)
    for ref in re.findall(r"(?:src|href)=\"((?:\.\./)+assets/[^\"?#]+)", html):
        if not (page.parent / ref).resolve().exists():
            err("%s: referenced file not found: %s" % (rel, ref))


def finish():
    for w in warnings:
        print("warning: " + w)
    for e in errors:
        print("ERROR:   " + e)
    if errors:
        print("\n%d error(s). Fix them before you commit." % len(errors))
        return 1
    print("OK" + (" (%d warning(s))" % len(warnings) if warnings else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
