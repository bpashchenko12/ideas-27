# Contributing

## Workflow

1. Get the repository and start a branch named after the idea:

   ```bash
   git clone <repository-url>
   cd <repository>
   git checkout -b idea/27-buddy-bot
   ```

2. Build the prototype ([ADDING_AN_IDEA.md](ADDING_AN_IDEA.md)).
3. Check it:

   ```bash
   python3 scripts/check.py
   ```

4. Commit only your files: your `ideas/<id>-<slug>/` folder, your own entry in `assets/js/ideas.js` and, if needed, new images in `assets/deck/`.

   ```bash
   git add ideas/27-buddy-bot assets/js/ideas.js
   git commit -m "Idea 27: registration buddy bot prototype"
   git push -u origin idea/27-buddy-bot
   ```

5. Open a pull request into `main` and fill in the template. A reviewer opens the studio, clicks through, and merges. Pages redeploys.

## Rules

- One idea per pull request.
- `assets/js/ideas.js` is shared. Change only the entry of your idea, so that two people building different ideas do not conflict. If you get a merge conflict there, keep both sides' changes.
- Shared files (`assets/js/*`, `assets/css/xm.css`, `index.html`, `server.py`) are changed only to fix bugs, in their own pull request.
- Never commit `data/state.json`, deck files (`*.pptx`) or anything with real client or company data.
- Keep images small: PNG or JPG under about 400 KB, in `assets/deck/` named `sNN-short-name.png` (NN = slide).

## Reviewing a pull request

- [ ] `python3 scripts/check.py` passes
- [ ] The studio opens the prototype from the list and the preview shows a real first screen
- [ ] Walk every scene; no console errors
- [ ] Mobile width looks right
- [ ] Wording is cautious ("may", "could") and every number is clearly illustrative
- [ ] Only the author's idea folder and their `ideas.js` entry changed

## Password

The studio is behind a shared password. It is the same as the Website Strategy studio. To change it: `python3 scripts/set_password.py`. The gate is client-side, so treat the site as semi-public.
