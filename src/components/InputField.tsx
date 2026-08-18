import type { ChangeEvent, ReactNode } from "react";

interface Option {
  value: string;
  label: string;
}

interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: "text" | "number" | "textarea" | "select";
  placeholder?: string;
  min?: string;
  step?: string;
  options?: Option[];
  helperText?: string;
  error?: string;
  required?: boolean;
  unit?: string;
  icon?: ReactNode;
  inputMode?: "text" | "numeric" | "decimal";
  autoComplete?: string;
}

export default function InputField({
  id,
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
  step,
  options = [],
  helperText,
  error,
  required = false,
  unit,
  icon,
  inputMode,
  autoComplete,
}: InputFieldProps) {
  const hasError = Boolean(error);
  const fieldClassName = `w-full rounded-2xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white ${
    hasError ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-sky-500"
  }`;

  const helperClassName = `text-xs ${hasError ? "text-red-600" : "text-slate-500"}`;

  if (type === "textarea") {
    return (
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor={id}>
        <span>{label}</span>
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(event)}
          placeholder={placeholder}
          required={required}
          rows={4}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={fieldClassName}
        />
        {helperText ? <span id={`${id}-helper`} className={helperClassName}>{helperText}</span> : null}
        {hasError ? <span id={`${id}-error`} className="text-xs font-medium text-red-600" role="alert">{error}</span> : null}
      </label>
    );
  }

  if (type === "select") {
    return (
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor={id}>
        <span>{label}</span>
        <select
          id={id}
          name={name}
          value={value}
          onChange={(event) => onChange(event)}
          required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={fieldClassName}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helperText ? <span id={`${id}-helper`} className={helperClassName}>{helperText}</span> : null}
        {hasError ? <span id={`${id}-error`} className="text-xs font-medium text-red-600" role="alert">{error}</span> : null}
      </label>
    );
  }

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor={id}>
      <span>{label}</span>
      <div className={`flex items-center gap-2 rounded-2xl border bg-slate-50 px-4 py-3 transition focus-within:border-sky-500 ${hasError ? "border-red-400" : "border-slate-200"}`}>
        {icon ? <span className="text-slate-400">{icon}</span> : null}
        <input
          id={id}
          name={name}
          type={type === "number" ? "number" : "text"}
          value={value}
          onChange={(event) => onChange(event)}
          placeholder={placeholder}
          min={min}
          step={step}
          required={required}
          inputMode={inputMode}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className="w-full border-0 bg-transparent text-sm text-slate-900 outline-none"
        />
        {unit ? <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{unit}</span> : null}
      </div>
      {helperText ? <span id={`${id}-helper`} className={helperClassName}>{helperText}</span> : null}
      {hasError ? <span id={`${id}-error`} className="text-xs font-medium text-red-600" role="alert">{error}</span> : null}
    </label>
  );
}
