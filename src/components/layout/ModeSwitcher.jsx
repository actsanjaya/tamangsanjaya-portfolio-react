import { Badge } from '../ui/Badge.jsx'

export function ModeSwitcher({ activeModeId, modes, onNavigate, renderModeIcon }) {
  return (
    <nav className="modeSwitcher" aria-label="Portfolio mode switcher">
      {modes.map((mode) => (
        <a
          aria-current={activeModeId === mode.id ? 'page' : undefined}
          className="modeSwitchLink"
          href={mode.id === 'default' ? '/default' : mode.path}
          key={mode.id}
          onClick={(event) => {
            event.preventDefault()
            onNavigate(mode.id === 'default' ? '/default' : mode.path)
          }}
        >
          <span className="modeSwitchIcon" aria-hidden="true">
            {renderModeIcon ? renderModeIcon(mode) : mode.icon}
          </span>
          <span>
            <strong>{mode.name}</strong>
            <small>{mode.description}</small>
          </span>
          <Badge tone={mode.status === 'stable' ? 'stable' : 'beta'}>
            {mode.status}
          </Badge>
        </a>
      ))}
    </nav>
  )
}
