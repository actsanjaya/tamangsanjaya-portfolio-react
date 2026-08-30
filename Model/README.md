# Model

Source of truth for the actuarial models that appear in the site's **Model Lab**
(`/model`).

Each model lives in its own folder here, holding the real Python implementation
plus whatever sample data and notes it needs. The browser version on the site is
a **port of the calculation**, not a copy of the code — the site never runs
Python.

```
Model/
  README.md
  <model-id>/
    README.md            what the model does, the method, the assumptions
    model.py             the Python implementation
    sample_inputs.xlsx   synthetic inputs only — never real data
    reference_case.md    one worked example with figures to six decimals
```

## Getting a model onto the site

1. **Finish and validate it here**, in Python. Write `reference_case.md`: one
   full set of inputs and the exact outputs, to six decimal places. That file is
   the contract.

2. **Create the browser folder**:
   `src/pages/model-lab/models/<model-id>/`, copied from
   `src/pages/model-lab/models/_template/`.

3. **Fill in `manifest.js`** — inputs (with defaults), outputs, charts, table
   columns, assumptions, method notes, limitations, disclaimer. The lab builds
   the whole interface from this; there is no per-model UI to write.

4. **Port the maths into `run.js`** as one pure function:
   `run(inputs) -> { summary, series, table, warnings }`. No network, no DOM, no
   throwing — invalid inputs come back as `warnings`.

5. **Check it against the reference case.** Run the same inputs through `run.js`
   and compare with `reference_case.md`. They must agree to six decimals. Save
   the expected figures as `reference.js` beside `run.js` so the next change to
   the model has something to fail against.

6. **Register it** — one entry in `src/pages/model-lab/registry.js`, swapping the
   `coming-soon` placeholder for `{ manifest, run }`.

Nothing else changes. The card, the inputs form, the summary tiles, the chart,
the projection table and the CSV export all come from the manifest.

## Rules

- **Synthetic or sample data only.** No employer, client, policyholder, product,
  assumption or company file goes in this folder or anywhere in this repo.
- **State the limitations.** The browser version is usually simpler than the
  Python one; say so in `manifest.limitations` rather than implying parity.
- **Keep the browser port honest.** If a model genuinely needs pandas, scipy or a
  large reference table, it stays here and the site links to a case study — do
  not fake it with a cut-down version presented as the real thing.

## Status

| Model | Python | On the site |
|---|---|---|
| Mark-to-Model Engine | in progress | placeholder |
| Loan Model | not started | placeholder |
| Liability Valuation | not started | placeholder |
| Pricing Model | not started | placeholder |
| Sensitivity Testing | not started | placeholder |
