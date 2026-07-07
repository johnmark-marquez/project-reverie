import { readFileSync } from "node:fs";
import path from "node:path";

/** Load KEY=value pairs from .env.local without overwriting existing env. */
export function loadEnvLocal(root) {
  try {
    const content = readFileSync(path.join(root, ".env.local"), "utf8");

    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const index = trimmed.indexOf("=");
      if (index === -1) {
        continue;
      }

      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim();

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env.local is optional for scripts
  }
}
