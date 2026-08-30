/**
 * RUN CONTRACT
 * ============
 * One pure function. No side effects, no network, no DOM. Same inputs in,
 * same result out — which is what makes it testable against a reference case.
 *
 * @param {Record<string, number|string>} inputs  keyed by manifest input `key`
 * @returns {{
 *   summary: Record<string, number>,   // keyed by manifest output `key`
 *   series:  Record<string, {x: number, y: number}[]>,
 *   table:   Record<string, number>[], // keyed by manifest tableColumns `key`
 *   warnings: string[]                 // shown to the visitor; never throw
 * }}
 */
export function run(inputs) {
  const warnings = []
  const rate = Number(inputs.exampleRate) / 100

  if (!Number.isFinite(rate)) {
    // Validate rather than throw — the UI shows the reason, not a stack trace.
    return { summary: {}, series: {}, table: [], warnings: ['Discount rate is not a number.'] }
  }

  const table = []
  let presentValue = 0

  for (let year = 1; year <= 10; year += 1) {
    const cashflow = 100
    const discountFactor = 1 / (1 + rate) ** year

    presentValue += cashflow * discountFactor
    table.push({ year, cashflow })
  }

  return {
    summary: { presentValue },
    series: { cashflow: table.map((row) => ({ x: row.year, y: row.cashflow })) },
    table,
    warnings,
  }
}
