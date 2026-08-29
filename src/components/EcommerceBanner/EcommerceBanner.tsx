"use client";

import { useState, useCallback, memo, type ChangeEvent, type FormEvent } from "react";
import {
  ShoppingCart,
  User,
  Mail,
  Phone,
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { ECOMMERCE_URL } from "../../config/constants";
import { createLead, LeadApiError } from "../../services/api/leadsApi";

type FormStatus = "idle" | "loading" | "success" | "error";

// ========== UTIL: formatação de WhatsApp com máscara ==========
const formatWhatsApp = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

// ========== HOOK PERSONALIZADO PARA GERENCIAR O FORMULÁRIO ==========
const useLeadForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = useCallback((): string | null => {
    if (!nome.trim()) return "Preencha seu nome.";
    if (!email.trim()) return "Preencha seu e-mail.";
    if (!/\S+@\S+\.\S+/.test(email)) return "E-mail inválido.";
    return null;
  }, [nome, email]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const validationError = validate();
      if (validationError) {
        setErrorMsg(validationError);
        setStatus("error");
        return;
      }

      const payload: { nome: string; email: string; whatsapp?: string } = {
        nome: nome.trim(),
        email: email.trim(),
      };
      const whatsappDigits = whatsapp.replace(/\D/g, "");
      if (whatsappDigits) payload.whatsapp = whatsappDigits;

      setStatus("loading");
      setErrorMsg("");

      try {
        const result = await createLead(payload);
        if (result.success) {
          setStatus("success");
          setNome("");
          setEmail("");
          setWhatsapp("");
        } else {
          throw new Error("Resposta inesperada");
        }
      } catch (err) {
        setStatus("error");
        if (err instanceof LeadApiError) {
          if (err.status === 409) {
            setErrorMsg("Este e-mail já está cadastrado em nossa newsletter.");
          } else if (err.status === 400) {
            setErrorMsg(err.message || "Dados inválidos. Verifique os campos.");
          } else {
            setErrorMsg("Ocorreu um erro. Tente novamente mais tarde.");
          }
        } else {
          setErrorMsg("Erro de conexão. Verifique sua internet.");
        }
      }
    },
    [nome, email, whatsapp, validate]
  );

  const handleWhatsAppChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWhatsapp(formatWhatsApp(e.target.value));
  }, []);

  return {
    nome,
    setNome,
    email,
    setEmail,
    whatsapp,
    setWhatsapp: handleWhatsAppChange,
    status,
    errorMsg,
    handleSubmit,
    isLoading: status === "loading",
  };
};

// ========== SUBCOMPONENTES MEMOIZADOS ==========

const SuccessState = memo(() => (
  <section className="w-full" aria-label="Inscrição confirmada">
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-green-600" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-bold text-[#072B63]">
            Inscrição realizada com sucesso!
          </h3>
          <p className="text-gray-600 max-w-md">
            Você receberá nossas ofertas exclusivas e novidades em breve.
          </p>
        </div>
      </div>
    </div>
  </section>
));

const TopBar = memo(() => (
  <div className="bg-[#072B63] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-8">
        <div className="flex items-start sm:items-center gap-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
            <ShoppingCart size={22} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-black text-base sm:text-lg leading-tight">
              FINALIZE SUAS COMPRAS <br className="hidden sm:block" />
              NO NOSSO E-COMMERCE
            </h3>
          </div>
        </div>
        <p className="text-sm text-blue-100 max-w-md text-center lg:text-left leading-relaxed">
          Ao clicar em “Ver no e-commerce”, você será direcionado para nossa
          loja online para finalizar sua compra com segurança.
        </p>
        <a
          href={ECOMMERCE_URL || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-full hover:bg-white hover:text-[#072B63] transition-all duration-300 text-sm"
        >
          <ShoppingCart size={18} aria-hidden="true" />
          IR PARA O E-COMMERCE
          <span className="text-lg leading-none" aria-hidden="true">›</span>
        </a>
      </div>
    </div>
  </div>
));

// Constante fora do componente para evitar recriação
const INPUT_BASE_CLASSES =
  "w-full border border-gray-200 rounded-xl py-3.5 pl-4 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#072B63]/20 focus:border-[#072B63] transition disabled:opacity-60 disabled:cursor-not-allowed";

const LeadForm = memo(
  ({
    nome,
    setNome,
    email,
    setEmail,
    whatsapp,
    setWhatsapp,
    status,
    errorMsg,
    handleSubmit,
    isLoading,
  }: {
    nome: string;
    setNome: (v: string) => void;
    email: string;
    setEmail: (v: string) => void;
    whatsapp: string;
    setWhatsapp: (e: ChangeEvent<HTMLInputElement>) => void;
    status: FormStatus;
    errorMsg: string;
    handleSubmit: (e: FormEvent) => void;
    isLoading: boolean;
  }) => (
    <div className="w-full lg:w-7/12">
      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={INPUT_BASE_CLASSES}
            disabled={isLoading}
            required
            aria-label="Nome completo"
            aria-required="true"
            autoComplete="given-name"
          />
          <User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
        </div>

        <div className="relative">
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={INPUT_BASE_CLASSES}
            disabled={isLoading}
            required
            aria-label="E-mail"
            aria-required="true"
            autoComplete="email"
          />
          <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
        </div>

        <div className="relative">
          <input
            type="tel"
            placeholder="Whatsapp (opcional)"
            value={whatsapp}
            onChange={setWhatsapp}
            className={INPUT_BASE_CLASSES}
            disabled={isLoading}
            aria-label="WhatsApp"
            autoComplete="tel"
            maxLength={15}
          />
          <Phone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-red-600/20 text-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Enviando...
            </>
          ) : (
            "QUERO RECEBER!"
          )}
        </button>
      </form>

      {status === "error" && errorMsg && (
        <div
          className="mt-3 flex items-center gap-2 text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle size={16} aria-hidden="true" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
        <Lock size={13} aria-hidden="true" />
        <span>Seus dados estão seguros. Não enviamos spam.</span>
      </div>
    </div>
  )
);

// ========== COMPONENTE PRINCIPAL ==========
export default function EcommerceBanner() {
  const {
    nome,
    setNome,
    email,
    setEmail,
    whatsapp,
    setWhatsapp,
    status,
    errorMsg,
    handleSubmit,
    isLoading,
  } = useLeadForm();

  if (status === "success") {
    return (
      <>
        <TopBar />
        <SuccessState />
      </>
    );
  }

  return (
    <section className="w-full" aria-label="Newsletter e ofertas">
      <TopBar />

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="lg:w-5/12">
              <h3 className="text-xl sm:text-2xl font-black text-[#072B63] leading-tight mb-3">
                RECEBA OFERTAS EXCLUSIVAS<br />
                E NOVIDADES DA{" "}
                <span className="text-red-600">CONSTRUBET</span>!
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Cadastre-se e fique por dentro das melhores promoções, dicas
                para sua obra e lançamentos.
              </p>
            </div>

            <LeadForm
              nome={nome}
              setNome={setNome}
              email={email}
              setEmail={setEmail}
              whatsapp={whatsapp}
              setWhatsapp={setWhatsapp}
              status={status}
              errorMsg={errorMsg}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}