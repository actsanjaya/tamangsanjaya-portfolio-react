/**
 * MODEL MANIFEST TEMPLATE
 * =======================
 * Copy this folder to `src/pages/model-lab/models/<your-model-id>/`, fill in the
 * manifest, implement `run.js`, then add one line to `../../registry.js`.
 *
 * Nothing else in the site needs to change — the Model Lab renders the inputs
 * form, the summary tiles, the chart, the projection table and the CSV export
 * straight from what you declare here.
 */
export const manifest = {
  id: 'template-model',
  title: 'Template Model',
  shortTitle: 'Template',
  oneLiner: 'One sentence a non-actuarial visitor understands.',
  category: 'Valuation',

  /** 'live' renders the runner. 'coming-soon' renders an honest placeholder. */
  status: 'coming-soon',

  /**
   * Every input needs a default, so the model shows a full result before the
   * visitor touches anything.
   *
   * type:  'number' | 'percent' | 'currency' | 'integer' | 'select'
   * group: optional heading used to bucket inputs in the form
   */
  inputs: [
    {
      key: 'exampleRate',
      label: 'Discount rate',
      type: 'percent',
      group: 'Assumptions',
      default: 8,
      min: 0,
      max: 40,
      step: 0.25,
      unit: '% p.a.',
      help: 'Annual effective rate used to discount the projected cashflows.',
    },
  ],

  /** Headline figures, in the order they should read. `key` matches run()'s summary. */
  outputs: [
    { key: 'presentValue', label: 'Present value', format: 'currency' },
  ],

  /** Charts are declared, not hand-built. `series` matches run()'s series keys. */
  charts: [
    {
      id: 'cashflow',
      title: 'Projected cashflow',
      type: 'area',
      series: 'cashflow',
      xLabel: 'Year',
      yLabel: 'Amount',
      yFormat: 'currency',
    },
  ],

  /** Columns for the projection table and the CSV export. */
  tableColumns: [
    { key: 'year', label: 'Year', format: 'integer' },
    { key: 'cashflow', label: 'Cashflow', format: 'currency' },
  ],

  assumptions: [
    'State every assumption the model makes, in plain language.',
    'Annual timesteps, cashflows assumed to occur at end of year.',
  ],

  methodNotes:
    'Two or three sentences on the method, so a reviewer can tell what this does and what it does not do.',

  limitations: [
    'What this simplified browser version leaves out compared with the full Python model.',
  ],

  sourceRepo: null,

  disclaimer:
    'Demonstration model built on sample data. Not advice, and not a substitute for a full actuarial valuation.',
}
