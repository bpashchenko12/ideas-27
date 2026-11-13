# AI prompt for building a prototype

Copy the block below into your AI coding assistant (GitHub Copilot Chat in agent mode, Claude, Cursor). Open this repository in the editor first so the assistant can read the files. Attach the screenshots for the idea and replace the parts in `<angle brackets>`.

The same rules are in `.github/copilot-instructions.md`, which Copilot reads automatically.

---

````text
You are helping me build a clickable prototype for one product idea in this repository (XMTrading 2027 product ideas studio). The repository is plain HTML, CSS and vanilla JavaScript with no build step.

IDEA
- Id and title: <27 - Registration buddy bot in WhatsApp/LINE>
- Area: <onboarding>
- What it is, who uses it, the one thing they do: <explain in 3-5 sentences>
- Scenes I want (tabs at the top): <e.g. 1. Chat start, 2. ID upload step, 3. Hand-off to human>
- Details, rules, copy from the call: <paste notes>
- Screenshots attached: <what each one shows>

FIRST, read
- README.md and docs/ADDING_AN_IDEA.md
- ideas/10-xmp-spread-saver/index.html and ideas/13-personalized-signup/index.html (two finished prototypes: follow their structure, header block, scenes and caption strip)
- assets/css/xm.css (design tokens and components) and assets/js/common.js (XM helpers)
- my entry in assets/js/ideas.js (the deck text for this idea)

THEN
1. Run `python3 scripts/new_idea.py <id>` to create ideas/<id>-<slug>/index.html, and work only in that file.
2. Build the prototype as ONE self-contained index.html: inline <style> and <script>, links only to ../../assets/...
3. Keep from the template: gate.js as the first script in <head>, then xm.css; at the end of <body> common.js, your script finishing with XM.notes({title, today, proposed, why, metric}), then <script src="../../assets/js/review.js" data-idea="<id>"></script>.
4. Use the shared look: CSS variables from xm.css (--g green #008454, --ink, --mut, --line, --up, --dn), classes .btn .btn-primary .btn-outline .tag .card .pill-tabs .browser .phone, XM.logo(), XM.icon(name), XM.toast(html). Poppins is already loaded. Do not invent a new visual style and do not add libraries, CDNs, fonts or images from the internet.
5. Make it interactive for real: the controls shown must work with realistic, illustrative data (state in JS), including empty, error and success states where relevant. Switching scenes works by tabs and by `?scene=` in the URL.
6. It must look right in the studio preview frame (?embed=1, about 1280 x 800 scaled down, or 390 x 720 for mobile) and at 390 px width. Breakpoint around 860-980px.
7. Wording: cautious and compliant. Use "may" and "could". No promises of returns or guaranteed results. All numbers, names, prices and offers are illustrative; say so in the caption. No real client data.
8. Update ONLY my entry in assets/js/ideas.js: status 'built', path, shows (one bullet per thing the viewer can do). Remove flag.
9. Run `python3 scripts/check.py` and fix every ERROR. Start `python3 server.py` and test in the browser: every scene, every button, mobile width, no console errors.
10. Do not modify other ideas' folders, assets/js/*.js, assets/css/xm.css, index.html or server.py. If you think a shared file has a bug, tell me instead of editing it. Do not commit or push.

When done, give me a short summary: what the prototype shows, what is invented, and what you were unsure about.
````

---

## Tips

- Give one screenshot per scene and say what is clickable. "This button opens screen 2" saves several rounds.
- Paste real copy from Figma or the deck instead of letting the assistant invent it.
- If the first result is far off, say what you see ("the ticket overlaps the chart on mobile") rather than asking for a redesign.
- Ask the assistant to take screenshots of the running page and compare them with yours.
