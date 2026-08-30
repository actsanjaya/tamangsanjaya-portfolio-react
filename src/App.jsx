import { Suspense, useCallback, useEffect, useState } from 'react'
import { Navbar } from './components/layout/Navbar.jsx'
import { Footer } from './components/layout/Footer.jsx'
import { pages } from './config/pages.js'
import { siteData } from './config/siteData.js'
import { useTheme } from './hooks/useTheme.js'
import { SceneBackdrop } from './scene/SceneBackdrop.jsx'

const normalizePath = (path) => path.replace(/\/+$/, '') || '/'

const fallbackPage = pages.find((page) => page.isFallback) ?? pages[0]

const findPageByPath = (path) => {
  const normalized = normalizePath(path)

  return (
    pages.find(
      (page) =>
        normalizePath(page.path) === normalized ||
        page.aliases?.some((alias) => normalizePath(alias) === normalized),
    ) ?? fallbackPage
  )
}

function App() {
  const [activePage, setActivePage] = useState(() =>
    findPageByPath(window.location.pathname),
  )
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handlePopState = () =>
      setActivePage(findPageByPath(window.location.pathname))

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.title = activePage.title
  }, [activePage])

  const navigate = useCallback((to) => {
    const target = new URL(to, window.location.origin)
    const nextPage = findPageByPath(target.pathname)
    const samePage = target.pathname === window.location.pathname

    window.history.pushState({}, '', `${target.pathname}${target.hash}`)
    setActivePage(nextPage)

    if (target.hash) {
      // Give a freshly mounted page a frame to render before scrolling to it.
      window.requestAnimationFrame(() => {
        document.querySelector(target.hash)?.scrollIntoView({
          behavior: samePage ? 'smooth' : 'auto',
          block: 'start',
        })
      })
      return
    }

    window.scrollTo({ top: 0, behavior: samePage ? 'smooth' : 'auto' })
  }, [])

  const PageComponent = activePage.component

  return (
    <div className="siteShell">
      <SceneBackdrop theme={theme} />

      <Navbar
        activePageId={activePage.id}
        onNavigate={navigate}
        onToggleTheme={toggleTheme}
        siteData={siteData}
        theme={theme}
      />

      <Suspense
        fallback={
          <div className="routeFallback" role="status">
            Loading…
          </div>
        }
      >
        <PageComponent onNavigate={navigate} siteData={siteData} />
      </Suspense>

      <Footer onNavigate={navigate} siteData={siteData} />
    </div>
  )
}

export default App
