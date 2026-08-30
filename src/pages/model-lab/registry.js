import { manifest as sampleBondPv } from './models/sample-bond-pv/manifest.js'
import { run as runSampleBondPv } from './models/sample-bond-pv/run.js'

/**
 * THE MODEL REGISTRY
 * ==================
 * Adding a model is one entry here plus a folder under `models/`. Nothing else
 * in the site changes — the lab index, the runner, the chart, the table and the
 * CSV export are all driven by the manifest.
 *
 *   { manifest, run }                 -> status 'live', fully runnable
 *   { manifest } with status 'coming-soon' -> honest placeholder card
 *
 * See `models/_template/` for the manifest fields and the run() contract.
 */
export const models = [
  { manifest: sampleBondPv, run: runSampleBondPv },

  // --- Placeholders. Swap each for a real manifest + run when the Python
  // --- model is ready to be ported. Order here is the order on the page.
  {
    manifest: {
      id: 'mark-to-model',
      title: 'Mark-to-Model Engine',
      shortTitle: 'MTM',
      oneLiner:
        'Asset valuation from editable inputs — validation, cashflow projection, discount factors, stress scenarios and automated PV outputs.',
      category: 'Valuation',
      status: 'coming-soon',
      plannedInputs: ['Asset schedule', 'Discount curve', 'Stress scenarios'],
      plannedOutputs: ['PV per asset', 'Portfolio PV', 'Stressed PV', 'Validation summary'],
      sourceRepo: null,
    },
  },
  {
    manifest: {
      id: 'loan-model',
      title: 'Loan Model',
      shortTitle: 'Loan',
      oneLiner:
        'Amortisation schedule, instalment calculation, interest and principal split, outstanding balance and prepayment sensitivity.',
      category: 'Lending',
      status: 'coming-soon',
      plannedInputs: ['Principal', 'Rate', 'Term', 'Repayment frequency', 'Prepayment'],
      plannedOutputs: ['Instalment', 'Amortisation schedule', 'Total interest', 'Balance curve'],
      sourceRepo: null,
    },
  },
  {
    manifest: {
      id: 'liability-valuation',
      title: 'Liability Valuation Model',
      shortTitle: 'Valuation',
      oneLiner:
        'Reserving run over model points — assumptions, projected cashflows and reserve summaries.',
      category: 'Valuation',
      status: 'coming-soon',
      plannedInputs: ['Model points', 'Mortality basis', 'Interest basis', 'Expense basis'],
      plannedOutputs: ['Reserve by product', 'Projected cashflows', 'Basis comparison'],
      sourceRepo: null,
    },
  },
  {
    manifest: {
      id: 'pricing-model',
      title: 'Pricing Model',
      shortTitle: 'Pricing',
      oneLiner:
        'Life insurance premium calculation from mortality, interest and expense assumptions, with profit testing.',
      category: 'Pricing',
      status: 'coming-soon',
      plannedInputs: ['Age and term', 'Sum assured', 'Mortality table', 'Expense loadings'],
      plannedOutputs: ['Office premium', 'Premium breakdown', 'Profit signature'],
      sourceRepo: null,
    },
  },
  {
    manifest: {
      id: 'sensitivity-testing',
      title: 'Sensitivity Testing',
      shortTitle: 'Sensitivity',
      oneLiner:
        'Flex one assumption at a time across any model in this lab and read the impact off a tornado chart.',
      category: 'Analysis',
      status: 'coming-soon',
      plannedInputs: ['Base model', 'Assumptions to flex', 'Shock sizes'],
      plannedOutputs: ['Tornado chart', 'Sensitivity table', 'Scenario comparison'],
      sourceRepo: null,
    },
  },
]

export const findModel = (id) => models.find((model) => model.manifest.id === id) ?? null
