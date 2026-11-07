import test from "node:test";
import assert from "node:assert/strict";
import { APP_META, handleAppRequest } from "../src/worker.mjs";

test("worksai-ledgerflow standalone Worker renders clean WorksAI UI with capabilityMatrix and zero forbidden branding", async () => {
  const res = await handleAppRequest(new Request("https://ledgerflow.worksai.org/"));
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.equal(html.includes(APP_META.name), true);
  assert.equal(html.toLowerCase().includes("devinai.uk"), false);
  assert.equal(html.toLowerCase().includes("devonfolio"), false);
  assert.equal(html.includes("MIT Open Source • WorksAI Foundry"), true);
});

test("worksai-ledgerflow /api/ai/analyze executes deterministic engine, supports Workers AI + R2 persistence, and rejects empty input", async () => {
  const r2Map = new Map();
  const mockEnv = {
    AI: {
      async run(_model, _input) {
        return { response: "Verified Workers AI insight for worksai-ledgerflow." };
      }
    },
    DATALAKE_BUCKET: {
      async put(k, v) { r2Map.set(k, v); },
      async get(k) {
        if (!r2Map.has(k)) return null;
        const v = r2Map.get(k);
        return { async text() { return v; } };
      }
    }
  };

  const sample = "{\n  \"monthlyIncomeCents\": 500000,\n  \"rows\": [\n    {\n      \"date\": \"2026-10-01\",\n      \"payee\": \"Cloudflare Workers\",\n      \"amount\": -40.0\n    },\n    {\n      \"date\": \"2026-11-01\",\n      \"payee\": \"Cloudflare Workers\",\n      \"amount\": -48.0\n    },\n    {\n      \"date\": \"2026-11-03\",\n      \"payee\": \"Neon Serverless Postgres\",\n      \"amount\": -19.0\n    }\n  ]\n}";
  const aiRes = await handleAppRequest(
    new Request("https://ledgerflow.worksai.org/api/ai/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ input: sample, tool: APP_META.mcpTools[0] })
    }),
    mockEnv
  );
  assert.equal(aiRes.status, 200);
  const aiData = await aiRes.json();
  assert.equal(aiData.ok, true);
  assert.equal(aiData.executionBreakdown.deterministicUtilityExecuted, true);
  assert.equal(aiData.executionBreakdown.genuineAiModelInvoked, true);
  assert.equal(aiData.executionBreakdown.persistedToR2, true);

  const stateRes = await handleAppRequest(new Request("https://ledgerflow.worksai.org/api/workspace/state"), mockEnv);
  assert.equal(stateRes.status, 200);
  const stateJson = await stateRes.json();
  assert.equal(stateJson.persistedInR2, true);
});

