# WorksAi LedgerFlow (`worksai-02`)

> Local-first zero-based envelope budgeting with universal bank CSV normalization and 90-day runway forecasting.

**Category:** A. Web apps  
**License:** MIT (Derivative of [Actual Budget](https://github.com/actualbudget/actual) @ `92865f3`)  
**Portfolio Page:** `https://devinai.uk/worksai/products/worksai-ledgerflow/`

## Value Proposition & Scope
Replaces YNAB ($109/year) with a local-first envelope budgeter that normalizes messy bank CSV exports, auto-categorizes merchants deterministically, flags subscription price creep, and forecasts 90-day cashflow runway.

### What Works Out-of-the-Box (Zero External Credentials Required)
CSV ingestion, merchant categorization rules, zero-based envelope budgeting, subscription price-creep detection, and 90-day cashflow forecasting.

### What Requires User Configuration (`.env.example`)
Optional `SIMPLEFIN_BRIDGE_TOKEN` (North America) for automated bank polling; optional `OPENAI_API_KEY` for ambiguous payee classification.

## Measurable Acceptance Criteria
- AC-01: Normalizes heterogeneous bank CSV rows (Date, Payee/Description, Amount/Debit/Credit) into integer-cent transactions without floating-point rounding drift.
- AC-02: Auto-categorizes merchants using deterministic keyword/regex rules and calculates exact zero-based envelope balances.
- AC-03: Detects recurring vendor charges that increased by >5% month-over-month as subscription price creep.
- AC-04: Computes 90-day cashflow runway projections and persists ledger state across reloads.

## Known Limitations
- Automated direct bank polling outside North America requires CSV/OFX upload due to GoCardless closing new free EU accounts.
- PDF statement OCR requires text-layer PDFs or an configured vision API key.

## Quick Start & Verification
```bash
npm test
```
