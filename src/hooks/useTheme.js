import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'st-theme'

const readStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

const DEFAULT_THEME = 'dark'

/**
 * Theme is one of 'light' | 'dark'.
 *
 * The site opens dark: the 3D backdrop is the point of the page, and glow and
 * depth simply do not read on a white ground. A visitor who picks light in the
 * navbar keeps light on every later visit.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => readStoredTheme() ?? DEFAULT_THEME)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'

      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Storage can be unavailable (private mode, blocked cookies). The
        // theme still applies for this visit.
      }

      return next
    })
  }, [])

  return { theme, toggleTheme }
}
