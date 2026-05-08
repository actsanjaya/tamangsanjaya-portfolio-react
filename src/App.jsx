import { useEffect, useMemo, useState } from 'react'
import { Navbar } from './components/layout/Navbar.jsx'
import { Footer } from './components/layout/Footer.jsx'
import { modes } from './config/modes.js'
import { siteData } from './config/siteData.js'

const normalizePath = (path) => {
  const cleanPath = path.replace(/\/+$/, '')
  return cleanPath || '/'
}

const findModeByPath = (path) => {
  const normalizedPath = normalizePath(path)

  return (
    modes.find(
      (mode) =>
        normalizePath(mode.path) === normalizedPath ||
        mode.aliases?.some((alias) => normalizePath(alias) === normalizedPath),
    ) ?? modes.find((mode) => mode.id === 'default')
  )
}

function App() {
  const [activeMode, setActiveMode] = useState(() =>
    findModeByPath(window.location.pathname),
  )

  useEffect(() => {
    const handlePopState = () => {
      setActiveMode(findModeByPath(window.location.pathname))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (to) => {
    const targetUrl = new URL(to, window.location.origin)

    window.history.pushState({}, '', `${targetUrl.pathname}${targetUrl.hash}`)
    setActiveMode(findModeByPath(targetUrl.pathname))

    if (targetUrl.hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(targetUrl.hash)?.scrollIntoView()
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const ModeComponent = activeMode.component
  const stableModes = useMemo(
    () => modes.filter((mode) => mode.showInSwitcher),
    [],
  )

  return (
    <div className="siteShell">
      <Navbar
        activeMode={activeMode}
        modes={stableModes}
        onNavigate={navigate}
        siteData={siteData}
      />

      <ModeComponent onNavigate={navigate} siteData={siteData} />

      <Footer onNavigate={navigate} siteData={siteData} />
    </div>
  )
}

export default App
