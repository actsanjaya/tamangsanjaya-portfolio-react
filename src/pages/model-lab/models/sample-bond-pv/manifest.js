export const manifest = {
  id: 'sample-bond-pv',
  title: 'Sample: Bond Present Value',
  shortTitle: 'Bond PV',
  oneLiner:
    'A worked discounted-cashflow example that demonstrates how every model in this lab behaves.',
  category: 'Valuation',
  status: 'live',
  isSample: true,

  inputs: [
    {
      key: 'notional',
      label: 'Face value',
      type: 'currency',
      group: 'Instrument',
      default: 1000000,
      min: 1000,
      max: 1000000000,
      step: 1000,
      unit: 'Rs.',
      help: 'Amount repaid at maturity.',
    },
    {
      key: 'couponRate',
      label: 'Coupon rate',
      type: 'percent',
      group: 'Instrument',
      default: 8.5,
      min: 0,
      max: 30,
      step: 0.05,
      unit: '% p.a.',
      help: 'Annual coupon, paid at the end of each year.',
    },
    {
      key: 'termYears',
      label: 'Term',
      type: 'integer',
      group: 'Instrument',
      default: 10,
      min: 1,
      max: 40,
      step: 1,
      unit: 'years',
      help: 'Whole years to maturity.',
    },
    {
      key: 'discountRate',
      label: 'Discount rate',
      type: 'percent',
      group: 'Valuation basis',
      default: 9.25,
      min: 0.01,
      max: 30,
      step: 0.05,
      unit: '% p.a.',
      help: 'Annual effective rate used to discount the projected cashflows.',
    },
    {
      key: 'stressBps',
      label: 'Rate stress',
      type: 'number',
      group: 'Valuation basis',
      default: 100,
      min: -500,
      max: 500,
      step: 25,
      unit: 'bps',
      help: 'Parallel shift applied to the discount rate in the stressed scenario.',
    },
  ],

  outputs: [
    { key: 'presentValue', label: 'Present value', format: 'currency', emphasis: true },
    { key: 'stressedValue', label: 'Stressed PV', format: 'currency' },
    { key: 'stressImpactPct', label: 'Stress impact', format: 'signedPercent' },
    { key: 'macaulayDuration', label: 'Macaulay duration', format: 'years' },
  ],

  charts: [
    {
      id: 'cashflow',
      title: 'Projected cashflow and its present value',
      type: 'area',
      series: 'discounted',
      compareSeries: 'cashflow',
      seriesLabel: 'Discounted',
      compareLabel: 'Undiscounted',
      xLabel: 'Year',
      yLabel: 'Amount',
      yFormat: 'currency',
    },
  ],

  tableColumns: [
    { key: 'year', label: 'Year', format: 'integer' },
    { key: 'cashflow', label: 'Cashflow', format: 'currency' },
    { key: 'discountFactor', label: 'Discount factor', format: 'factor' },
    { key: 'discounted', label: 'Present value', format: 'currency' },
  ],

  assumptions: [
    'Annual coupons, paid at the end of each year.',
    'Face value repaid in full at maturity, with no default or prepayment.',
    'A single flat discount rate — no yield curve, no credit spread.',
    'The stress is a parallel shift of that flat rate.',
  ],

  methodNotes:
    'Each year’s cashflow is discounted at (1 + i)^-t and summed to a present value. The stressed scenario re-runs the same projection with the discount rate shifted by the stress, and Macaulay duration is the cashflow-weighted average time to payment.',

  limitations: [
    'A deliberately simple worked example, included to demonstrate the lab. It is not the mark-to-model engine.',
    'No yield curve, credit risk, tax, accrued interest or day-count conventions.',
  ],

  sourceRepo: null,

  disclaimer:
    'Sample model on illustrative inputs. Not advice, and not a substitute for a full valuation.',
}
