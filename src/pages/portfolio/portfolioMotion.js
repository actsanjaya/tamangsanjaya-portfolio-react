/*
 * Reveal and hover motion.
 *
 * Two rules, both learned the hard way:
 *
 *  - No `filter: blur()` in a reveal. Animating to `blur(0px)` leaves the
 *    element on a filtered composited layer, and its text stays visibly soft
 *    long after the animation has finished.
 *  - No fractional `scale`. A scaled layer rasterises once and stretches the
 *    bitmap, which softens text the same way.
 *
 * Opacity and whole-pixel translation are the safe pair. Everything here uses
 * only those.
 */
export const easing = [0.22, 1, 0.36, 1]

export const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easing,
    },
  },
}

export const cardReveal = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easing,
    },
  },
}

export const containerStagger = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

export const heroContainer = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export const heroItem = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easing,
    },
  },
}

export const heroVisualReveal = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: easing,
      delay: 0.15,
    },
  },
}

export const contactPanelReveal = {
  hidden: {
    opacity: 0,
    y: -8,
    height: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: {
      duration: 0.34,
      ease: easing,
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    height: 0,
    transition: {
      duration: 0.24,
      ease: easing,
    },
  },
}

export const softHover = {
  y: -6,
}

export const card3DHover = {
  y: -6,
  transition: {
    duration: 0.22,
    ease: easing,
  },
}

export const buttonHover = {
  y: -2,
}

export const viewportOnce = {
  once: true,
  amount: 0.18,
}

export const reducedMotionVariants = {
  section: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.25,
      },
    },
  },
  card: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  },
  panel: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.18,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.14,
      },
    },
  },
  heroItem: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  },
  heroVisual: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.22,
      },
    },
  },
}
