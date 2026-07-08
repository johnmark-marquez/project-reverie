import type {
  ApiErrorBody,
  GetGuestResponse,
  GetOutfitColorsResponse,
  Guest,
  OutfitColorAvailability,
  SubmitRsvpRequest,
  SubmitRsvpResponse,
} from "@/types/rsvp-api";

const API_URL = process.env.NEXT_PUBLIC_RSVP_API_URL;
const POST_HEADERS = { "Content-Type": "text/plain;charset=utf-8" };

function getApiUrl() {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_RSVP_API_URL is not set. Add your Apps Script web app URL.",
    );
  }

  return API_URL.replace(/\/$/, "");
}

function buildUrl(path: string) {
  return `${getApiUrl()}?path=${encodeURIComponent(path)}`;
}

async function readJson<T>(response: Response): Promise<T | ApiErrorBody> {
  const text = await response.text();

  try {
    return JSON.parse(text) as T | ApiErrorBody;
  } catch {
    throw new RsvpApiError({
      ok: false,
      error: {
        code: "INVALID_RESPONSE",
        message: OUTDATED_SERVER_MESSAGE,
      },
    });
  }
}

async function getJson<T>(path: string): Promise<T | ApiErrorBody> {
  const response = await fetch(buildUrl(path), {
    method: "GET",
    cache: "no-store",
  });

  return readJson<T>(response);
}

async function postJson<T>(path: string, body: unknown): Promise<T | ApiErrorBody> {
  const response = await fetch(buildUrl(path), {
    method: "POST",
    headers: POST_HEADERS,
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return readJson<T>(response);
}

export async function getGuest(guestCode: string): Promise<Guest> {
  const normalized = guestCode.trim().toUpperCase();
  const data = await getJson<GetGuestResponse>(`guest/${normalized}`);

  if (!data.ok) {
    throw new RsvpApiError(data);
  }

  return data.data;
}

export async function getOutfitColorAvailability(
  guestCode: string,
): Promise<OutfitColorAvailability> {
  const normalized = guestCode.trim().toUpperCase();
  const data = await getJson<GetOutfitColorsResponse>(
    `outfit-colors/${normalized}`,
  );

  if (!data.ok) {
    throw new RsvpApiError(data);
  }

  return data.data;
}

export async function submitRsvp(
  payload: SubmitRsvpRequest,
): Promise<SubmitRsvpResponse["data"]> {
  const data = await postJson<SubmitRsvpResponse>("rsvp", {
    ...payload,
    guestCode: payload.guestCode.trim().toUpperCase(),
  });

  if (!data.ok) {
    throw new RsvpApiError(data);
  }

  return data.data;
}

export class RsvpApiError extends Error {
  code: string;
  details?: Record<string, unknown>;

  constructor(error: ApiErrorBody) {
    super(formatApiErrorMessage(error));
    this.name = "RsvpApiError";
    this.code = error.error.code;
    this.details = error.error.details;
  }
}

const OUTDATED_SERVER_MESSAGE =
  "The RSVP server is out of date. The site owner needs to redeploy the Apps Script (Deploy → Manage deployments → New version).";

function formatApiErrorMessage(error: ApiErrorBody): string {
  if (error.error.code === "INVALID_PATH") {
    return OUTDATED_SERVER_MESSAGE;
  }

  return error.error.message;
}
