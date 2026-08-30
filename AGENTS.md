# AGENTS.md

## Project Identity

This repository is Sanjaya Tamang's personal portfolio website.

- Owner: Sanjaya Tamang
- Positioning: Technical Actuarial Analyst
- Core themes: actuarial automation, Python, SQL, Power BI, Advanced Excel, valuation models, reporting pipelines, dashboards, RAG assistant, and future actuarial web apps
- Website purpose: a professional portfolio **and** a place where visitors can actually run the models he builds

## Architecture

The site is two pages, registered in `src/config/pages.js`:

- **Portfolio** (`/`, alias `/default`) — the professional CV. Clean, stable,
  recruiter-friendly. Lives in `src/pages/portfolio/`, content in
  `portfolioData.js`.
- **Model Lab** (`/model`, aliases `/models`, `/model-lab`) — the interactive
  models. Lives in `src/pages/model-lab/`, lazy-loaded so it costs the CV page
  nothing.

Unknown paths fall back to the portfolio (`isFallback` in the page registry), so
old links never 404.

The experimental Gesture, Gaming and Immersive modes were removed in August 2026.
They are in git history if they are ever wanted back; do not reintroduce them
without being asked.

## The 3D backdrop

One fixed WebGL canvas sits behind the whole site, in `src/scene/`.

- `SceneBackdrop.jsx` mounts it and owns the animation loop. `discountSurface.js`
  builds the scene and is pure with respect to React.
- The scene is a present-value surface — term, discount rate, value as height —
  with a stress ripple. It is the subject matter, not decoration, and that is
  the bar any replacement has to clear.
- Scroll progress drives a keyframed camera path (`CAMERA_PATH`). Tuning the
  choreography means editing those keyframes, nothing else.
- three.js is dynamically imported, so it never blocks first paint and is a
  separate ~185 KB gz chunk. On screens under 820px and under
  `prefers-reduced-motion` it is never fetched — the CSS gradient in `scene.css`
  is the backdrop there, and it has to hold the page on its own.
- The backdrop is `z-index: -1` inside `.siteShell`. At 0 it painted above every
  unpositioned section and blanked the Model Lab.
- Text over the scene needs a scrim. `.heroContent`, section headers and the lab
  headers lay a `farthest-side` radial wash of the page colour behind
  themselves; use `farthest-side` so the wash always finishes inside its own box
  instead of showing a rectangular edge.

## The Model Lab

Adding a model is data plus one pure function — never a new page.

- `src/pages/model-lab/registry.js` — the list. `{ manifest, run }` is runnable;
  a manifest alone with `status: 'coming-soon'` renders an honest placeholder.
- `src/pages/model-lab/models/_template/` — the manifest fields and the `run()`
  contract, documented inline. Copy it.
- `run(inputs) -> { summary, series, table, warnings }`. Pure. No network, no
  DOM, never throws — invalid input comes back as `warnings`.
- Compute in the browser. A backend is a decision to be argued for, not a
  default; a visitor's numbers should not leave their machine.
- Every model is checked against an independently computed reference case, saved
  as `reference.js` beside `run.js`.
- The Python originals live in `/Model` — see `Model/README.md` for the porting
  workflow.

## Working Rules

1. **Propose before you change.** Describe the intended change — files, approach,
   trade-offs, route and bundle impact — and wait for Sanjaya's confirmation.
2. Keep the portfolio page clean and professional. Never gimmicky.
3. Justify heavy dependencies; lazy-load them.
4. Prefer data-driven structures for pages, projects, models and cards.
5. Reuse `src/config/siteData.js` and `src/config/projectsData.js` where practical.
6. Do not create fake live links. Use "Coming Soon" if something is not live.
7. Sample or synthetic data only — no employer, client, policyholder, model,
   assumption or company files in this repo.
8. All colours go through the tokens in `src/styles/tokens.css`. Never hardcode a
   hex or an `rgba()` in a rule — dark mode is a token layer, and a literal
   breaks it silently.
8b. Three ways to make text look permanently out of focus, all of which have
   happened here: `filter: blur()` in a reveal animation, a fractional `scale`
   on hover, and a standing `will-change: transform` on a card. Each pins the
   element to a composited layer that never re-rasterises. Opacity and
   whole-pixel translation only, and never leave `will-change` on at rest.
9. Mode-scoped CSS stays in its page folder. `globals.css` is for the shell only.
10. After changes, run `npm run lint` and `npm run build`.
11. Then verify visually: serve `dist/`, and at 390 / 1280 / 1440 in **both**
    themes check for horizontal overflow, console errors and unreachable nav.
12. In the final response, summarise files changed, route impact, bundle impact,
    and whether lint, build and visual QA passed.

## Design Direction

- Premium, technical, modern, polished — real WebGL depth behind everything,
  glass panels in front of it, and type large enough to carry a section on its
  own.
- The site opens dark; light is a toggle away and must stay just as considered.
- Blue / navy / cyan identity, in both themes.
- Actuarial, data and automation theme. No childish clutter.
- Original assets and styles only. No copied brands, game assets or movie UI.
