/**
 * Regression reference for `run.js`.
 *
 * Verified against an independent Python implementation on 2026-08-30; every
 * figure below matched to six decimal places. If a change to `run.js` moves any
 * of these, the change is wrong until proven otherwise.
 *
 *   N = 1,000,000   coupon = 8.5%   term = 10y   i = 7.25%   stress = +100bps
 */
export const referenceCase = {
  inputs: {
    notional: 1000000,
    couponRate: 8.5,
    termYears: 10,
    discountRate: 7.25,
    stressBps: 100,
  },
  expected: {
    presentValue: 1086789.105921,
    stressedValue: 1016587.676668,
    stressImpactPct: -6.459526,
    macaulayDuration: 7.245323,
    rowCount: 10,
  },
  tolerance: 1e-6,
}
