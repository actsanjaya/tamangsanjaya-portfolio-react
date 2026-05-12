# AGENTS.md

## Project Identity

This repository is Sanjaya Tamang's personal portfolio website.

- Owner: Sanjaya Tamang
- Positioning: Technical Actuarial Analyst
- Core themes: actuarial automation, Python, SQL, Power BI, Advanced Excel, valuation models, reporting pipelines, dashboards, RAG assistant, and future actuarial web apps
- Website purpose: professional portfolio plus experimental creative modes

## Architecture

- Default Mode is the main professional CV/resume portfolio. Keep it clean, stable, recruiter-friendly, and suitable for normal visitors.
- Gesture Mode is the experimental camera/gesture interaction experience.
- Gaming Mode is the main creative playground for game-like exploration.
- Immersive Mode is cinematic storytelling. It should support the portfolio story, not replace Default Mode.
- Future apps should be linked from the project hub, not built directly inside Default Mode unless explicitly requested.

## Routes That Must Not Break

Do not break these routes:

- `/`
- `/default`
- `/gesture`
- `/gaming`
- `/immersive`

## Working Rules

1. Keep experimental features isolated inside their own mode.
2. Do not make Default Mode gimmicky.
3. Do not add heavy dependencies unless justified.
4. If adding a heavy dependency, isolate it with lazy loading when possible.
5. Prefer data-driven structures for projects, modes, zones, and scenes.
6. Reuse existing data from `src/config/siteData.js` and `src/config/projectsData.js` where practical.
7. Do not create fake live links. Use "Coming Soon" if a project is not live.
8. For game/immersive work, prioritize interaction feel, camera behavior, clear navigation, and visual polish over adding more content.
9. For visual work, use original assets/styles only. Do not copy protected brands, game assets, movie UI, or copyrighted material.
10. Before large visual or interactive changes, inspect the existing files and summarize the intended approach.
11. After changes, run:
    - `npm run lint`
    - `npm run build`
12. In the final response, summarize files changed, architecture impact, and whether lint/build passed.

## Design Direction

- Premium, technical, modern, polished
- Strong blue/navy/cyan identity
- Actuarial, data, and automation theme
- Avoid childish clutter
- Creative modes can be playful, but should still feel intentional and high-quality
