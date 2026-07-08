export type RsvpStatus = "Pending" | "Confirmed" | "Declined";

export interface Guest {
  guestCode: string;
  name: string;
  seats: number;
  status: RsvpStatus;
  confirmedHeadcount: number;
  lastUpdated: string | null;
  confirmedGuestNames?: string[];
  outfitColor?: string | null;
}

export interface OutfitColorAvailability {
  selectedName: string | null;
  takenNames: string[];
}

export interface GetOutfitColorsResponse {
  ok: true;
  data: OutfitColorAvailability;
}

export interface GetGuestResponse {
  ok: true;
  data: Guest;
}

export interface SubmitRsvpRequest {
  guestCode: string;
  attending: boolean;
  confirmedSeats: number;
  guestNames?: string[];
  message?: string;
  outfitColor?: string;
}

export interface SubmitRsvpResult {
  guestCode: string;
  status: Exclude<RsvpStatus, "Pending">;
  confirmedHeadcount: number;
  lastUpdated: string;
}

export interface SubmitRsvpResponse {
  ok: true;
  data: SubmitRsvpResult;
}

export interface ApiErrorBody {
  ok: false;
  status?: number;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type ApiResponse<T> = T | ApiErrorBody;

export function isApiError(response: unknown): response is ApiErrorBody {
  return (
    typeof response === "object" &&
    response !== null &&
    "ok" in response &&
    (response as ApiErrorBody).ok === false
  );
}
