import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CalculatorCard from "../components/CalculatorCard";
import PrimaryButton from "../components/PrimaryButton";

const specialists = [
  { name: "Renata Almeida", role: "Especialista em pisos e revestimentos", area: "Coberturas e acabamento" },
  { name: "Carlos Mendes", role: "Consultor técnico de tintas", area: "Pintura e acabamento" },
  { name: "Joana Oliveira", role: "Assessora de projeto", area: "Planejamento de obra" },
];

export default function Especialista() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Helmet>
          <title>Especialista | Construbet</title>
          <meta name="description" content="Fale com um especialista da Construbet sobre pisos, tintas, argamassas e rejuntes." />
          <link rel="canonical" href="https://www.construbet.com.br/especialista" />
        </Helmet>
        <section className="rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">Atendimento</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Falar com Especialista</h1>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handleBack} className="text-sm font-medium text-slate-600 hover:text-sky-600">← Voltar</button>
              <Link to="/" className="text-sm font-medium text-slate-600 hover:text-sky-600">Home</Link>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <CalculatorCard>
              <h2 className="text-xl font-semibold text-slate-900">Especialistas prontos para te ajudar</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Nosso time acompanha desde a escolha do material até a execução, oferecendo indicação técnica e orientações práticas para o seu projeto.
              </p>
              <div className="mt-6 space-y-3">
                {specialists.map((specialist) => (
                  <div key={specialist.name} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{specialist.name}</p>
                    <p className="mt-1 text-sm text-slate-600">{specialist.role}</p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-sky-600">{specialist.area}</p>
                  </div>
                ))}
              </div>
            </CalculatorCard>

            <CalculatorCard className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Horário de atendimento</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Segunda a sexta, das 8h às 18h. Sábado, das 8h às 13h.
                </p>
              </div>
              <div className="mt-6 space-y-3">
                <PrimaryButton href="https://wa.me/5531999999999">Falar no WhatsApp</PrimaryButton>
                <Link to="/orcamento" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-600 hover:text-sky-600">
                  Solicitar orçamento
                </Link>
              </div>
            </CalculatorCard>
          </div>
        </section>
      </div>
    </div>
  );
}
