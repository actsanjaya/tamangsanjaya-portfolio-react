import { useEffect, useRef, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navLinks } from '../../config/pages.js'

/**
 * Three zones: the wordmark on the left, a floating glass capsule of section
 * links in the middle, and the theme toggle plus the one call to action on the
 * right. Contact is deliberately not a link in the capsule — it is the button.
 */
export function Navbar({
  activePageId,
  onNavigate,
  onToggleTheme,
  siteData,
  theme,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.body.classList.add('hasOpenNavDrawer')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('hasOpenNavDrawer')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  const go = (event, href) => {
    event.preventDefault()
    setIsMenuOpen(false)
    onNavigate(href)
  }

  const isActive = (link) => link.isRoute && activePageId === 'model-lab'

  return (
    <header className={`navbar${isScrolled ? ' isScrolled' : ''}`}>
      <a
        className="brand"
        href="/"
        onClick={(event) => go(event, '/')}
        aria-label="Go to the top of the portfolio"
      >
        <span className="brandIcon" aria-hidden="true">
          &#8599;
        </span>
        <span className="brandName">{siteData.name}</span>
      </a>

      <nav className="navCapsule" aria-label="Site sections">
        {navLinks.map((link) => (
          <a
            aria-current={isActive(link) ? 'page' : undefined}
            className={link.isRoute ? 'navLinkRoute' : undefined}
            href={link.href}
            key={link.href}
            onClick={(event) => go(event, link.href)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="navbarActions">
        <button
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="iconButton themeToggle"
          onClick={onToggleTheme}
          type="button"
        >
          {theme === 'dark' ? (
            <Sun aria-hidden="true" size={17} strokeWidth={2.1} />
          ) : (
            <Moon aria-hidden="true" size={17} strokeWidth={2.1} />
          )}
        </button>

        <a
          className="navButton"
          href="/#contact"
          onClick={(event) => go(event, '/#contact')}
        >
          Contact Me
        </a>

        <button
          aria-controls="navDrawer"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="iconButton navMenuButton"
          onClick={() => setIsMenuOpen((open) => !open)}
          ref={menuButtonRef}
          type="button"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={19} strokeWidth={2.1} />
          ) : (
            <Menu aria-hidden="true" size={19} strokeWidth={2.1} />
          )}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="navDrawer" id="navDrawer">
          <nav aria-label="Site sections">
            {navLinks.map((link) => (
              <a
                href={link.href}
                key={link.href}
                onClick={(event) => go(event, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            className="navButton navDrawerCta"
            href="/#contact"
            onClick={(event) => go(event, '/#contact')}
          >
            Contact Me
          </a>
        </div>
      ) : null}

      {isMenuOpen ? (
        <button
          aria-hidden="true"
          className="navDrawerScrim"
          onClick={() => setIsMenuOpen(false)}
          tabIndex={-1}
          type="button"
        />
      ) : null}
    </header>
  )
}
