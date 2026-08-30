const project = (notional, couponRate, termYears, rate) => {
  const coupon = notional * couponRate
  const rows = []

  let presentValue = 0
  let weightedTime = 0

  for (let year = 1; year <= termYears; year += 1) {
    const cashflow = coupon + (year === termYears ? notional : 0)
    const discountFactor = 1 / (1 + rate) ** year
    const discounted = cashflow * discountFactor

    presentValue += discounted
    weightedTime += year * discounted
    rows.push({ year, cashflow, discountFactor, discounted })
  }

  return { rows, presentValue, weightedTime }
}

/**
 * @param {{notional:number, couponRate:number, termYears:number,
 *          discountRate:number, stressBps:number}} inputs
 */
export function run(inputs) {
  const warnings = []

  const notional = Number(inputs.notional)
  const couponRate = Number(inputs.couponRate) / 100
  const termYears = Math.round(Number(inputs.termYears))
  const discountRate = Number(inputs.discountRate) / 100
  const stressedRate = discountRate + Number(inputs.stressBps) / 10000

  const invalid = [
    [notional > 0, 'Face value must be greater than zero.'],
    [couponRate >= 0, 'Coupon rate cannot be negative.'],
    [termYears >= 1, 'Term must be at least one year.'],
    [discountRate > -1, 'Discount rate must be greater than -100%.'],
  ].filter(([ok]) => !ok)

  if (invalid.length > 0) {
    return { summary: {}, series: {}, table: [], warnings: invalid.map(([, message]) => message) }
  }

  if (stressedRate <= -1) {
    warnings.push('The stressed discount rate falls below -100%; the stressed scenario is not meaningful.')
  }

  const base = project(notional, couponRate, termYears, discountRate)
  const stressed = project(notional, couponRate, termYears, stressedRate)

  if (discountRate < couponRate) {
    warnings.push('The discount rate is below the coupon rate, so the bond prices above par.')
  }

  return {
    summary: {
      presentValue: base.presentValue,
      stressedValue: stressed.presentValue,
      stressImpactPct:
        base.presentValue === 0
          ? 0
          : ((stressed.presentValue - base.presentValue) / base.presentValue) * 100,
      macaulayDuration: base.presentValue === 0 ? 0 : base.weightedTime / base.presentValue,
    },
    series: {
      cashflow: base.rows.map((row) => ({ x: row.year, y: row.cashflow })),
      discounted: base.rows.map((row) => ({ x: row.year, y: row.discounted })),
    },
    table: base.rows,
    warnings,
  }
}
