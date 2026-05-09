# Sanjaya Tamang Portfolio

Personal portfolio website for `tamangsanjaya.com.np`, built with React and Vite
and deployed through GitHub to Cloudflare Pages.

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

## Mode Architecture

The site is structured around portfolio modes. The central registry lives in
`src/config/modes.js`. Each mode entry includes an id, name, description, route,
status, icon, and component.

Current routes:

- `/` and `/default`: professional default portfolio
- `/gesture`: optional webcam gesture-control command center
- `/gaming`: lightweight game-like portfolio zone scaffold

Gesture Mode is built as an optional Actuarial Command Center experience. It
uses `src/modes/gesture/hooks/useGestureEngine.js` for camera permission,
MediaPipe Tasks Vision hand tracking, mirrored-preview correction, gesture
cooldowns, fallback state, and cleanup. Mouse, keyboard, touch, and manual
fallback controls remain available when camera or model access is unavailable.

To add a future mode:

1. Create a new folder in `src/modes`.
2. Add the mode component and any mode-specific data/config files.
3. Register it in `src/config/modes.js`.
4. Set `showInSwitcher: true` when it should appear in the UI.

The `public/_redirects` file keeps client-side routes working on Cloudflare
Pages.

## Adding a New Project/App

Focused portfolio projects live in `src/config/projectsData.js`. Each entry is
metadata only: the portfolio should describe, link to, or document serious tools,
while full apps stay in separate repos and deployments.

To add or edit a project card:

1. Add or update an object in `portfolioProjects`.
2. Set `status` to `completed`, `in-progress`, `planned`, or `prototype`.
3. Use `featured: true` for projects that should be emphasized.
4. Add `tools`, `tags`, `deliverables`, and `futureRoadmap` values for the card
   and future case study.
5. Put future subdomains in `appSubdomain` as planning metadata only.

External links are controlled by the `links` object:

- `liveApp`: deployed app URL when real
- `caseStudy`: portfolio or documentation page
- `github`: public repository URL
- `download`: downloadable template or resource URL
- `demoVideo`: video demo URL
- `screenshot`: screenshot asset path or URL

Leave unavailable links as `null`. The UI renders those actions as disabled
"Coming Soon" buttons instead of pretending a demo or app is live.

For future downloadable templates, add the file intentionally and set
`links.download` only after confirming the file contains no confidential data.
All actuarial examples should use sample or synthetic data; do not commit private
employer, client, policyholder, model, assumption, or company files to this repo.
