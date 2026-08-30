import { formatValue } from '../format.js'

export function SummaryTiles({ outputs, summary }) {
  return (
    <div className="labSummary">
      {outputs.map((output) => {
        const value = summary[output.key]
        const isNegative = typeof value === 'number' && value < 0

        return (
          <div
            className={`labSummaryTile${output.emphasis ? ' isPrimary' : ''}`}
            key={output.key}
          >
            <span className="labSummaryLabel">{output.label}</span>
            <strong
              className={
                output.format === 'signedPercent'
                  ? `labSummaryValue ${isNegative ? 'isDown' : 'isUp'}`
                  : 'labSummaryValue'
              }
            >
              {formatValue(value, output.format)}
            </strong>
          </div>
        )
      })}
    </div>
  )
}
