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
