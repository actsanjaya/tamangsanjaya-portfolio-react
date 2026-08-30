export function AssumptionsPanel({ manifest }) {
  return (
    <section className="labAssumptions" aria-labelledby="lab-assumptions-title">
      <h3 id="lab-assumptions-title">Method and assumptions</h3>

      <p className="labMethodNotes">{manifest.methodNotes}</p>

      {manifest.assumptions?.length ? (
        <>
          <h4>Assumptions</h4>
          <ul>
            {manifest.assumptions.map((assumption) => (
              <li key={assumption}>{assumption}</li>
            ))}
          </ul>
        </>
      ) : null}

      {manifest.limitations?.length ? (
        <>
          <h4>Limitations</h4>
          <ul>
            {manifest.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </>
      ) : null}

      <p className="labDisclaimer">{manifest.disclaimer}</p>
    </section>
  )
}
