import { ModeSwitcher } from './ModeSwitcher.jsx'

const defaultSections = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar({ activeMode, modes, onNavigate, siteData }) {
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
          ↗
        </span>
        <span>{siteData.name}</span>
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
        <ModeSwitcher
          activeModeId={activeMode.id}
          modes={modes}
          onNavigate={onNavigate}
        />

        <a
          className="navButton"
          href={isDefaultMode ? '#contact' : `mailto:${siteData.email}`}
        >
          ✉ Contact Me
        </a>
      </div>
    </header>
  )
}
