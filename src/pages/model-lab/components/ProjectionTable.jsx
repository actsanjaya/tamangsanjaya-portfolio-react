import { formatValue } from '../format.js'

export function ProjectionTable({ columns, onDownload, rows }) {
  return (
    <section className="labTableBlock" aria-labelledby="lab-table-title">
      <div className="labTableHeader">
        <h3 id="lab-table-title">Projection</h3>
        <button className="labGhostButton" onClick={onDownload} type="button">
          Download CSV
        </button>
      </div>

      <div className="labTableScroll">
        <table className="labTable">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.year ?? index}>
                {columns.map((column) => (
                  <td key={column.key}>{formatValue(row[column.key], column.format)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
