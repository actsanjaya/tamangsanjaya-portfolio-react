import { useEffect, useRef } from 'react'
import './scene.css'

// Deliberately faint. The surface is a backdrop, not a subject — at full
// strength the wireframe wins every legibility fight against the body copy.
const PALETTES = {
  dark: { line: '#4f8ff7', lineOpacity: 0.3, point: '#22b8cf', pointOpacity: 0.42 },
  light: { line: '#2563eb', lineOpacity: 0.16, point: '#0891b2', pointOpacity: 0.24 },
}

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

/**
 * The persistent 3D backdrop.
 *
 * One fixed canvas behind the whole document. Scroll position drives the camera
 * along a keyframed path, so the scene carries the visitor from section to
 * section instead of sitting still behind them.
 *
 * three.js is imported dynamically — it never blocks first paint, and on phones
 * or under reduced-motion it is never fetched at all. In those cases the CSS
 * gradient in `scene.css` is the backdrop, which is why that gradient is a
 * designed state and not a placeholder.
 */
export function SceneBackdrop({ theme }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    // Phones get the gradient. A full-viewport wireframe surface is the single
    // most expensive thing we could put on a mid-range Android, and the payoff
    // on a 390px screen is small.
    const smallScreen = window.matchMedia('(max-width: 820px)').matches

    if (smallScreen || prefersReducedMotion()) return undefined

    let disposed = false
    let frame = null

    import('three')
      .then(async (THREE) => {
        if (disposed || !canvasRef.current) return

        const { createDiscountSurface } = await import('./discountSurface.js')
        if (disposed || !canvasRef.current) return

        const scene = createDiscountSurface(THREE, {
          canvas: canvasRef.current,
          palette: PALETTES[theme] ?? PALETTES.dark,
        })

        sceneRef.current = scene
        canvasRef.current.dataset.ready = 'true'

        const resize = () => scene.resize(window.innerWidth, window.innerHeight)

        const onScroll = () => {
          const scrollable = document.body.scrollHeight - window.innerHeight
          scene.setProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
        }

        const onPointerMove = (event) => {
          scene.setPointer(
            (event.clientX / window.innerWidth - 0.5) * 2,
            (event.clientY / window.innerHeight - 0.5) * 2,
          )
        }

        resize()
        onScroll()

        window.addEventListener('resize', resize)
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('pointermove', onPointerMove, { passive: true })

        // The Model Lab band fires the stress ripple as it comes into view.
        const band = document.getElementById('model')
        const observer = band
          ? new IntersectionObserver(
              (entries) => entries.forEach((entry) => entry.isIntersecting && scene.pulse()),
              { threshold: 0.4 },
            )
          : null
        if (band && observer) observer.observe(band)

        const start = performance.now()
        const loop = () => {
          scene.update((performance.now() - start) / 1000)
          frame = window.requestAnimationFrame(loop)
        }
        loop()

        scene.cleanup = () => {
          window.removeEventListener('resize', resize)
          window.removeEventListener('scroll', onScroll)
          window.removeEventListener('pointermove', onPointerMove)
          observer?.disconnect()
        }
      })
      .catch(() => {
        // three failed to load. The gradient backdrop stands on its own.
      })

    return () => {
      disposed = true
      if (frame) window.cancelAnimationFrame(frame)
      sceneRef.current?.cleanup?.()
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
    // Built once. Theme changes are pushed through setPalette below rather than
    // rebuilding the whole scene.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    sceneRef.current?.setPalette(PALETTES[theme] ?? PALETTES.dark)
  }, [theme])

  return (
    <div className="sceneBackdrop" aria-hidden="true">
      <canvas className="sceneCanvas" ref={canvasRef} />
      <div className="sceneVignette" />
    </div>
  )
}
