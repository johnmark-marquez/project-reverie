import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export function readGuestCodes(root) {
  return JSON.parse(
    readFileSync(path.join(root, "src/data/guest-codes.json"), "utf8"),
  );
}

export function readGuestList(root) {
  try {
    const data = JSON.parse(
      readFileSync(path.join(root, "src/data/guest-list.json"), "utf8"),
    );

    if (!Array.isArray(data)) {
      return [];
    }

    return data.filter(
      (entry) =>
        entry &&
        typeof entry.guestCode === "string" &&
        typeof entry.name === "string",
    );
  } catch {
    return [];
  }
}

export function writeGuestList(root, guests) {
  const filePath = path.join(root, "src/data/guest-list.json");
  writeFileSync(filePath, `${JSON.stringify(guests, null, 2)}\n`);
  return filePath;
}

export async function fetchGuestName(apiUrl, guestCode) {
  const response = await fetch(`${apiUrl.replace(/\/$/, "")}?path=guest`, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ guestCode }),
  });

  const data = await response.json();

  if (!data.ok) {
    throw new Error(
      `${guestCode}: ${data.error?.message ?? "Failed to fetch guest"}`,
    );
  }

  return data.data.name;
}

export async function resolveGuestList(root, apiUrl) {
  const guestCodes = readGuestCodes(root);
  const cached = new Map(
    readGuestList(root).map((guest) => [guest.guestCode, guest.name]),
  );

  const guests = [];

  for (const guestCode of guestCodes) {
    let name = cached.get(guestCode);

    if (!name) {
      if (!apiUrl) {
        throw new Error(
          `Missing name for ${guestCode}. Set NEXT_PUBLIC_RSVP_API_URL in .env.local or run with the API available.`,
        );
      }

      name = await fetchGuestName(apiUrl, guestCode);
      console.log(`fetched ${guestCode} → ${name}`);
    }

    guests.push({ guestCode, name });
  }

  writeGuestList(root, guests);
  return guests;
}

export function qrFilename(guestCode, name) {
  const safeName = name
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  return `${guestCode} - ${safeName}.png`;
}
