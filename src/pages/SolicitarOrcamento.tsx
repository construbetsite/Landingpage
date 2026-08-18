import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import CalculatorCard from "../components/CalculatorCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

export default function SolicitarOrcamento() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    city: "",
    products: searchParams.get("products") ?? "",
    message: searchParams.get("message") ?? "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.location.href = `https://wa.me/5531984630800?text=${encodeURIComponent(`Olá! Tenho interesse em um orçamento.\nNome: ${form.name}\nTelefone: ${form.phone}\nWhatsApp: ${form.whatsapp}\nCidade: ${form.city}\nProdutos: ${form.products}\nMensagem: ${form.message}`)}`;
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <Helmet>
        <title>Solicitar Orçamento | Construbet</title>
        <meta name="description" content="Solicite orçamento de materiais para sua obra com um atendimento rápido via WhatsApp." />
        <link rel="canonical" href="https://www.construbet.com.br/orcamento" />
      </Helmet>
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">Atendimento</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Solicitar Orçamento</h1>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handleBack} className="text-sm font-medium text-slate-600 hover:text-sky-600">← Voltar</button>
              <Link to="/" className="text-sm font-medium text-slate-600 hover:text-sky-600">Home</Link>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <CalculatorCard>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField id="name" label="Nome" name="name" value={form.name} onChange={handleChange} placeholder="Seu nome" required />
                  <InputField id="phone" label="Telefone" name="phone" value={form.phone} onChange={handleChange} placeholder="(31) 98463-0800" required /> 
                  <InputField id="whatsapp" label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="(31) 99999-9999" required />
                  <InputField id="city" label="Cidade" name="city" value={form.city} onChange={handleChange} placeholder="Betim" required />
                </div>
                <InputField id="products" label="Produtos" name="products" value={form.products} onChange={handleChange} placeholder="Piso, tinta, argamassa..." required />
                <InputField id="message" label="Mensagem" name="message" value={form.message} onChange={handleChange} type="textarea" placeholder="Conte um pouco sobre a sua obra" required />
                <PrimaryButton type="submit">Enviar orçamento</PrimaryButton>
              </form>
            </CalculatorCard>

            <CalculatorCard className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Atendimento especializado</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Nossa equipe acompanha projetos de pequena e grande escala com orientação técnica, logística e indicação de produtos compatíveis.
                </p>
              </div>
              <div className="mt-6 rounded-3xl bg-slate-900 p-5 text-white">
                <p className="text-sm text-slate-300">Resposta rápida via WhatsApp</p>
                <p className="mt-2 text-xl font-semibold">(31) 99999-9999</p>
              </div>
            </CalculatorCard>
          </div>
        </section>
      </div>
    </div>
  );
}
