# WorksAi LedgerFlow (`worksai-ledgerflow`)

> Local-first zero-based envelope budgeting with universal bank CSV normalization and 90-day runway forecasting.

- **Live Subdomain Application:** [https://ledgerflow.worksai.org](https://ledgerflow.worksai.org)
- **WorksAI Hub Specification:** [https://worksai.org/apps/worksai-ledgerflow](https://worksai.org/apps/worksai-ledgerflow)
- **Category:** A. Web apps
- **License:** MIT (Derived from [Actual Budget](https://github.com/actualbudget/actual) @ `92865f3`)

## Capability Matrix
- **What You Can Do:** Normalize CSV/JSON bank & SaaS ledger rows, enforce zero-based monthly budgeting, flag vendor subscription price creep (>5% increase), and calculate 90-day net cashflow runway.
- **Deterministic Domain Utilities:** normalizeAndBudgetTransactions (regex vendor categorization, cent-exact zero-based budgeting, and 90-day burn projection).
- **Genuine AI Model Features:** Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) executive variance commentary and vendor consolidation recommendations.
- **Persisted R2/Neon Features:** Normalized ledger batches, price-creep alerts, and 90-day runway snapshots persisted in Cloudflare R2 (workspaces/worksai-ledgerflow/*) and Neon Postgres.
- **Known Limitations:** Live Plaid/GoCardless bank feed polling requires user API credentials; CSV/JSON import works out of the box.

## Verification & Local Testing
```bash
npm run lint
npm run typecheck
npm test
```
