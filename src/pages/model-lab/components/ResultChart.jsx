import { useMemo, useState } from 'react'
import { formatValue } from '../format.js'

const VIEW = { width: 720, height: 320 }
const PAD = { top: 18, right: 18, bottom: 38, left: 68 }

const niceTicks = (max, count = 4) => {
  if (max <= 0) return [0]

  const rawStep = max / count
  const magnitude = 10 ** Math.floor(Math.log10(rawStep))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rawStep) ?? magnitude * 10
  const ticks = []

  for (let value = 0; value <= max + step / 2; value += step) ticks.push(value)
  return ticks
}

/**
 * Single-panel chart: one filled area for the primary series, one line for the
 * optional comparison series, shared y-scale (never a second axis). Hover gives
 * a crosshair and a tooltip; the projection table below is the table view.
 */
export function ResultChart({ chart, series }) {
  const [hoverIndex, setHoverIndex] = useState(null)

  const primary = useMemo(() => series[chart.series] ?? [], [chart.series, series])
  const compare = useMemo(
    () => (chart.compareSeries ? series[chart.compareSeries] ?? [] : []),
    [chart.compareSeries, series],
  )

  const geometry = useMemo(() => {
    const all = [...primary, ...compare]
    if (all.length === 0) return null

    const maxY = Math.max(...all.map((point) => point.y), 0)
    const minX = Math.min(...primary.map((point) => point.x))
    const maxX = Math.max(...primary.map((point) => point.x))
    const ticks = niceTicks(maxY)
    const top = ticks[ticks.length - 1] || 1

    const plotWidth = VIEW.width - PAD.left - PAD.right
    const plotHeight = VIEW.height - PAD.top - PAD.bottom

    const xScale = (x) =>
      PAD.left + (maxX === minX ? plotWidth / 2 : ((x - minX) / (maxX - minX)) * plotWidth)
    const yScale = (y) => PAD.top + plotHeight - (y / top) * plotHeight

    const toPath = (points) =>
      points.map((point, index) => `${index === 0 ? 'M' : 'L'}${xScale(point.x).toFixed(2)},${yScale(point.y).toFixed(2)}`).join(' ')

    return {
      ticks,
      xScale,
      yScale,
      baseline: PAD.top + plotHeight,
      primaryPath: toPath(primary),
      comparePath: toPath(compare),
      areaPath: primary.length
        ? `${toPath(primary)} L${xScale(primary[primary.length - 1].x).toFixed(2)},${(PAD.top + plotHeight).toFixed(2)} L${xScale(primary[0].x).toFixed(2)},${(PAD.top + plotHeight).toFixed(2)} Z`
        : '',
    }
  }, [primary, compare])

  if (!geometry) return null

  const hovered = hoverIndex === null ? null : primary[hoverIndex]
  const hoveredCompare = hoverIndex === null ? null : compare[hoverIndex]

  const handlePointer = (event) => {
    const svg = event.currentTarget
    const rect = svg.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    const x = ratio * VIEW.width
    let closest = 0
    let closestDistance = Infinity

    primary.forEach((point, index) => {
      const distance = Math.abs(geometry.xScale(point.x) - x)
      if (distance < closestDistance) {
        closestDistance = distance
        closest = index
      }
    })

    setHoverIndex(closest)
  }

  return (
    <figure className="labChart">
      <figcaption>
        <h3>{chart.title}</h3>

        <div className="labChartLegend">
          <span className="labLegendItem">
            <span className="labLegendSwatch isPrimary" aria-hidden="true" />
            {chart.seriesLabel ?? chart.series}
          </span>
          {chart.compareSeries ? (
            <span className="labLegendItem">
              <span className="labLegendSwatch isCompare" aria-hidden="true" />
              {chart.compareLabel ?? chart.compareSeries}
            </span>
          ) : null}
        </div>
      </figcaption>

      <div className="labChartSurface">
        <svg
          onPointerLeave={() => setHoverIndex(null)}
          onPointerMove={handlePointer}
          role="img"
          aria-label={`${chart.title}. Full figures are listed in the projection table below.`}
          viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        >
          {geometry.ticks.map((tick) => (
            <g key={tick}>
              <line
                className="labChartGrid"
                x1={PAD.left}
                x2={VIEW.width - PAD.right}
                y1={geometry.yScale(tick)}
                y2={geometry.yScale(tick)}
              />
              <text
                className="labChartAxisLabel"
                dominantBaseline="middle"
                textAnchor="end"
                x={PAD.left - 10}
                y={geometry.yScale(tick)}
              >
                {formatValue(tick, 'compactCurrency')}
              </text>
            </g>
          ))}

          {primary.map((point) => (
            <text
              className="labChartAxisLabel"
              key={point.x}
              textAnchor="middle"
              x={geometry.xScale(point.x)}
              y={VIEW.height - PAD.bottom + 20}
            >
              {point.x}
            </text>
          ))}

          <path className="labChartArea" d={geometry.areaPath} />
          <path className="labChartLine isPrimary" d={geometry.primaryPath} />
          {chart.compareSeries ? (
            <path className="labChartLine isCompare" d={geometry.comparePath} />
          ) : null}

          {hovered ? (
            <g>
              <line
                className="labChartCrosshair"
                x1={geometry.xScale(hovered.x)}
                x2={geometry.xScale(hovered.x)}
                y1={PAD.top}
                y2={geometry.baseline}
              />
              {hoveredCompare ? (
                <circle
                  className="labChartMarker isCompare"
                  cx={geometry.xScale(hoveredCompare.x)}
                  cy={geometry.yScale(hoveredCompare.y)}
                  r="5"
                />
              ) : null}
              <circle
                className="labChartMarker isPrimary"
                cx={geometry.xScale(hovered.x)}
                cy={geometry.yScale(hovered.y)}
                r="5"
              />
            </g>
          ) : null}

          <text className="labChartAxisTitle" textAnchor="middle" x={VIEW.width / 2} y={VIEW.height - 4}>
            {chart.xLabel}
          </text>
        </svg>

        {hovered ? (
          <div
            className="labChartTooltip"
            style={{ left: `${(geometry.xScale(hovered.x) / VIEW.width) * 100}%` }}
          >
            <strong>
              {chart.xLabel} {hovered.x}
            </strong>
            <span>
              <i className="labLegendSwatch isPrimary" aria-hidden="true" />
              {chart.seriesLabel ?? chart.series}: {formatValue(hovered.y, chart.yFormat)}
            </span>
            {hoveredCompare ? (
              <span>
                <i className="labLegendSwatch isCompare" aria-hidden="true" />
                {chart.compareLabel}: {formatValue(hoveredCompare.y, chart.yFormat)}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </figure>
  )
}
