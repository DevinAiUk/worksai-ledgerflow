export const APP_DB_CONFIG = {
  schema: "worksai_hub",
  appSlug: "worksai-ledgerflow",
  subdomain: "ledgerflow.worksai.org",
  mcpEndpoint: "https://ledgerflow.worksai.org/api/mcp",
  aiEndpoint: "https://ledgerflow.worksai.org/api/ai/analyze",
  mcpTools: ["ledgerflow.normalize_csv", "ledgerflow.detect_subscription_creep", "ledgerflow.forecast_runway"]
} as const;
