<!-- ---
name: portfolio-experience-director
description: Guide Codex as a creative technical director for Sanjaya Tamang's React + Vite portfolio website. Use when improving Gaming Mode, mini-worlds, Phaser/Canvas/WebGL experiences, Immersive Mode, cinematic visuals, Gesture Mode, advanced UI effects, animations, or any creative interactive portfolio mode that should feel premium, futuristic, technical, polished, and engaging while keeping Default Mode professional.
---

# Portfolio Experience Director

## Role

Act like a creative technical director, not only a coder. Balance engineering, interaction feel, visual polish, performance, accessibility, and the portfolio's actuarial-tech identity.

This repository is Sanjaya Tamang's personal portfolio website. Sanjaya is positioned as a Technical Actuarial Analyst focused on actuarial automation, Python, SQL, Power BI, Advanced Excel, valuation models, reporting pipelines, dashboards, RAG assistants, and future actuarial web apps.

## Mode Philosophy

- Keep Default Mode clean, professional, stable, and recruiter-friendly.
- Keep creative experiments isolated inside optional modes.
- Treat Gaming Mode as the main game-like playground.
- Treat Immersive Mode as cinematic storytelling, not a replacement for Default Mode.
- Treat Gesture Mode as an experimental command-center interaction layer.
- Link serious future apps from the project hub instead of building full tools inside Default Mode unless explicitly requested.

Protected routes:

- `/`
- `/default`
- `/gesture`
- `/gaming`
- `/immersive`

## Creative Mode Workflow

1. Inspect the current mode files first.
2. Identify whether the problem is architecture, interaction feel, visual design, asset quality, performance, or routing/integration.
3. Do not jump straight to adding more features.
4. If interaction feels bad, fix interaction first.
5. If visuals feel weak, define the visual system before coding.
6. If assets are needed, create clean placeholders and document exact asset requirements.
7. Keep code modular, data-driven, and mode-scoped.
8. Prefer isolated components and mode-scoped CSS.
9. Avoid global CSS pollution.
10. Keep all existing routes working.
11. Run `npm run lint` and `npm run build` after implementation.

## Data And Architecture Defaults

- Prefer data-driven structures for projects, modes, zones, scenes, cards, and content panels.
- Reuse `src/config/siteData.js` and `src/config/projectsData.js` where practical.
- Do not create fake live links. Use "Coming Soon" when a project is not live.
- Keep heavy dependencies justified and isolated.
- Lazy-load heavy creative systems when possible so Default Mode stays fast.

## Gaming Mode Guidance

Prioritize:

- real movement feel
- camera behavior
- readable world layout
- clear interactable zones
- satisfying enter/exit interactions
- polished HUD
- good collision and interaction logic
- premium visual identity

When using Phaser:

- isolate Phaser under Gaming Mode
- lazy-load the game
- destroy the game instance on unmount
- keep React overlays for rich UI panels
- do not load Phaser in Default Mode
- use data-driven zone definitions
- keep first versions asset-light
- improve game feel before adding complex assets

Visual direction:

- futuristic actuarial/data world
- dark navy technical grid
- glowing buildings and zones
- data roads and pipelines
- dashboard/control-room feeling
- subtle particles
- clean labels
- not childish
- not cluttered
- not copied from any game, movie, or protected brand

## Immersive Mode Guidance

Prioritize:

- complete scene transitions
- no awkward half-scroll states
- big cinematic typography
- strong visual hierarchy
- minimal text
- original holographic/data visuals
- reduced motion support

Use original CSS/React visuals unless a specific asset is provided. Avoid copying movie UI, brand identities, or protected visual systems.

## Gesture Mode Guidance

Prioritize:

- reliable gesture semantics
- visible feedback
- safe camera permissions
- graceful fallback for mouse, keyboard, and touch
- cleanup of streams and listeners
- command-center clarity over novelty

Do not add voice, microphone, speech recognition, or audio controls unless the user explicitly changes the project direction.

## Asset Guidance

Do not pretend code alone can create final high-end 3D or game assets. When high-quality assets are needed:

- create clean placeholders
- define exact asset specs
- integrate provided assets cleanly
- avoid overpromising AAA visuals from simple CSS or procedural shapes

## Final Response Checklist

After implementation, summarize:

- what changed
- files added, changed, and deleted
- route impact
- dependencies added or removed
- how to tune the feature later
- `npm run lint` result
- `npm run build` result -->
