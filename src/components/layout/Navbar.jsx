import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import {
  ArrowUpRight,
  FlaskConical,
  Gamepad2,
  Hand,
  Mail,
  Sparkles,
} from 'lucide-react'
import { ModeSwitcher } from './ModeSwitcher.jsx'

const defaultSections = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const testingModeIcons = {
  default: ArrowUpRight,
  gesture: Hand,
  gaming: Gamepad2,
  immersive: Sparkles,
  testing: FlaskConical,
}

export function Navbar({ activeMode, modes, onNavigate, siteData }) {
  if (activeMode.id === 'testing') {
    return (
      <TestingNavbar
        activeMode={activeMode}
        modes={modes}
        onNavigate={onNavigate}
        siteData={siteData}
      />
    )
  }

  const isDefaultMode = activeMode.id === 'default'

  return (
    <header className="navbar">
      <a
        className="brand"
        href="/default"
        onClick={(event) => {
          event.preventDefault()
          onNavigate('/default')
        }}
        aria-label="Go to default portfolio mode"
      >
        <span className="brandIcon" aria-hidden="true">
          &#8599;
        </span>
        <span className="brandName">{siteData.name}</span>
      </a>

      {isDefaultMode ? (
        <nav className="navLinks" aria-label="Portfolio sections">
          {defaultSections.map((section) => (
            <a href={section.href} key={section.href}>
              {section.label}
            </a>
          ))}
        </nav>
      ) : (
        <a
          className="navReturnLink"
          href="/default"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('/default')
          }}
        >
          Return to Default Mode
        </a>
      )}

      <div className="navbarActions">
        <ModeSwitcher activeModeId={activeMode.id} modes={modes} onNavigate={onNavigate} />

        <a
          className="navButton"
          href={isDefaultMode ? '#contact' : '/default#contact'}
          onClick={(event) => {
            event.preventDefault()
            onNavigate('/default#contact')
          }}
        >
          &#9993; Contact Me
        </a>
      </div>
    </header>
  )
}

function TestingNavbar({ activeMode, modes, onNavigate, siteData }) {
  return (
    <header className="navbar navbarTesting3D">
      <div className="navbarTestingInner">
        <a
          className="navbarTestingBrand"
          href="/testing"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('/testing')
          }}
          aria-label="Go to testing portfolio home"
        >
          <span className="navbarTestingBrandIcon" aria-hidden="true">
            <ArrowUpRight size={17} strokeWidth={2.1} />
          </span>
          <span className="navbarTestingBrandName">{siteData.name}</span>
        </a>

        <nav className="navbarTestingSectionLinks" aria-label="Testing portfolio sections">
          {defaultSections.map((section) => (
            <a
              href={`/testing${section.href}`}
              key={section.href}
              onClick={(event) => {
                event.preventDefault()
                onNavigate(`/testing${section.href}`)
              }}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <nav className="navbarTestingModeLinks" aria-label="Portfolio mode switcher">
          {modes.map((mode) => {
            const Icon = testingModeIcons[mode.id] ?? ArrowUpRight
            const modePath = mode.id === 'default' ? '/default' : mode.path
            const modeLabel = mode.id === 'immersive' ? 'Immersive' : mode.name
            const isActive = activeMode.id === mode.id

            return (
              <a
                aria-current={isActive ? 'page' : undefined}
                className="navbarTestingModeLink"
                href={modePath}
                key={mode.id}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate(modePath)
                }}
              >
                <span className="navbarTestingModeIcon" aria-hidden="true">
                  <Icon size={15} strokeWidth={2} />
                </span>
                <strong>{modeLabel}</strong>
                <span
                  className={`navbarTestingModeBadge navbarTestingModeBadge-${mode.status}`}
                >
                  {mode.status}
                </span>
              </a>
            )
          })}
        </nav>

        <a
          className="navbarTestingContact"
          href="/testing#contact"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('/testing#contact')
          }}
        >
          <Mail aria-hidden="true" size={16} strokeWidth={2.1} />
          <span>Contact Me</span>
        </a>
      </div>
    </header>
  )
}
