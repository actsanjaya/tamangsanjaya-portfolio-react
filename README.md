# Sanjaya Tamang Portfolio

Personal portfolio and model lab for `tamangsanjaya.com.np`, built with React and
Vite and deployed through GitHub to Cloudflare Pages.

## Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `dist`

## Structure

```
src/
  config/pages.js          the route table and the navbar links
  config/siteData.js       name, contact details, links
  config/projectsData.js   project metadata (status, links, roadmaps)
  hooks/useTheme.js        light/dark, stored per visitor
  styles/tokens.css        every colour in the site, light and dark
  styles/globals.css       shell only — navbar, hero frame, footer
  scene/                   the WebGL backdrop behind every page
  pages/portfolio/         the CV page
  pages/model-lab/         the interactive models
Model/                     the Python models the lab is ported from
```

Two routes:

- `/` (alias `/default`) — the portfolio
- `/model` (aliases `/models`, `/model-lab`) — the Model Lab, lazy-loaded

Anything else falls back to the portfolio, so old links keep working.
`public/_redirects` gives Cloudflare Pages the same behaviour server-side.

## The 3D backdrop

`src/scene/` holds one fixed WebGL canvas that sits behind the whole site: a
present-value surface, with the camera moving along a keyframed path as you
scroll. `discountSurface.js` has the maths and the camera path; `SceneBackdrop.jsx`
mounts it.

three.js is dynamically imported, so it is a separate chunk that never blocks
first paint. Below 820px wide, and whenever the visitor prefers reduced motion,
it is not fetched at all — the gradient in `scene/scene.css` is the backdrop
there.

## Theming

Every colour resolves to a token in `src/styles/tokens.css`. Light is the base;
`:root[data-theme='dark']` redefines the same names. `--rgb-*` tokens hold bare
channels so translucent fills (`rgb(var(--rgb-surface) / 0.6)`) flip with the
theme too.

**Never hardcode a colour in a rule.** A literal hex or `rgba()` will look right
in light mode and quietly break in dark.

The site opens dark, because the backdrop needs it. A visitor who picks light in
the navbar keeps light — the choice is stored in `localStorage`.

Two motion rules that are easy to break and hard to see: no `filter: blur()` in a
reveal, and no fractional `scale` in a hover. Both pin the element to a
composited layer that never re-rasterises, and the text stays visibly soft.

## Adding a model to the Model Lab

Data plus one pure function — no new page, no new UI.

1. Copy `src/pages/model-lab/models/_template/` to `models/<your-model-id>/`.
2. Fill in `manifest.js`: inputs (each with a default), outputs, charts, table
   columns, assumptions, method notes, limitations, disclaimer.
3. Implement `run(inputs) -> { summary, series, table, warnings }` in `run.js`.
   Pure, no network, no DOM, never throws.
4. Verify it against an independently computed reference case and save the
   expected figures as `reference.js`.
5. Register it in `src/pages/model-lab/registry.js`.

The card, the inputs form, the summary tiles, the chart, the projection table and
the CSV export are all generated from the manifest. See `Model/README.md` for the
Python-to-browser workflow.

## Adding a project card

Projects live in `src/config/projectsData.js`. Set `status` to `completed`,
`in-progress`, `planned` or `prototype`, and leave unavailable links as `null` —
the UI renders those as "Coming Soon" rather than pretending a demo is live.

Only add a downloadable file after confirming it contains no confidential data.
All examples use sample or synthetic data; no employer, client, policyholder,
model, assumption or company files belong in this repo.
