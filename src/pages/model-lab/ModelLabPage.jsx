import { useState } from 'react'
import { ArrowLeft, FlaskConical, Lock, Play } from 'lucide-react'
import { ModelRunner } from './components/ModelRunner.jsx'
import { models } from './registry.js'
import './modelLab.css'

function ModelCard({ entry, onOpen }) {
  const { manifest } = entry
  const isLive = manifest.status === 'live'

  return (
    <article className={`labModelCard${isLive ? ' isLive' : ''}`}>
      <header>
        <span className={`labStatusChip status-${manifest.status}`}>
          {isLive ? <Play aria-hidden="true" size={12} /> : <Lock aria-hidden="true" size={12} />}
          {isLive ? 'Runnable' : 'Coming soon'}
        </span>
        <span className="labModelCategory">{manifest.category}</span>
      </header>

      <h3>{manifest.title}</h3>
      <p>{manifest.oneLiner}</p>

      <dl className="labPlanned">
        <div>
          <dt>Inputs</dt>
          <dd>
            {(manifest.plannedInputs ?? manifest.inputs.map((input) => input.label)).join(' · ')}
          </dd>
        </div>
        <div>
          <dt>Outputs</dt>
          <dd>
            {(manifest.plannedOutputs ?? manifest.outputs.map((output) => output.label)).join(' · ')}
          </dd>
        </div>
      </dl>

      {isLive ? (
        <button className="labPrimaryButton" onClick={() => onOpen(manifest.id)} type="button">
          Open model
        </button>
      ) : (
        <button className="labPrimaryButton" disabled type="button">
          Coming soon
        </button>
      )}
    </article>
  )
}

export function ModelLabPage({ onNavigate }) {
  const [activeId, setActiveId] = useState(null)
  const active = models.find((entry) => entry.manifest.id === activeId) ?? null

  if (active) {
    return (
      <main className="site labPage" id="top">
        <button className="labBackButton" onClick={() => setActiveId(null)} type="button">
          <ArrowLeft aria-hidden="true" size={15} /> All models
        </button>

        <header className="labModelHeader">
          <h1>{active.manifest.title}</h1>
          <p>{active.manifest.oneLiner}</p>
          {active.manifest.isSample ? (
            <p className="labSampleNote">
              This is a worked example included to show how the lab behaves — inputs on
              the left, results and a downloadable projection on the right. Every model
              below follows the same shape.
            </p>
          ) : null}
        </header>

        <ModelRunner manifest={active.manifest} run={active.run} />
      </main>
    )
  }

  return (
    <main className="site labPage" id="top">
      <header className="labHero">
        <p className="labEyebrow">
          <FlaskConical aria-hidden="true" size={14} /> Model Lab
        </p>
        <h1>Run the models, not just read about them.</h1>
        <p className="labHeroText">
          Actuarial models built in Python and rebuilt to run in the browser. Change an
          assumption, watch the numbers move, and take the projection away as a CSV.
          Nothing you type here leaves your device — every model runs locally in this page.
        </p>
      </header>

      <section className="labModelGrid" aria-label="Available models">
        {models.map((entry) => (
          <ModelCard entry={entry} key={entry.manifest.id} onOpen={setActiveId} />
        ))}
      </section>

      <footer className="labFooterNote">
        <p>
          Models are added one at a time as each Python version is validated. All inputs
          and examples use sample or synthetic data — nothing here comes from any
          employer, client or policyholder file.
        </p>
        <button className="labGhostButton" onClick={() => onNavigate('/')} type="button">
          Back to the portfolio
        </button>
      </footer>
    </main>
  )
}
