# Copilot instructions

This repository is the XMTrading 2027 product ideas prototype studio: plain HTML, CSS and vanilla JavaScript, no build step, no dependencies. `server.py` serves the files and stores comments.

## Where things are

- `assets/js/ideas.js` is the catalogue of ideas (`XM_AREAS`, `XM_IDEAS`).
- `ideas/<id>-<slug>/index.html` is one self-contained prototype per idea. `ideas/10-xmp-spread-saver` and `ideas/13-personalized-signup` are the reference examples.
- `assets/css/xm.css` has the design tokens and components. `assets/js/common.js` has the `XM.*` helpers.
- `ideas/_template/index.html` is the starting point. Create a new page with `python3 scripts/new_idea.py <id>`.

## Rules when building or editing a prototype

- Work only in the folder of one idea and in that idea's own entry in `assets/js/ideas.js`. Do not edit other prototypes or shared files unless asked to fix a bug.
- Each prototype is one `index.html` with inline styles and script. Reference shared files by relative path only (`../../assets/...`). No CDN, no external fonts, images or APIs, no frameworks.
- Keep the template skeleton: `gate.js` first in `<head>`, then `xm.css`; at the end `common.js`, the inline script that ends with `XM.notes({title, today, proposed, why, metric})`, then `review.js` with `data-idea="<id>"`.
- Reuse the tokens and classes from `xm.css` (`--g`, `--ink`, `--mut`, `--line`, `--up`, `--dn`, `.btn`, `.tag`, `.card`, `.pill-tabs`, `.browser`, `.phone`) and `XM.logo`, `XM.icon`, `XM.toast`. Brand green is `#008454`, font Poppins.
- Scenes are switched by tabs and by `?scene=`. The page must work embedded (`?embed=1`) and at 390 px width.
- Make controls actually work with illustrative data. Show empty, error and success states where they matter.
- Content is illustrative: no real client data, no guaranteed returns, cautious wording ("may", "could").
- Set `status: 'built'`, `path` and `shows` in the idea entry when it is done, then run `python3 scripts/check.py` and fix all errors.
- Never commit `data/state.json` or the deck `.pptx`. Do not commit or push unless asked.

More detail: `docs/ADDING_AN_IDEA.md` and `docs/AI_PROMPT.md`.
