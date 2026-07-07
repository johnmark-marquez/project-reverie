/** Matches invitation codes like `RVR-4RBSN`. */
export const GUEST_CODE_PATTERN = /^[A-Z0-9]{2,6}-[A-Z0-9]{4,10}$/;

export function normalizeGuestCode(code: string): string {
  return code.trim().toUpperCase();
}

export function isValidGuestCode(code: string): boolean {
  return GUEST_CODE_PATTERN.test(normalizeGuestCode(code));
}

/** App-relative path for Next.js Link / router (basePath is added automatically). */
export function rsvpPath(guestCode?: string): string {
  if (!guestCode) {
    return "/rsvp/";
  }

  const normalized = encodeURIComponent(normalizeGuestCode(guestCode));
  return `/rsvp/${normalized}/`;
}

/** Full path with GitHub Pages basePath — for QR codes, emails, or external links. */
export function rsvpPublicPath(guestCode?: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${rsvpPath(guestCode)}`;
}
