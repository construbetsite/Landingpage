import type { ChangeEvent } from "react";

interface NumberInputProps {
  id: string;
  label: string;
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  step?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export default function NumberInput({
  id,
  label,
  name,
  value,
  onChange,
  min,
  step,
  placeholder,
  helperText,
  error,
  required = false,
}: NumberInputProps) {
  const hasError = Boolean(error);

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        step={step}
        placeholder={placeholder}
        required={required}
        className={`rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white ${
          hasError ? "border-red-400" : "border-slate-200"
        }`}
      />
      {helperText ? <span className="text-xs text-slate-500">{helperText}</span> : null}
      {hasError ? <span className="text-xs font-medium text-red-500">{error}</span> : null}
    </label>
  );
}
