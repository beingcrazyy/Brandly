import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const envPath = join(projectRoot, ".env");
const settingsPath = join(projectRoot, ".claude", "settings.local.json");

function parseDotenv(contents) {
  const values = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    let value = rawValue.trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

const env = parseDotenv(readFileSync(envPath, "utf8"));
const apiKey = env.ANTHROPIC_FOUNDRY_API_KEY || env.AZURE_AI_FOUNDRY_API_KEY;
const baseUrl = env.ANTHROPIC_FOUNDRY_BASE_URL || env.AZURE_AI_FOUNDRY_ANTHROPIC_BASE_URL;
const resource = env.ANTHROPIC_FOUNDRY_RESOURCE || getResourceName(baseUrl);
const model = env.ANTHROPIC_MODEL || env.ANTHROPIC_DEFAULT_SONNET_MODEL || "claude-sonnet-4-6";

function getResourceName(url) {
  if (!url) {
    return "";
  }

  try {
    const host = new URL(url).hostname;
    const suffix = ".services.ai.azure.com";

    return host.endsWith(suffix) ? host.slice(0, -suffix.length) : "";
  } catch {
    return "";
  }
}

const missing = [];
if (!apiKey) missing.push("AZURE_AI_FOUNDRY_API_KEY or ANTHROPIC_FOUNDRY_API_KEY");
if (!baseUrl) missing.push("AZURE_AI_FOUNDRY_ANTHROPIC_BASE_URL or ANTHROPIC_FOUNDRY_BASE_URL");

if (missing.length > 0) {
  console.error(`Missing required .env value(s): ${missing.join(", ")}`);
  process.exit(1);
}

const settings = {
  $schema: "https://json.schemastore.org/claude-code-settings.json",
  env: {
    CLAUDE_CODE_USE_FOUNDRY: "1",
    CLAUDE_CODE_AUTO_CONNECT_IDE: "true",
    ANTHROPIC_FOUNDRY_API_KEY: apiKey,
    ANTHROPIC_MODEL: model,
    ANTHROPIC_DEFAULT_SONNET_MODEL: model,
  },
};

if (resource) {
  settings.env.ANTHROPIC_FOUNDRY_RESOURCE = resource;
} else {
  settings.env.ANTHROPIC_FOUNDRY_BASE_URL = baseUrl;
}

mkdirSync(dirname(settingsPath), { recursive: true });
writeFileSync(settingsPath, `${JSON.stringify(settings, null, 2)}\n`, { mode: 0o600 });

console.log("Synced Claude Code Foundry settings to .claude/settings.local.json");
