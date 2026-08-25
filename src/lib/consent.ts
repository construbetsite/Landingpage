/**
 * Gerenciador de consentimento de cookies e conformidade com LGPD
 */

export interface CookiePreferences {
  necessary: boolean; // Sempre true (essenciais para funcionamento)
  analytics: boolean; // Google Analytics / GTM
  marketing: boolean; // Google Ads / Remarketing
  preferences: boolean; // Preferências do usuário
}

export type ConsentStatus = 'granted' | 'denied' | 'custom' | null;

const CONSENT_STORAGE_KEY = 'construbet_cookie_consent';
const PREFERENCES_STORAGE_KEY = 'construbet_cookie_preferences';
const CONSENT_EVENT = 'construbet_cookie_consent_change';

export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true,
};

/**
 * Retorna se o usuário já concedeu consentimento geral
 */
export function getCookieConsent(): boolean {
  if (typeof window === 'undefined') return false;
  const status = localStorage.getItem(CONSENT_STORAGE_KEY);
  return status === 'granted' || status === 'custom';
}

/**
 * Retorna o status de consentimento bruto ('granted' | 'denied' | 'custom' | null)
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  return (localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentStatus) || null;
}

/**
 * Retorna as preferências detalhadas salvas pelo usuário
 */
export function getDetailedPreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return null;
  }
}

/**
 * Salva as escolhas de consentimento do usuário e notifica os ouvintes
 */
export function setCookieConsent(
  status: 'granted' | 'denied' | 'custom',
  preferences?: Partial<CookiePreferences>
) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(CONSENT_STORAGE_KEY, status);

  const updatedPrefs: CookiePreferences = {
    necessary: true,
    analytics: status === 'granted' ? true : status === 'denied' ? false : !!preferences?.analytics,
    marketing: status === 'granted' ? true : status === 'denied' ? false : !!preferences?.marketing,
    preferences: status === 'granted' ? true : status === 'denied' ? false : !!preferences?.preferences,
  };

  localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(updatedPrefs));

  // Dispara evento customizado para notificar GTM e componentes
  window.dispatchEvent(
    new CustomEvent(CONSENT_EVENT, {
      detail: { status, preferences: updatedPrefs },
    })
  );
}

/**
 * Remove o consentimento para forçar reabertura do banner
 */
export function resetCookieConsent() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
  localStorage.removeItem(PREFERENCES_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('open-cookie-settings'));
}

/**
 * Abre o gerenciador de preferências de cookies
 */
export function openCookieSettings() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('open-cookie-settings'));
}

/**
 * Inscreve um callback para ser chamado sempre que o consentimento mudar
 */
export function onConsentChange(
  callback: (status: ConsentStatus, prefs: CookiePreferences) => void
): () => void {
  if (typeof window === 'undefined') return () => { };

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<{
      status: ConsentStatus;
      preferences: CookiePreferences;
    }>;
    if (customEvent.detail) {
      callback(customEvent.detail.status, customEvent.detail.preferences);
    }
  };

  window.addEventListener(CONSENT_EVENT, handler);
  return () => {
    window.removeEventListener(CONSENT_EVENT, handler);
  };
}
