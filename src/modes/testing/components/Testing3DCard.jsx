import { forwardRef, useCallback, useEffect, useRef } from 'react'
import { motion } from 'motion/react'

const motionElements = {
  article: motion.article,
  div: motion.div,
  section: motion.section,
}

const joinClassNames = (...classNames) => classNames.filter(Boolean).join(' ')

export const Testing3DIconBadge = ({ accent = 'blue', children, className = '' }) => (
  <div
    className={joinClassNames('testing3DIconBadge', className)}
    data-testing-accent={accent}
    aria-hidden="true"
  >
    {children}
  </div>
)

export const Testing3DTag = ({ children, className = '' }) => (
  <span className={joinClassNames('testing3DTag', className)}>{children}</span>
)

export const Testing3DGlowPanel = ({ children, className = '', ...props }) => (
  <div className={joinClassNames('testing3DGlowPanel', className)} {...props}>
    {children}
  </div>
)

export const Testing3DSection = ({ children, className = '', ...props }) => (
  <section className={joinClassNames('testing3DSection', className)} {...props}>
    {children}
  </section>
)

export const Testing3DCard = forwardRef(function Testing3DCard(
  {
    accent = 'blue',
    as = 'article',
    children,
    className = '',
    hover,
    icon: Icon,
    maxRotateX = 3,
    maxRotateY = 4,
    motionEnabled = false,
    onPointerLeave,
    onPointerMove,
    style,
    tiltEnabled = false,
    variants,
    ...props
  },
  forwardedRef,
) {
  const localRef = useRef(null)
  const frameRef = useRef(null)

  const setRefs = useCallback(
    (node) => {
      localRef.current = node

      if (typeof forwardedRef === 'function') {
        forwardedRef(node)
        return
      }

      if (forwardedRef) {
        forwardedRef.current = node
      }
    },
    [forwardedRef],
  )

  useEffect(
    () => () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }
    },
    [],
  )

  const handlePointerMove = (event) => {
    onPointerMove?.(event)

    if (!tiltEnabled || event.pointerType === 'touch' || !localRef.current) {
      return
    }

    const rect = localRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const rotateY = (x - 0.5) * maxRotateY * 2
    const rotateX = (0.5 - y) * maxRotateX * 2

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = window.requestAnimationFrame(() => {
      if (!localRef.current) return

      localRef.current.style.setProperty('--card-rotate-x', `${rotateX.toFixed(2)}deg`)
      localRef.current.style.setProperty('--card-rotate-y', `${rotateY.toFixed(2)}deg`)
      localRef.current.style.setProperty('--card-shine-x', `${(x * 100).toFixed(2)}%`)
      localRef.current.style.setProperty('--card-shine-y', `${(y * 100).toFixed(2)}%`)
    })
  }

  const handlePointerLeave = (event) => {
    onPointerLeave?.(event)

    if (!tiltEnabled || !localRef.current) {
      return
    }

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = window.requestAnimationFrame(() => {
      if (!localRef.current) return

      localRef.current.style.setProperty('--card-rotate-x', '0deg')
      localRef.current.style.setProperty('--card-rotate-y', '0deg')
      localRef.current.style.setProperty('--card-shine-x', '50%')
      localRef.current.style.setProperty('--card-shine-y', '0%')
    })
  }

  const Element = motionEnabled ? (motionElements[as] ?? motion.article) : as
  const motionProps = motionEnabled
    ? {
        variants,
        whileHover: hover,
      }
    : {}
  const tiltStyle = tiltEnabled
    ? {
        '--card-rotate-x': '0deg',
        '--card-rotate-y': '0deg',
        '--card-shine-x': '50%',
        '--card-shine-y': '0%',
        rotateX: 'var(--card-rotate-x)',
        rotateY: 'var(--card-rotate-y)',
        transformPerspective: 1200,
      }
    : {}

  return (
    <Element
      {...props}
      {...motionProps}
      className={joinClassNames(
        className,
        tiltEnabled && 'testing3DCard testing3DCardInteractive',
      )}
      data-testing-accent={accent}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={setRefs}
      style={{ ...style, ...tiltStyle }}
    >
      {Icon ? (
        <Testing3DIconBadge accent={accent}>
          <Icon size={18} strokeWidth={2} />
        </Testing3DIconBadge>
      ) : null}
      {tiltEnabled ? <span className="testing3DCardShine" aria-hidden="true"></span> : null}
      {children}
    </Element>
  )
})
