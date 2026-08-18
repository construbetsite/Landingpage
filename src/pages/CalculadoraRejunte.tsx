import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { BadgeAlert, Grid3x3, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import CalculatorCard from "../components/CalculatorCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import ResultCard from "../components/ResultCard";
import { useCalculatorValidation } from "../hooks/useCalculatorValidation";
import { calculateGrout } from "../utils/calculateGrout";
import { parseNumberInput, isPositiveNumber } from "../utils/numberHelpers";

export default function CalculadoraRejunte() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ area: "", jointWidth: "", pieceDimension: "", thickness: "" });
  const [result, setResult] = useState<ReturnType<typeof calculateGrout> | null>(null);
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
      { name: "area", value: form.area, message: "Informe a área para calcular a quantidade de rejunte." },
      { name: "jointWidth", value: form.jointWidth, message: "Informe a largura da junta para ajustar o consumo." },
      { name: "pieceDimension", value: form.pieceDimension, message: "Informe a dimensão da peça para completar o cálculo." },
      { name: "thickness", value: form.thickness, message: "Informe a espessura para uma estimativa mais fiel." },
    ]);

    if (!isValid) {
      const firstErrorField = Object.keys(nextErrors)[0];
      const fieldToFocus = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement | null;
      fieldToFocus?.focus();
      fieldToFocus?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const payload = {
      area: parseNumberInput(form.area),
      jointWidth: parseNumberInput(form.jointWidth),
      pieceDimension: parseNumberInput(form.pieceDimension),
      thickness: parseNumberInput(form.thickness),
    };

    setResult(calculateGrout(payload));
  };

  const fillExample = () => {
    setForm({ area: "20", jointWidth: "3", pieceDimension: "60", thickness: "2" });
    clearErrors();
    setHasSubmitted(false);
    setResult(null);
  };

  const resetForm = () => {
    setForm({ area: "", jointWidth: "", pieceDimension: "", thickness: "" });
    clearErrors();
    setHasSubmitted(false);
    setResult(null);
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
    ? `/orcamento?products=Rejunte&message=${encodeURIComponent(`Olá, gostaria de solicitar orçamento para rejunte. Área: ${result.area} m². Consumo estimado: ${result.totalKg} kg.`)}`
    : "/orcamento";

  const isValid = useMemo(() => {
    return [form.area, form.jointWidth, form.pieceDimension, form.thickness].every((value) => isPositiveNumber(value));
  }, [form]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <Helmet>
        <title>Calculadora de Rejunte | Construbet</title>
        <meta name="description" content="Calcule a quantidade de rejunte em kg com base na área, largura de junta e dimensão da peça." />
        <link rel="canonical" href="https://www.construbet.com.br/calculadora/rejunte" />
      </Helmet>
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">Calculadora</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Calculadora de Rejunte</h1>
            </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={handleBack} className="text-sm font-medium text-slate-600 hover:text-sky-600">← Voltar</button>
                <Link to="/" className="text-sm font-medium text-slate-600 hover:text-sky-600">Home</Link>
              </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-sky-600/10 p-2 text-sky-600">
                    <Grid3x3 size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Ajuste a junta com confiança</p>
                    <p className="mt-1 text-sm text-slate-600">Uma junta de 3 mm em uma área de 20 m² pode demandar um volume bem diferente de uma peça de 60 cm.</p>
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
                    <span>Alguns campos precisam ser revisados para evitar erro de compra.</span>
                  </div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2">
                  <InputField id="area" label="Área (m²)" name="area" value={form.area} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 20" required helperText="Usar a área total da superfície a ser rejuntada." error={errors.area} unit="m²" inputMode="decimal" icon={<Grid3x3 size={16} />} />
                  <InputField id="jointWidth" label="Largura da junta (mm)" name="jointWidth" value={form.jointWidth} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 3" required helperText="A maioria das instalações usa 2 a 5 mm." error={errors.jointWidth} unit="mm" inputMode="decimal" icon={<Grid3x3 size={16} />} />
                  <InputField id="pieceDimension" label="Dimensão da peça (cm)" name="pieceDimension" value={form.pieceDimension} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 60" required helperText="Use a medida da peça em centímetros." error={errors.pieceDimension} unit="cm" inputMode="decimal" icon={<Grid3x3 size={16} />} />
                  <InputField id="thickness" label="Espessura (mm)" name="thickness" value={form.thickness} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 2" required helperText="Se a peça for fina, use 1 a 2 mm." error={errors.thickness} unit="mm" inputMode="decimal" icon={<Grid3x3 size={16} />} />
                </div>

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
                    { label: "Área", value: `${result.area} m²` },
                    { label: "Consumo estimado", value: `${result.consumptionPerSquareMeter} kg/m²` },
                    { label: "Total estimado", value: `${result.totalKg} kg` },
                  ]}
                  actions={
                    <>
                      <PrimaryButton href={budgetLink}>Solicitar orçamento</PrimaryButton>
                      <a href="https://www.construbet.com.br" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-600 hover:text-sky-600">
                        Ver rejuntes
                      </a>
                    </>
                  }
                />
              ) : (
                <CalculatorCard className="min-h-65 flex items-center justify-center text-center text-sm text-slate-600">
                  Calcule a quantidade ideal de rejunte com base na área e nas medidas da peça.
                </CalculatorCard>
              )}
</div>
        </section>
        
      </div>
    </div>
  );
}
