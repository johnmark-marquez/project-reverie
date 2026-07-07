import { cpSync, mkdirSync, rmSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repo = "project-reverie";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const previewRoot = path.join(root, ".pages-preview");
const previewTarget = path.join(previewRoot, repo);

rmSync(previewRoot, { recursive: true, force: true });
mkdirSync(previewTarget, { recursive: true });
cpSync(path.join(root, "out"), previewTarget, { recursive: true });

console.log(`\nPreview at http://localhost:3000/${repo}/\n`);

const serve = spawn("npx", ["serve", previewRoot, "-l", "3000"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
});

serve.on("exit", (code) => process.exit(code ?? 0));
