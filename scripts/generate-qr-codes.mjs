import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import { loadEnvLocal } from "./lib/load-env.mjs";
import {
  qrFilename,
  readGuestList,
  resolveGuestList,
} from "./lib/guest-list.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

loadEnvLocal(root);

const siteUrl = (
  process.env.SITE_URL ?? "https://johnmark-marquez.github.io/project-reverie"
).replace(/\/$/, "");

const apiUrl = process.env.NEXT_PUBLIC_RSVP_API_URL;
let guests = readGuestList(root);

if (guests.length === 0 && !apiUrl) {
  console.error(
    "No src/data/guest-list.json found. Set NEXT_PUBLIC_RSVP_API_URL in .env.local, or run pnpm sync:guest-list first.",
  );
  process.exit(1);
}

if (guests.length === 0) {
  console.log("Fetching guest names from the RSVP API…\n");
}

guests = await resolveGuestList(root, apiUrl);

const outputDir = path.join(root, "qr-codes");
const pngDir = path.join(outputDir, "png");

mkdirSync(pngDir, { recursive: true });

function rsvpUrl(guestCode) {
  const normalized = encodeURIComponent(guestCode.trim().toUpperCase());
  return `${siteUrl}/rsvp/${normalized}/`;
}

function csvEscape(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

const manifest = ["guestCode,name,url,filename"];

for (const { guestCode, name } of guests) {
  const url = rsvpUrl(guestCode);
  const filename = qrFilename(guestCode, name);
  const filePath = path.join(pngDir, filename);

  await QRCode.toFile(filePath, url, {
    type: "png",
    width: 512,
    margin: 2,
    errorCorrectionLevel: "M",
    color: {
      dark: "#2c2416",
      light: "#fffef9",
    },
  });

  manifest.push(
    [guestCode, name, url, filename].map(csvEscape).join(","),
  );
  console.log(`generated ${filename}`);
}

writeFileSync(path.join(outputDir, "manifest.csv"), `${manifest.join("\n")}\n`);

console.log(
  `\n${guests.length} QR codes saved to qr-codes/png/\nManifest: qr-codes/manifest.csv\nSite URL: ${siteUrl}\n`,
);
