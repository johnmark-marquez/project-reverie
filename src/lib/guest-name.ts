/** Greeting name from guest list format (e.g. "ALMEDA, Adrianne Gale" → "Adrianne Gale"). */
export function greetingName(fullName: string): string {
  const trimmed = fullName.trim();

  if (trimmed.includes(",")) {
    return trimmed.split(",")[1]?.trim() ?? trimmed;
  }

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return parts[0] ?? trimmed;
  }

  return parts.slice(0, -1).join(" ");
}
