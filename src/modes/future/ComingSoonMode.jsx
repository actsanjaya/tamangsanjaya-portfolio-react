import { Button } from '../../components/ui/Button.jsx'
import { Badge } from '../../components/ui/Badge.jsx'

export function ComingSoonMode({ onNavigate }) {
  return (
    <main className="site modePage" id="top">
      <section className="modeHero">
        <div className="modeHeroContent">
          <Badge>Coming Soon</Badge>
          <h1>This portfolio mode is reserved for a future experience.</h1>
          <p>
            Add a new component folder, register it in config/modes.js, and the
            mode system can surface it when it is ready.
          </p>
          <div className="modeActions">
            <Button onClick={() => onNavigate('/default')} variant="secondary">
              Return to Default Mode
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
