import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { BadgeAlert, Palette, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CalculatorCard from "../components/CalculatorCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import ResultCard from "../components/ResultCard";
import { useCalculatorValidation } from "../hooks/useCalculatorValidation";
import { calculatePaint } from "../utils/calculatePaint";
import { parseNumberInput, isPositiveNumber } from "../utils/numberHelpers";
import SEO from "../components/SEO/SEO";
import { ECOMMERCE_URL } from "../config/constants";

export default function CalculadoraTinta() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    height: "",
    width: "",
    walls: "",
    coats: "",
    yieldPerLiter: "",
    openingsArea: "",
  });
  const [result, setResult] = useState<ReturnType<typeof calculatePaint> | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { errors, validateRules, clearFieldError, clearErrors } = useCalculatorValidation();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      clearFieldError(name);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setHasSubmitted(true);

    const { isValid, errors: nextErrors } = validateRules([
      { name: "height", value: form.height, message: "Informe a altura da parede para calcular o total." },
      { name: "width", value: form.width, message: "Informe a largura da parede para calcular o total." },
      { name: "walls", value: form.walls, message: "Informe quantas paredes serão pintadas." },
      { name: "coats", value: form.coats, message: "Informe quantas demãos serão aplicadas." },
      { name: "yieldPerLiter", value: form.yieldPerLiter, message: "Informe o rendimento da tinta para ter uma estimativa mais precisa." },
    ]);

    if (!isValid) {
      const firstErrorField = Object.keys(nextErrors)[0];
      const fieldToFocus = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement | null;
      fieldToFocus?.focus();
      fieldToFocus?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const payload = {
      height: parseNumberInput(form.height),
      width: parseNumberInput(form.width),
      walls: parseNumberInput(form.walls),
      coats: parseNumberInput(form.coats),
      yieldPerLiter: parseNumberInput(form.yieldPerLiter),
      openingsArea: form.openingsArea ? parseNumberInput(form.openingsArea) : 0,
    };

    setResult(calculatePaint(payload));
  };

  const fillExample = () => {
    setForm({
      height: "2.8",
      width: "4",
      walls: "4",
      coats: "2",
      yieldPerLiter: "10",
      openingsArea: "2",
    });
    clearErrors();
    setHasSubmitted(false);
    setResult(null);
  };

  const resetForm = () => {
    setForm({ height: "", width: "", walls: "", coats: "", yieldPerLiter: "", openingsArea: "" });
    clearErrors();
    setResult(null);
    setHasSubmitted(false);
    formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  const budgetLink = result
    ? `/orcamento?products=Tinta&message=${encodeURIComponent(`Olá, gostaria de solicitar orçamento para tinta. Área útil: ${result.usefulArea} m². Litros necessários: ${result.liters} L.`)}`
    : "/orcamento";

  const isValid = useMemo(() => {
    return [form.height, form.width, form.walls, form.coats, form.yieldPerLiter].every((value) => isPositiveNumber(value));
  }, [form]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <SEO
        title="Calculadora de Tinta | Construbet"
        description="Estime a quantidade exata de tinta necessária para a sua pintura com base em área, demãos e rendimento."
        canonical="/calculadora/tinta"
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">Calculadora</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Calculadora de Tinta</h1>
            </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={handleBack} className="text-sm font-medium text-slate-600 hover:text-sky-600">
                  ← Voltar
                </button>
                <Link to="/" className="text-sm font-medium text-slate-600 hover:text-sky-600">
                  Home
                </Link>
              </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-sky-600/10 p-2 text-sky-600">
                    <Palette size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Defina a cobertura da pintura</p>
                    <p className="mt-1 text-sm text-slate-600">Para uma parede de 2,8 m por 4 m, com 2 demãos e rendimento de 10 m²/L, o resultado fica bem próximo do real.</p>
                  </div>
                </div>
                <button type="button" onClick={fillExample} className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-sky-700 transition hover:border-sky-400">
                  <Sparkles size={14} />
                  Usar exemplo rápido
                </button>
              </div>

              <CalculatorCard>
                <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                {hasSubmitted && Object.keys(errors).length > 0 ? (
                  <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700" role="alert">
                    <BadgeAlert size={16} className="mt-0.5 shrink-0" />
                    <span>Alguns campos ainda precisam de ajuste para a conta ficar correta.</span>
                  </div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2">
                  <InputField id="height" label="Altura (m)" name="height" value={form.height} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 2.8" required helperText="Use a altura da parede em metros." error={errors.height} unit="m" inputMode="decimal" icon={<Palette size={16} />} />
                  <InputField id="width" label="Largura (m)" name="width" value={form.width} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 4" required helperText="Use a largura da parede em metros." error={errors.width} unit="m" inputMode="decimal" icon={<Palette size={16} />} />
                  <InputField id="walls" label="Quantidade de paredes" name="walls" value={form.walls} onChange={handleChange} min="0" step="1" placeholder="Ex: 4" required helperText="Se a sala tiver 4 paredes, use 4." error={errors.walls} unit="un." inputMode="numeric" />
                  <InputField id="coats" label="Quantidade de demãos" name="coats" value={form.coats} onChange={handleChange} min="0" step="1" placeholder="Ex: 2" required helperText="Em geral, 2 demãos dão um resultado mais consistente." error={errors.coats} unit="demãos" inputMode="numeric" />
                </div>
                <InputField id="yieldPerLiter" label="Rendimento da tinta (m²/L)" name="yieldPerLiter" value={form.yieldPerLiter} onChange={handleChange} min="0" step="0.1" placeholder="Ex: 10" required helperText="O rendimento costuma aparecer na embalagem da tinta." error={errors.yieldPerLiter} unit="m²/L" inputMode="decimal" icon={<Palette size={16} />} />
                <InputField id="openingsArea" label="Portas/janelas (m²)" name="openingsArea" value={form.openingsArea} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 2" helperText="Área total de portas e janelas a serem descontadas." unit="m²" inputMode="decimal" />

                <div className="flex flex-wrap gap-3 pt-2">
                  <PrimaryButton type="submit" disabled={!isValid}>Calcular</PrimaryButton>
                  <button type="button" onClick={resetForm} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-600 hover:text-sky-600">
                    Novo cálculo
                  </button>
                  <Link to="/orcamento" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-600 hover:text-sky-600">
                    Solicitar orçamento
                  </Link>
                </div>
              </form>
            </CalculatorCard>

            <div className="space-y-4">
              {result ? (
                <ResultCard
                  title="Resultado"
                  items={[
                    { label: "Área bruta", value: `${result.area} m²` },
                    { label: "Área líquida", value: `${result.usefulArea} m²` },
                    { label: "Litros necessários", value: `${result.liters} L` },
                    { label: "Latas de 18 L", value: `${result.cans}` },
                  ]}
                  actions={
                    <>
                      <PrimaryButton href={budgetLink}>Solicitar orçamento</PrimaryButton>
                      <a href={ECOMMERCE_URL || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-600 hover:text-sky-600">
                        Ver tintas
                      </a>
                    </>
                  }
                />
              ) : (
                <CalculatorCard className="min-h-65 flex items-center justify-center text-center text-sm text-slate-600">
                  Informe as dimensões e o rendimento para descobrir a quantidade ideal de tinta.
                </CalculatorCard>
              )}
</div>
        </section>
      </div>
    </div>
  );
}
