#!/usr/bin/env python3
"""Start a prototype for one idea from the deck.

    python3 scripts/new_idea.py 27            # idea id as listed in assets/js/ideas.js
    python3 scripts/new_idea.py 27 buddy-bot  # optional custom folder slug

What it does:
  1. looks the idea up in assets/js/ideas.js (so id, title and area are never typed by hand)
  2. copies ideas/_template/index.html to ideas/<id>-<slug>/index.html with the placeholders filled in
  3. prints the lines you must change in your entry in assets/js/ideas.js

It never edits ideas.js for you, so two people building different ideas cannot collide.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IDEAS_JS = ROOT / "assets" / "js" / "ideas.js"
TEMPLATE = ROOT / "ideas" / "_template" / "index.html"


def find_idea(idea_id):
    text = IDEAS_JS.read_text(encoding="utf-8")
    m = re.search(r"\{\s*id:\s*'%s'(.*?)\n  \}" % re.escape(idea_id), text, re.S)
    if not m:
        return None
    block = m.group(1)
    title = re.search(r"title:\s*'((?:[^'\\]|\\.)*)'", block)
    area = re.search(r"area:\s*'(\w+)'", block)
    status = re.search(r"status:\s*'(\w+)'", block)
    return {
        "title": title.group(1).replace("\\'", "'") if title else idea_id,
        "area": area.group(1) if area else "",
        "status": status.group(1) if status else "",
    }


def area_label(key):
    text = IDEAS_JS.read_text(encoding="utf-8")
    m = re.search(r"%s:\s*\{\s*label:\s*'([^']+)'" % re.escape(key), text)
    return m.group(1) if m else key


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 1
    idea_id = sys.argv[1].zfill(2)
    idea = find_idea(idea_id)
    if not idea:
        print("Idea '%s' is not in assets/js/ideas.js. Add it there first (see docs/ADDING_AN_IDEA.md)." % idea_id)
        return 1
    slug = sys.argv[2] if len(sys.argv) > 2 else re.sub(r"[^a-z0-9]+", "-", idea["title"].lower()).strip("-")[:40].strip("-")
    folder = ROOT / "ideas" / ("%s-%s" % (idea_id, slug))
    if folder.exists():
        print("%s already exists. Nothing was changed." % folder.relative_to(ROOT))
        return 1
    html = TEMPLATE.read_text(encoding="utf-8")
    for k, v in {"{{ID}}": idea_id, "{{TITLE}}": idea["title"], "{{AREA}}": area_label(idea["area"])}.items():
        html = html.replace(k, v)
    folder.mkdir(parents=True)
    (folder / "index.html").write_text(html, encoding="utf-8")
    rel = folder.relative_to(ROOT).as_posix()
    print("Created %s/index.html\n" % rel)
    print("Next, in assets/js/ideas.js, in the entry for id '%s' ONLY:" % idea_id)
    print("  status: 'built',")
    print("  path: '%s/index.html'," % rel)
    print("  shows: ['What the prototype shows', 'One bullet per thing a viewer can do'],\n")
    print("Then run the studio:  python3 server.py   and open http://localhost:8000/index.html#%s" % idea_id)
    print("Before you commit:    python3 scripts/check.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
