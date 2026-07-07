import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvLocal } from "./lib/load-env.mjs";
import { resolveGuestList } from "./lib/guest-list.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

loadEnvLocal(root);

const apiUrl = process.env.NEXT_PUBLIC_RSVP_API_URL;

if (!apiUrl) {
  console.error(
    "NEXT_PUBLIC_RSVP_API_URL is not set. Add it to .env.local first.",
  );
  process.exit(1);
}

const guests = await resolveGuestList(root, apiUrl);

console.log(`\nSynced ${guests.length} guests to src/data/guest-list.json\n`);
