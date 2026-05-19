export type ConsentPrefs = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "bty-cookie-consent-v1";
const CHANGE_EVENT = "bty:consent-change";
export const OPEN_SETTINGS_EVENT = "bty:open-cookie-settings";

export function getConsent(): ConsentPrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      essential: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function setConsent(prefs: Omit<ConsentPrefs, "essential" | "updatedAt">): ConsentPrefs {
  const next: ConsentPrefs = {
    essential: true,
    analytics: !!prefs.analytics,
    marketing: !!prefs.marketing,
    updatedAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: next }));
    } catch {
      /* ignore */
    }
  }
  return next;
}

export function subscribe(cb: (prefs: ConsentPrefs) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => cb((e as CustomEvent<ConsentPrefs>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_SETTINGS_EVENT));
}