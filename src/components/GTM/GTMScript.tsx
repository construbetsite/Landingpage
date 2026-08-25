import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getCookieConsent, getDetailedPreferences, onConsentChange } from '../../lib/consent';

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

const GTM_ID = (import.meta.env.VITE_GTM_ID || '').trim();

/**
 * Injeta o Google Tag Manager de forma assíncrona respeitando a LGPD
 */
export function GTMScript() {
  const location = useLocation();
  const scriptInjectedRef = useRef(false);

  // Inicializa o GTM com consentimento
  const initGTM = () => {
    if (!GTM_ID || scriptInjectedRef.current) return;

    window.dataLayer = window.dataLayer || [];

    // Envia evento de consentimento concedido
    window.dataLayer.push({
      event: 'consentGranted',
      consent_timestamp: new Date().toISOString(),
      user_preferences: getDetailedPreferences(),
    });

    // Injeta script assíncrono do GTM
    const script = document.createElement('script');
    script.id = 'gtm-script-tag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    document.head.appendChild(script);

    // Injeta iframe noscript no body
    const noscript = document.createElement('noscript');
    noscript.id = 'gtm-noscript-tag';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(GTM_ID)}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertAdjacentElement('afterbegin', noscript);

    scriptInjectedRef.current = true;

    if (import.meta.env.DEV) {
      console.log(`[GTM] Inicializado com sucesso para o ID: ${GTM_ID}`);
    }
  };

  // Efeito para verificar consentimento inicial e escutar alterações
  useEffect(() => {
    if (!GTM_ID) return;

    if (getCookieConsent()) {
      initGTM();
    }

    const unsubscribe = onConsentChange((status, prefs) => {
      if (status === 'granted' || (status === 'custom' && prefs.analytics)) {
        initGTM();
      }
    });

    return unsubscribe;
  }, []);

  // Efeito para rastreamento de visualização de páginas (page_view) nas mudanças de rota
  useEffect(() => {
    if (!GTM_ID || !scriptInjectedRef.current) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      page_path: location.pathname + location.search + location.hash,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location]);

  return null;
}

export default GTMScript;
