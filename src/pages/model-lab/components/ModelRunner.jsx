import { useCallback, useMemo, useState } from 'react'
import { AssumptionsPanel } from './AssumptionsPanel.jsx'
import { InputsPanel } from './InputsPanel.jsx'
import { ProjectionTable } from './ProjectionTable.jsx'
import { ResultChart } from './ResultChart.jsx'
import { SummaryTiles } from './SummaryTiles.jsx'
import { toCsv } from '../format.js'

const defaultsFor = (inputs) =>
  Object.fromEntries(inputs.map((input) => [input.key, input.default]))

export function ModelRunner({ manifest, run }) {
  const [values, setValues] = useState(() => defaultsFor(manifest.inputs))

  const handleChange = useCallback((key, value) => {
    setValues((current) => ({ ...current, [key]: value }))
  }, [])

  const handleReset = useCallback(() => {
    setValues(defaultsFor(manifest.inputs))
  }, [manifest.inputs])

  // Inputs are a handful of arithmetic steps, so recomputing on change is
  // cheaper than a run button. A model that grows expensive moves to a worker.
  const result = useMemo(() => run(values), [run, values])

  const handleDownload = useCallback(() => {
    const csv = toCsv(manifest.tableColumns, result.table)
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')

    link.href = url
    link.download = `${manifest.id}-projection.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }, [manifest, result.table])

  const hasResult = result.table.length > 0

  return (
    <div className="labRunner">
      <aside className="labRunnerInputs">
        <InputsPanel
          inputs={manifest.inputs}
          onChange={handleChange}
          onReset={handleReset}
          values={values}
        />
      </aside>

      <div className="labRunnerResults">
        {result.warnings.length > 0 ? (
          <div className="labWarnings" role="status">
            {result.warnings.map((warning) => (
              <p key={warning}>{warning}</p>
            ))}
          </div>
        ) : null}

        {hasResult ? (
          <>
            <SummaryTiles outputs={manifest.outputs} summary={result.summary} />

            {manifest.charts.map((chart) => (
              <ResultChart chart={chart} key={chart.id} series={result.series} />
            ))}

            <ProjectionTable
              columns={manifest.tableColumns}
              onDownload={handleDownload}
              rows={result.table}
            />
          </>
        ) : (
          <p className="labEmptyState">
            Adjust the inputs on the left — the model could not produce a result from
            the current values.
          </p>
        )}

        <AssumptionsPanel manifest={manifest} />
      </div>
    </div>
  )
}
