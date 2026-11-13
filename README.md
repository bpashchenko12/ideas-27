# XMTrading Product Ideas 2027: prototype studio

Clickable prototypes for the ideas in the **XMTrading 2027 Product Ideas** deck, shown in one studio where stakeholders can browse, open, support and comment on each idea.

- All 42 deck ideas are listed, filtered by **area** (Promotions, Client Loyalty, XMTD Affiliates, Onboarding and Education, Trading, Financial Products, Internal Tools).
- **Shortlisted** ideas carry a priority (P1 / P2). Use the *Shortlist* toggle to see only those.
- Ideas with a clickable prototype are marked *Prototype ready*; the rest show their deck screenshots until someone builds them.

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies. Same approach as the Website Strategy studio.

## Run it

```bash
python3 server.py          # http://localhost:8000
python3 server.py 9000     # another port
```

Open `http://localhost:8000/index.html`. This studio has its own password, separate from the Website Strategy studio. Ask the product team for it, or set a new one with `python3 scripts/set_password.py`.

`server.py` also stores votes and comments in `data/state.json` (not committed). Share the network URL it prints and everyone comments into the same file. On GitHub Pages there is no server, so comments stay in each reviewer's browser.

## Status

| Idea | Area | State |
| --- | --- | --- |
| 10 XMP Spread Saver | Client Loyalty | Prototype ready |
| 13 Personalized sign-up page | XMTD Affiliates | Prototype ready |
| 04, 09, 27, 31, 34, 41 | various | Shortlisted, prototype to build |
| everything else | | In the deck only |

The live list is `assets/js/ideas.js`.

## Build a prototype for another idea

Anyone on the team can add one.

1. Read [docs/ADDING_AN_IDEA.md](docs/ADDING_AN_IDEA.md).
2. `python3 scripts/new_idea.py 27` creates `ideas/27-<slug>/index.html` from the template.
3. Build the prototype. Use your AI assistant with [docs/AI_PROMPT.md](docs/AI_PROMPT.md) and the screenshots from the deck or Figma.
4. In `assets/js/ideas.js`, change **only your own entry**: `status: 'built'`, `path`, `shows`.
5. `python3 scripts/check.py`, then open a pull request ([docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)).

## Repository map

```
index.html              the studio (list, filters, preview, comments)
comments.html           all comments in one place
server.py               static server + shared comments API
assets/js/ideas.js      THE catalogue: every idea, its area, status, deck text
assets/js/common.js     helpers: XM.logo, XM.icon, XM.toast, XM.notes, XM.INSTR ...
assets/js/review.js     comment / support dock added to every prototype page
assets/js/gate.js       password gate
assets/css/xm.css       XMTrading look: tokens, buttons, tags, browser and phone frames
assets/deck/            screenshots from the deck, one or two per idea
ideas/<id>-<slug>/      one folder per prototype (index.html, self-contained)
ideas/_template/        starting point for a new prototype
scripts/                new_idea.py, check.py, set_password.py
docs/                   how-to guides and the AI prompt
```

## Publish on GitHub Pages

1. Create the GitHub repository and push `main`.
2. Settings, Pages, deploy from branch `main`, folder `/ (root)`.
3. Put the resulting address in `XM_CONFIG.publicUrl` in `assets/js/ideas.js` so copied links and the slide table use it.

The password gate is client-side. It keeps casual visitors out; it is not real security. Never commit confidential data or real client information. Change the password with `python3 scripts/set_password.py`.

## Conventions in one minute

- One folder per idea, self-contained. Do not edit other people's prototypes or the shared files unless you are fixing a bug.
- Illustrative data only. Say "may" and "could", never promise results. No real client data.
- Match XMTrading style: tokens from `assets/css/xm.css`, Poppins, green `#008454`.
- The prototype must work when the studio embeds it (`?embed=1`) and on mobile.
