# Removes files the site no longer references: the Gesture, Gaming and
# Immersive modes and their assets, and the hero decorations replaced by the
# WebGL backdrop.
#
# Safe to run more than once — anything already gone is skipped.
#
# Everything here is in git history — `git log --diff-filter=D --name-only`
# will find any of it again if it is ever wanted back.
#
# Run once, from the repo root:
#     powershell -ExecutionPolicy Bypass -File .\cleanup-modes.ps1

$ErrorActionPreference = 'Stop'

$paths = @(
  # the removed modes
  'src/modes',
  'src/config/modes.js',
  'src/components/layout/ModeSwitcher.jsx',

  # components nothing renders any more
  'src/components/ui/Card.jsx',
  'src/components/ui/Badge.jsx',

  # mode assets (~61 MB)
  'src/assets/gaming',
  'src/assets/immersive',
  'src/assets/mascot',

  # replaced by hero.webp / mascot.webp, or never referenced
  'src/assets/hero_pic.png',
  'src/assets/hero.png',
  'src/assets/profile.png',
  'src/assets/portfolio-promo.mp4',
  'src/assets/react.svg',
  'src/assets/vite.svg',

  # replaced by the WebGL backdrop (src/scene/)
  'src/pages/portfolio/components/Shapes3D.jsx',
  'src/pages/portfolio/components/HeroStaticMascot.jsx'
)

foreach ($path in $paths) {
  if (Test-Path $path) {
    Write-Host "removing $path"
    git rm -r -f --quiet -- $path
  } else {
    Write-Host "skipping $path (already gone)"
  }
}

Write-Host ''
Write-Host 'Now refresh dependencies (phaser and @mediapipe/tasks-vision dropped, three added):'
Write-Host '    npm install'
Write-Host ''
Write-Host 'Then check it:'
Write-Host '    npm run lint'
Write-Host '    npm run build'
Write-Host '    npm run dev'
