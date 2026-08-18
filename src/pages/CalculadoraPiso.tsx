import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { BadgeAlert, Ruler, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CalculatorCard from "../components/CalculatorCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import ResultCard from "../components/ResultCard";
import { useCalculatorValidation } from "../hooks/useCalculatorValidation";
import { calculateFloor } from "../utils/calculateFloor";
import { parseNumberInput, isPositiveNumber } from "../utils/numberHelpers";

export default function CalculadoraPiso() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    width: "",
    length: "",
    pieceWidth: "",
    pieceLength: "",
    lossPercent: "10",
  });
  const [result, setResult] = useState<ReturnType<typeof calculateFloor> | null>(null);
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
      { name: "width", value: form.width, message: "Informe a largura do ambiente para continuar." },
      { name: "length", value: form.length, message: "Informe o comprimento do ambiente para continuar." },
      { name: "pieceWidth", value: form.pieceWidth, message: "Informe a largura da peça para calcular a quantidade." },
      { name: "pieceLength", value: form.pieceLength, message: "Informe o comprimento da peça para calcular a quantidade." },
      { name: "lossPercent", value: form.lossPercent, message: "Informe o percentual de perda para ter uma estimativa realista." },
    ]);

    if (!isValid) {
      const firstErrorField = Object.keys(nextErrors)[0];
      const fieldToFocus = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement | null;
      fieldToFocus?.focus();
      fieldToFocus?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const payload = {
      width: parseNumberInput(form.width),
      length: parseNumberInput(form.length),
      pieceWidth: parseNumberInput(form.pieceWidth),
      pieceLength: parseNumberInput(form.pieceLength),
      lossPercent: parseNumberInput(form.lossPercent),
    };

    setResult(calculateFloor(payload));
  };

  const fillExample = () => {
    setForm({
      width: "4",
      length: "6",
      pieceWidth: "0.60",
      pieceLength: "0.60",
      lossPercent: "10",
    });
    clearErrors();
    setHasSubmitted(false);
    setResult(null);
  };

  const resetForm = () => {
    setForm({ width: "", length: "", pieceWidth: "", pieceLength: "", lossPercent: "10" });
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
    ? `/orcamento?products=Piso&message=${encodeURIComponent(`Olá, gostaria de solicitar orçamento para piso. Área calculada: ${result.adjustedArea} m². Peças estimadas: ${result.pieces}.`)}`
    : "/orcamento";

  const isValid = useMemo(() => {
    return [form.width, form.length, form.pieceWidth, form.pieceLength].every((value) => isPositiveNumber(value));
  }, [form]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
    
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">Calculadora</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Calculadora de Piso</h1>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handleBack} className="text-sm font-medium text-slate-600 hover:text-sky-600">
                ← Voltar
              </button>
              <Link to="/" className="text-sm font-medium text-slate-600 hover:text-sky-600">
                Home
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <CalculatorCard>
              <div className="mb-5 rounded-3xl border border-sky-100 bg-sky-50/80 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-sky-600/10 p-2 text-sky-600">
                    <Ruler size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Como medir com segurança</p>
                    <p className="mt-1 text-sm text-slate-600">Meça a largura e o comprimento do ambiente em metros. Para peças de 60x60 cm, use 0.60 em ambos os campos.</p>
                  </div>
                </div>
                <button type="button" onClick={fillExample} className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-sky-700 transition hover:border-sky-400">
                  <Sparkles size={14} />
                  Usar exemplo rápido
                </button>
              </div>

              <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                {hasSubmitted && Object.keys(errors).length > 0 ? (
                  <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700" role="alert">
                    <BadgeAlert size={16} className="mt-0.5 shrink-0" />
                    <span>Revise os campos destacados para evitar desperdícios e garantir um orçamento mais certeiro.</span>
                  </div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2">
                  <InputField id="width" label="Largura do ambiente (m)" name="width" value={form.width} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 4" required helperText="Use metros, não centímetros." error={errors.width} unit="m" inputMode="decimal" icon={<Ruler size={16} />} />
                  <InputField id="length" label="Comprimento (m)" name="length" value={form.length} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 6" required helperText="Ex.: 6 m para um corredor longo." error={errors.length} unit="m" inputMode="decimal" icon={<Ruler size={16} />} />
                  <InputField id="pieceWidth" label="Largura da peça (m)" name="pieceWidth" value={form.pieceWidth} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 0.60" required helperText="Digite a largura da peça em metros." error={errors.pieceWidth} unit="m" inputMode="decimal" icon={<Ruler size={16} />} />
                  <InputField id="pieceLength" label="Comprimento da peça (m)" name="pieceLength" value={form.pieceLength} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 0.60" required helperText="Ex.: 0.60 m para piso 60x60 cm." error={errors.pieceLength} unit="m" inputMode="decimal" icon={<Ruler size={16} />} />
                </div>
                <InputField id="lossPercent" label="Percentual de perda (%)" name="lossPercent" value={form.lossPercent} onChange={handleChange} min="0" step="1" placeholder="Ex: 10" required helperText="Use 10% para cobrir cortes e falhas de instalação." error={errors.lossPercent} unit="%" inputMode="decimal" icon={<BadgeAlert size={16} />} />

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
                    { label: "Área do ambiente", value: `${result.area} m²` },
                    { label: "Área com perda", value: `${result.adjustedArea} m²` },
                    { label: "Área da peça", value: `${result.pieceArea} m²` },
                    { label: "Quantidade de peças", value: `${result.pieces}` },
                    { label: "Caixas necessárias", value: `${result.boxes}` },
                  ]}
                  actions={
                    <>
                      <PrimaryButton href={budgetLink}>Solicitar orçamento</PrimaryButton>
                      <a href="https://www.construbet.com.br" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-600 hover:text-sky-600">
                        Ver pisos
                      </a>
                    </>
                  }
                />
              ) : (
                <CalculatorCard className="min-h-65 flex items-center justify-center text-center text-sm text-slate-600">
                  Preencha os campos e calcule a quantidade ideal de piso para a sua obra.
                </CalculatorCard>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
