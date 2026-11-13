#!/usr/bin/env python3
"""Change the studio password.

    python3 scripts/set_password.py

Asks for the new password (hidden), then rewrites the hash in assets/js/gate.js.
The gate is client-side: it keeps casual visitors out of a public GitHub Pages site, it is not real security.
Do not put confidential data in this repository.
"""
import getpass
import hashlib
import re
import sys
from pathlib import Path

GATE = Path(__file__).resolve().parent.parent / "assets" / "js" / "gate.js"


def main():
    src = GATE.read_text(encoding="utf-8")
    salt = re.search(r"var SALT = '([^']+)'", src).group(1)
    iters = int(re.search(r"var ITER = (\d+)", src).group(1))
    pw = getpass.getpass("New password: ")
    if len(pw) < 8:
        print("Use at least 8 characters.")
        return 1
    if pw != getpass.getpass("Repeat it:    "):
        print("Passwords do not match.")
        return 1
    digest = hashlib.pbkdf2_hmac("sha256", pw.encode("utf-8"), salt.encode("utf-8"), iters).hex()
    GATE.write_text(re.sub(r"var HASH = '[0-9a-f]+'", "var HASH = '%s'" % digest, src), encoding="utf-8")
    # Version the script URL so browsers and CDNs do not serve an old gate.js.
    root = GATE.parent.parent.parent
    for page in root.rglob("*.html"):
        if ".git" in page.parts:
            continue
        text = page.read_text(encoding="utf-8")
        new = re.sub(r'(assets/js/gate\.js)(\?v=\w+)?"', r'\1?v=%s"' % digest[:8], text)
        if new != text:
            page.write_text(new, encoding="utf-8")
    print("Updated assets/js/gate.js and the page links. Commit and tell the team the new password.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
