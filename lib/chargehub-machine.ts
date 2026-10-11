/**
 * The ChargeHub reservation lifecycle, transcribed from the real system
 * (backend/src/models/reservationLifecycle.ts and the booking, commitment,
 * extension and overstay services). Every state, event and error name below
 * exists in that codebase. This file drives the interactive playground.
 */

export const STATES = [
  "PENDING_PAYMENT",
  "RESERVED",
  "LATE",
  "AT_RISK",
  "ARRIVED",
  "CHARGING",
  "EXTENSION_REQUESTED",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
  "RELEASED",
] as const;

export type State = (typeof STATES)[number];

/** States that still occupy the 15-minute atoms (mirrors the partial unique index filter). */
export const HOLDING: readonly State[] = [
  "PENDING_PAYMENT",
  "RESERVED",
  "LATE",
  "AT_RISK",
  "ARRIVED",
  "CHARGING",
  "EXTENSION_REQUESTED",
];

export const TERMINAL: readonly State[] = ["COMPLETED", "CANCELLED", "NO_SHOW", "RELEASED"];

export type Legacy = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";

export const LEGACY: Record<State, Legacy> = {
  PENDING_PAYMENT: "pending",
  RESERVED: "confirmed",
  LATE: "confirmed",
  AT_RISK: "confirmed",
  ARRIVED: "confirmed",
  CHARGING: "confirmed",
  EXTENSION_REQUESTED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  NO_SHOW: "no_show",
  RELEASED: "cancelled",
};

export const STATE_INFO: Record<State, { label: string; summary: string }> = {
  PENDING_PAYMENT: {
    label: "Pending payment",
    summary: "Interval claimed, deposit outstanding. Holds the bay for a bounded 10-minute window.",
  },
  RESERVED: { label: "Reserved", summary: "Deposit settled. Waiting for the driver to arrive." },
  LATE: { label: "Late", summary: "Past the scheduled start but inside the 15-minute grace window." },
  AT_RISK: { label: "At risk", summary: "Grace elapsed. Interval still held, not yet forfeited." },
  ARRIVED: { label: "Arrived", summary: "Driver checked in at the bay. Arrival classified on time, early, grace or late." },
  CHARGING: { label: "Charging", summary: "Session active. Overstay is detected automatically past the booked end." },
  EXTENSION_REQUESTED: {
    label: "Extension requested",
    summary: "More time requested mid-session. Decided against the real occupancy timeline. Max two per reservation.",
  },
  COMPLETED: { label: "Completed", summary: "Session ended. Ending early releases the unused atoms immediately." },
  CANCELLED: { label: "Cancelled", summary: "Cancelled before use. Refund quoted by the same function that performs it." },
  NO_SHOW: { label: "No-show", summary: "Nobody arrived. Interval forfeited. Detected by the sweep, not only by staff." },
  RELEASED: { label: "Released", summary: "Interval deliberately returned to availability by an operator." },
};

export type EventName =
  | "COMMIT_DEPOSIT"
  | "DEPOSIT_DECLINED"
  | "HOLD_EXPIRED"
  | "CLOCK_PAST_START"
  | "CLOCK_PAST_GRACE"
  | "NO_SHOW_SWEEP"
  | "CHECK_IN"
  | "START_CHARGING"
  | "REQUEST_EXTENSION"
  | "RESOLVE_EXTENSION"
  | "END_CHARGING"
  | "END_EARLY"
  | "CANCEL"
  | "OPERATOR_RELEASE"
  | "CONFIRM_VIA_UPDATE_ROUTE";

export const EVENT_INFO: Record<EventName, { label: string; actor: "driver" | "staff" | "clock" | "gateway" }> = {
  COMMIT_DEPOSIT: { label: "Commit deposit", actor: "gateway" },
  DEPOSIT_DECLINED: { label: "Deposit declined", actor: "gateway" },
  HOLD_EXPIRED: { label: "10-minute hold expires", actor: "clock" },
  CLOCK_PAST_START: { label: "Clock passes scheduled start", actor: "clock" },
  CLOCK_PAST_GRACE: { label: "Clock passes grace", actor: "clock" },
  NO_SHOW_SWEEP: { label: "No-show sweep runs", actor: "clock" },
  CHECK_IN: { label: "Check in (QR)", actor: "driver" },
  START_CHARGING: { label: "Start charging", actor: "driver" },
  REQUEST_EXTENSION: { label: "Request extension", actor: "driver" },
  RESOLVE_EXTENSION: { label: "Extension decided", actor: "staff" },
  END_CHARGING: { label: "End charging", actor: "driver" },
  END_EARLY: { label: "End early", actor: "driver" },
  CANCEL: { label: "Cancel", actor: "driver" },
  OPERATOR_RELEASE: { label: "Operator releases bay", actor: "staff" },
  CONFIRM_VIA_UPDATE_ROUTE: { label: "Confirm via plain update route", actor: "staff" },
};

export type Transition = { from: State; event: EventName; to: State; note: string; emits?: string };

export const TRANSITIONS: Transition[] = [
  { from: "PENDING_PAYMENT", event: "COMMIT_DEPOSIT", to: "RESERVED", note: "Intent, timestamps and payment state move together through the commitment service.", emits: "reservation.confirmed" },
  { from: "PENDING_PAYMENT", event: "DEPOSIT_DECLINED", to: "CANCELLED", note: "Decline path. Retry is a new commitment attempt within the hold window." },
  { from: "PENDING_PAYMENT", event: "HOLD_EXPIRED", to: "CANCELLED", note: "An abandoned checkout cannot hold a bay forever: depositDueAt bounds it." },
  { from: "RESERVED", event: "CHECK_IN", to: "ARRIVED", note: "Arrival classified ON_TIME, EARLY or GRACE by one pure function used by both check-in paths." },
  { from: "RESERVED", event: "CLOCK_PAST_START", to: "LATE", note: "Time-driven sweep. Nobody has to press a button." },
  { from: "RESERVED", event: "CANCEL", to: "CANCELLED", note: "Refund quote shown before confirming is computed by the same function that performs the refund.", emits: "reservation.cancelled" },
  { from: "RESERVED", event: "OPERATOR_RELEASE", to: "RELEASED", note: "Operator-fault release. Always fully refunded, never counts against the driver.", emits: "reservation.released" },
  { from: "LATE", event: "CHECK_IN", to: "ARRIVED", note: "Arrival classified LATE with minutesLate recorded." },
  { from: "LATE", event: "CLOCK_PAST_GRACE", to: "AT_RISK", note: "Grace is 15 minutes, chosen over 10 because urban traffic alone eats 10." },
  { from: "LATE", event: "CANCEL", to: "CANCELLED", note: "Inside the 24-hour cutoff, so the quote is 0% unless operator fault." },
  { from: "AT_RISK", event: "CHECK_IN", to: "ARRIVED", note: "Still possible until the sweep claims the row." },
  { from: "AT_RISK", event: "NO_SHOW_SWEEP", to: "NO_SHOW", note: "Atomic findOneAndUpdate conditioned on lifecycle still in RESERVED, LATE or AT_RISK. A concurrent check-in makes it a no-op.", emits: "reservation.no_show" },
  { from: "AT_RISK", event: "CANCEL", to: "CANCELLED", note: "Driver may still cancel; forfeits the deposit." },
  { from: "ARRIVED", event: "START_CHARGING", to: "CHARGING", note: "Check-in and charging start are two explicit transitions, not one collapsed step." },
  { from: "CHARGING", event: "REQUEST_EXTENSION", to: "EXTENSION_REQUESTED", note: "Evaluated against the same occupancy timeline as booking. Capped at two requests." },
  { from: "EXTENSION_REQUESTED", event: "RESOLVE_EXTENSION", to: "CHARGING", note: "Approved in full, partially, or rejected. Staff can override." },
  { from: "CHARGING", event: "END_CHARGING", to: "COMPLETED", note: "actualEnd recorded, overstay finalized, session.ended emitted.", emits: "session.ended" },
  { from: "CHARGING", event: "END_EARLY", to: "COMPLETED", note: "Unused atoms go back on sale immediately and the released minutes are counted.", emits: "reservation.released (EARLY_DEPARTURE)" },
];

export type Rejection = { from: State; event: EventName; error: string; why: string };

/** Illegal moves worth showing, each with the real error the service throws. */
export const REJECTIONS: Rejection[] = [
  { from: "PENDING_PAYMENT", event: "CONFIRM_VIA_UPDATE_ROUTE", error: "USE_COMMITMENT_ENDPOINT", why: "pending to confirmed is a commitment, not a status edit. Allowing it here would confirm a reservation whose deposit was never taken." },
  { from: "PENDING_PAYMENT", event: "START_CHARGING", error: "INVALID_TRANSITION", why: "No deposit, no session. The bay is held but nothing is confirmed." },
  { from: "CHARGING", event: "CANCEL", error: "INVALID_TRANSITION", why: "A session in progress must be ended via endCharging, otherwise occupancy would be released without the session's finalization." },
  { from: "COMPLETED", event: "CHECK_IN", error: "INVALID_TRANSITION", why: "Terminal state. History is never reopened." },
  { from: "CANCELLED", event: "COMMIT_DEPOSIT", error: "INVALID_TRANSITION", why: "A cancelled reservation keeps its slotId for history but no longer holds the interval." },
  { from: "NO_SHOW", event: "CHECK_IN", error: "INVALID_TRANSITION", why: "The sweep already claimed the row atomically; the interval is forfeited." },
];

export function availableEvents(state: State): EventName[] {
  return TRANSITIONS.filter((t) => t.from === state).map((t) => t.event);
}

export function step(state: State, event: EventName): { ok: true; t: Transition } | { ok: false; r: Rejection } {
  const t = TRANSITIONS.find((x) => x.from === state && x.event === event);
  if (t) return { ok: true, t };
  const r =
    REJECTIONS.find((x) => x.from === state && x.event === event) ??
    ({ from: state, event, error: "INVALID_TRANSITION", why: `${state} does not permit ${event}.` } satisfies Rejection);
  return { ok: false, r };
}

/** The happy path used by the ambient hero animation. */
export const HAPPY_PATH: EventName[] = ["COMMIT_DEPOSIT", "CHECK_IN", "START_CHARGING", "REQUEST_EXTENSION", "RESOLVE_EXTENSION", "END_CHARGING"];
