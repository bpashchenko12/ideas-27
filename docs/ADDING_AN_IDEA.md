# Adding an idea

How to turn an idea from the deck into a clickable prototype that shows up in the studio.

You need: Python 3 and a browser. Optional: an AI coding assistant (see [AI_PROMPT.md](AI_PROMPT.md)).

## 1. Pick your idea

Open `assets/js/ideas.js`. Every deck idea is already listed. Find yours by id. Shortlisted ideas have `status: 'todo'` and a `shortlist` block with the priority.

Is your idea missing (a new one from outside the deck)? Add a new entry at the end of `XM_IDEAS` with the next free id and `status: 'todo'`. Use the same fields as the others and put a screenshot, if you have one, in `assets/deck/`.

## 2. Create the page

```bash
python3 scripts/new_idea.py 27
```

This creates `ideas/27-<slug>/index.html` from `ideas/_template/index.html`. Run the studio in another terminal:

```bash
python3 server.py
```

Open `http://localhost:8000/index.html#27`. The studio shows your prototype in a preview frame as soon as the entry points to it (step 4).

## 3. Build it

Collect what you know about the idea: the deck slide (`assets/deck/`), Figma frames, screenshots, notes from the call. Decide:

- **Who is the user and what is the one thing they do?** The prototype should make that obvious in a few seconds.
- **Which scenes?** Usually 2 to 4: the main screen, the result of an action, an edge case. Tabs at the top switch between them (the template has this).
- **What can be clicked?** Make the main controls work with realistic, illustrative data. Show empty, error and success states where they matter.

Rules for the page:

- Self-contained: HTML, CSS and JS in the one `index.html`. Only link to `../../assets/...`.
- Keep the first three lines of the template: the `gate.js` script first, then `xm.css`, and `review.js` with the right `data-idea` at the end.
- Call `XM.notes({ title, today, proposed, why, metric })`. It adds the "What changes?" panel.
- Use `XM.logo()`, `XM.icon('bell')`, `XM.toast('...')` and the `.btn`, `.tag`, `.card`, `.pill-tabs`, `.browser`, `.phone` classes instead of rebuilding them.
- Style: colours and radii from `assets/css/xm.css` variables (`--g` green `#008454`, `--ink`, `--mut`, `--line`, `--up`, `--dn`). Poppins is already loaded.
- Must work embedded (`?embed=1`, a 1280 by 800 frame the studio scales down, or 390 by 720 for mobile) and at phone widths.
- Illustrative only: invented prices, names and offers. No real client data, no promises ("may", "could"). Mark anything that is a guess as illustrative.
- Do not touch other ideas' folders and do not change `assets/js/*` or `assets/css/xm.css` unless you are fixing a bug that affects everybody. If you need a new helper, keep it in your own page.

### Page types

- **Website page** (marketing, sign-up, content): add `<div data-xm-risk></div><div data-xm-header data-variant="light"></div>` at the top of `<body>` and `<div data-xm-footer></div>` at the end. `XM.chrome()` fills them with the XMTrading header and footer. Look at the Website Strategy repository for working examples.
- **PWA or app screen**: use `.phone` for mobile, or a framed app like `ideas/10-xmp-spread-saver/index.html`.
- **Partner or internal tool**: a framed app like `ideas/13-personalized-signup/index.html`.

Helpers in `assets/js/common.js`: `XM.$`, `XM.$$`, `XM.esc`, `XM.qs`, `XM.fmt`, `XM.icon`, `XM.logo`, `XM.toast`, `XM.INSTR` (sample instruments with prices), `XM.series`, `XM.sparkline`, `XM.flow` (small state kept in sessionStorage so a flow can continue across pages).

## 4. Register it in the catalogue

In `assets/js/ideas.js`, in **your entry only**:

```js
status: 'built',
path: 'ideas/27-registration-buddy-bot/index.html',
shows: [
  'Chat flow that guides a new client through registration',
  'Escalation to a human agent',
  'Illustrative copy only'
],
```

`shows` is the "What the prototype shows" list in the studio: one bullet per thing a viewer can do or see. Add `links: [{ label: 'Figma', url: '...' }]` if you have references. Remove `flag` once the prototype is ready.

## 5. Check and share

```bash
python3 scripts/check.py
```

Fix every `ERROR`. Then:

1. Click through every scene in the studio, in the preview and in the full page.
2. Resize to a phone width.
3. Open a pull request, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Definition of done

- [ ] `python3 scripts/check.py` prints `OK`
- [ ] Preview frame in the studio shows a meaningful first screen (not a blank page)
- [ ] Every scene is reachable and every visible control either works or is clearly disabled
- [ ] Works at 1280 wide and at 390 wide
- [ ] `XM.notes(...)` filled in; `shows` filled in in `ideas.js`
- [ ] No real data, no promises, no external services needed
