import { prefersReducedMotion } from "./gsap";

const STORAGE_KEY = "curtains-hub-intro-played";

const compute = () => {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  if (window.location.pathname !== "/") return false;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
};

/**
 * Whether the cinematic loader should run for this page view.
 * Evaluated once at module load — before any component renders — so the
 * hero knows synchronously whether to wait for the curtain reveal.
 */
export const introEnabled = compute();

let done = !introEnabled;
const waiters: Array<() => void> = [];

export const completeIntro = () => {
  if (done) return;
  done = true;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* storage unavailable — intro simply replays next visit */
  }
  waiters.splice(0).forEach((fn) => fn());
};

/** Resolves immediately when no loader is running, otherwise after it finishes. */
export const waitForIntro = () =>
  done ? Promise.resolve() : new Promise<void>((resolve) => waiters.push(resolve));
