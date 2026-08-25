import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Settings, X, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  getConsentStatus,
  getDetailedPreferences,
  setCookieConsent,
  type CookiePreferences,
  DEFAULT_PREFERENCES,
} from '../../lib/consent';

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    // Verifica se o usuário já fez uma escolha
    const status = getConsentStatus();
    if (!status) {
      // Pequeno delay para não atrapalhar o LCP inicial
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    } else {
      const saved = getDetailedPreferences();
      if (saved) setPreferences(saved);
    }
  }, []);

  // Escuta evento global para reabrir configurações a partir do Footer
  useEffect(() => {
    const handleOpenSettings = () => {
      const saved = getDetailedPreferences() || DEFAULT_PREFERENCES;
      setPreferences(saved);
      setShowDetails(true);
      setIsOpen(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => {
      window.removeEventListener('open-cookie-settings', handleOpenSettings);
    };
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent('granted');
    setIsOpen(false);
    setShowDetails(false);
  };

  const handleRejectAll = () => {
    setCookieConsent('denied');
    setIsOpen(false);
    setShowDetails(false);
  };

  const handleSaveCustom = () => {
    setCookieConsent('custom', preferences);
    setIsOpen(false);
    setShowDetails(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Sempre obrigatório
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:p-6 pointer-events-none">
        {/* Backdrop escurecido suave apenas quando abrir detalhes */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto"
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-800 p-5 sm:p-7 pointer-events-auto overflow-hidden text-slate-800 dark:text-slate-100"
        >
          {/* Faixa decorativa superior */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#072B63] via-blue-600 to-red-600" />

          {!showDetails ? (
            /* Visualização Principal Simplificada */
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#072B63] dark:text-blue-400">
                  <ShieldCheck size={28} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-base sm:text-lg text-[#072B63] dark:text-white flex items-center gap-2">
                    <ShieldCheck size={20} className="sm:hidden text-blue-600" />
                    Privacidade e Cookies na Construbet
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                    Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdos de acordo com a nossa{' '}
                    <Link
                      to="/politicas"
                      className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-800"
                    >
                      Política de Privacidade (LGPD)
                    </Link>.
                  </p>
                </div>
              </div>

              {/* Ações */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-end">
                <button
                  type="button"
                  onClick={() => setShowDetails(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#072B63] dark:hover:text-white border border-gray-300 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                >
                  <Settings size={15} />
                  Personalizar
                </button>
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-zinc-700 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                >
                  Apenas necessários
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md hover:shadow-lg transition hover:scale-[1.02]"
                >
                  Aceitar todos
                </button>
              </div>
            </div>
          ) : (
            /* Visualização Detalhada (Modal de Preferências) */
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <Settings size={20} className="text-blue-600" />
                  <h3 className="font-bold text-lg text-[#072B63] dark:text-white">
                    Preferências de Consentimento de Cookies
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDetails(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                  aria-label="Fechar configurações"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Você pode escolher quais categorias de cookies deseja habilitar. Os cookies estritamente necessários são obrigatórios para a operação do site.
              </p>

              {/* Lista de categorias */}
              <div className="grid gap-3 sm:grid-cols-2 max-h-[50vh] overflow-y-auto pr-1">
                {/* 1. Necessários */}
                <div className="p-3.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Lock size={15} className="text-gray-500" />
                      <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Necessários</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Fundamentais para navegação, segurança e carregamento do catálogo.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 bg-gray-200 dark:bg-zinc-700 px-2.5 py-1 rounded-full uppercase shrink-0">
                    Sempre Ativo
                  </span>
                </div>

                {/* 2. Analíticos (GTM / Analytics) */}
                <div
                  onClick={() => togglePreference('analytics')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 ${preferences.analytics
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                    : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
                    }`}
                >
                  <div className="space-y-1">
                    <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Estatísticas e Analytics</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Coleta de dados anônimos para medição e melhoria contínua de desempenho.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => { }}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                {/* 3. Marketing */}
                <div
                  onClick={() => togglePreference('marketing')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 ${preferences.marketing
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                    : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
                    }`}
                >
                  <div className="space-y-1">
                    <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Marketing e Anúncios</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Permite exibir ofertas e promoções relevantes em canais parceiros.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => { }}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                {/* 4. Preferências */}
                <div
                  onClick={() => togglePreference('preferences')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 ${preferences.preferences
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
                    : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'
                    }`}
                >
                  <div className="space-y-1">
                    <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Personalização</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Salva preferências de navegação como região e filtros de produtos.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={() => { }}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Botões do modal */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <Link
                  to="/politicas"
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
                >
                  Ver Política de Privacidade completa
                </Link>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 border border-gray-300 dark:border-zinc-700 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                  >
                    Rejeitar todos
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow transition"
                  >
                    Salvar preferências
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CookieBanner;
