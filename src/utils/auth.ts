export const AUTH_STORAGE_KEY = "jornada_auth";

export interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
}

function getDefaultAuthState(): AuthState {
  return {
    isAuthenticated: false,
    userEmail: null,
  };
}

export function getAuthState(): AuthState {
  if (typeof window === "undefined") {
    return getDefaultAuthState();
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return getDefaultAuthState();

    const parsed = JSON.parse(raw) as AuthState;
    if (typeof parsed.isAuthenticated !== "boolean") return getDefaultAuthState();

    return {
      isAuthenticated: parsed.isAuthenticated,
      userEmail: parsed.userEmail ?? null,
    };
  } catch {
    return getDefaultAuthState();
  }
}

export function setAuthState(userEmail: string): void {
  if (typeof window === "undefined") return;

  const state: AuthState = {
    isAuthenticated: true,
    userEmail: userEmail || null,
  };

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
}

export function clearAuthState(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
