/**
 * THE DISCOUNT SURFACE
 * ====================
 * The site's background scene, and the only piece of decoration here that is
 * also true: it is a present-value surface. Term runs along one axis, discount
 * rate along the other, and height is what a unit of cashflow is worth. A
 * stress ripple travels outward from the centre, which is what a parallel shift
 * in the discount rate actually does to that surface.
 *
 * Pure with respect to React — it takes a THREE namespace and a palette, and
 * hands back `update` / `resize` / `setPalette` / `dispose`. Nothing in here
 * touches the DOM beyond the canvas it is given.
 */

const SEGMENTS = 92
const SPAN = 13

/**
 * Camera keyframes along the page. `at` is scroll progress, 0 at the top of the
 * document and 1 at the bottom. Everything between is interpolated and then
 * damped, so the camera lags the scroll slightly instead of snapping to it.
 */
const CAMERA_PATH = [
  { at: 0.0, pos: [1.2, 5.4, 15.5], look: [3.4, -1.2, 0], glow: 1.0 },
  { at: 0.22, pos: [-1.4, 3.4, 13.0], look: [2.2, -0.9, -1.2], glow: 0.7 },
  { at: 0.46, pos: [-4.2, 7.0, 14.5], look: [0.8, -2.0, -2.0], glow: 0.46 },
  { at: 0.68, pos: [1.8, 2.6, 10.5], look: [3.0, -0.4, -2.6], glow: 0.95 },
  { at: 0.86, pos: [0.4, 8.6, 17.0], look: [2.0, -2.0, -1.0], glow: 0.6 },
  { at: 1.0, pos: [-0.8, 10.4, 19.0], look: [1.4, -2.4, 0], glow: 0.44 },
]

const lerp = (a, b, t) => a + (b - a) * t

const samplePath = (progress) => {
  let lower = CAMERA_PATH[0]
  let upper = CAMERA_PATH[CAMERA_PATH.length - 1]

  for (let i = 0; i < CAMERA_PATH.length - 1; i += 1) {
    if (progress >= CAMERA_PATH[i].at && progress <= CAMERA_PATH[i + 1].at) {
      lower = CAMERA_PATH[i]
      upper = CAMERA_PATH[i + 1]
      break
    }
  }

  const span = upper.at - lower.at
  const raw = span === 0 ? 0 : (progress - lower.at) / span
  // Smoothstep, so the camera eases through each keyframe rather than
  // changing direction abruptly at it.
  const t = raw * raw * (3 - 2 * raw)

  return {
    pos: lower.pos.map((value, i) => lerp(value, upper.pos[i], t)),
    look: lower.look.map((value, i) => lerp(value, upper.look[i], t)),
    glow: lerp(lower.glow, upper.glow, t),
  }
}

/**
 * Surface height at a point, in the surface's own plane coordinates.
 * `ripple` is 0-1 and drives the stress wave.
 */
const heightAt = (x, y, time, ripple) => {
  const r = Math.sqrt(x * x + y * y)

  return (
    // The discounting decay: value falls away as you move out in term and rate.
    2.6 * Math.exp(-r * 0.3) +
    // The stress wave travelling outward.
    (0.34 + ripple * 0.5) * Math.sin(r * 1.15 - time * 0.85) * Math.exp(-r * 0.16) +
    // A slow lateral drift so the surface never looks frozen.
    0.16 * Math.sin(x * 0.75 + time * 0.42) +
    0.1 * Math.cos(y * 0.62 - time * 0.31)
  )
}

export function createDiscountSurface(THREE, { canvas, palette, quality = 'high' }) {
  const segments = quality === 'low' ? 46 : SEGMENTS

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: quality !== 'low',
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality === 'low' ? 1.25 : 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 120)

  const geometry = new THREE.PlaneGeometry(SPAN, SPAN, segments, segments)
  const basePositions = Float32Array.from(geometry.attributes.position.array)

  const meshMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    depthWrite: false,
  })
  const mesh = new THREE.Mesh(geometry, meshMaterial)
  mesh.rotation.x = -Math.PI / 2.34
  mesh.position.set(2.4, -1.1, 0)
  scene.add(mesh)

  // The vertices are shared with the wireframe, so the points ride the surface
  // for free — they only need their own material.
  const pointsGeometry = new THREE.BufferGeometry()
  pointsGeometry.setAttribute('position', geometry.attributes.position)
  const pointsMaterial = new THREE.PointsMaterial({
    size: 0.038,
    transparent: true,
    depthWrite: false,
    sizeAttenuation: true,
  })
  const points = new THREE.Points(pointsGeometry, pointsMaterial)
  points.rotation.copy(mesh.rotation)
  points.position.copy(mesh.position)
  scene.add(points)

  const state = {
    progress: 0,
    targetProgress: 0,
    pointerX: 0,
    pointerY: 0,
    targetPointerX: 0,
    targetPointerY: 0,
    ripple: 0,
    targetRipple: 0,
  }

  let activePalette = palette

  function setPalette(next) {
    activePalette = next
    meshMaterial.color = new THREE.Color(next.line)
    meshMaterial.opacity = next.lineOpacity
    pointsMaterial.color = new THREE.Color(next.point)
    pointsMaterial.opacity = next.pointOpacity
  }

  setPalette(palette)

  function resize(width, height) {
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  function setProgress(value) {
    state.targetProgress = value
  }

  function setPointer(x, y) {
    state.targetPointerX = x
    state.targetPointerY = y
  }

  /** Fire the stress ripple — used when the Model Lab band scrolls into view. */
  function pulse() {
    state.targetRipple = 1
  }

  function update(time) {
    state.progress += (state.targetProgress - state.progress) * 0.07
    state.pointerX += (state.targetPointerX - state.pointerX) * 0.05
    state.pointerY += (state.targetPointerY - state.pointerY) * 0.05
    state.ripple += (state.targetRipple - state.ripple) * 0.03
    state.targetRipple *= 0.985

    const positions = geometry.attributes.position.array

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] = heightAt(basePositions[i], basePositions[i + 1], time, state.ripple)
    }

    geometry.attributes.position.needsUpdate = true

    const path = samplePath(state.progress)

    camera.position.set(
      path.pos[0] + state.pointerX * 0.9,
      path.pos[1] + state.pointerY * 0.55,
      path.pos[2],
    )
    camera.lookAt(path.look[0], path.look[1], path.look[2])

    mesh.rotation.z = time * 0.035 + state.pointerX * 0.06
    points.rotation.z = mesh.rotation.z

    meshMaterial.opacity = activePalette.lineOpacity * path.glow
    pointsMaterial.opacity = activePalette.pointOpacity * path.glow

    renderer.render(scene, camera)
  }

  function dispose() {
    geometry.dispose()
    pointsGeometry.dispose()
    meshMaterial.dispose()
    pointsMaterial.dispose()
    renderer.dispose()
  }

  return { update, resize, setProgress, setPointer, setPalette, pulse, dispose }
}
