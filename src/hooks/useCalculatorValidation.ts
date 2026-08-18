import { useCallback, useState } from "react";
import { isPositiveNumber, parseNumberInput } from "../utils/numberHelpers";

export interface ValidationRule {
  name: string;
  value: string | number | undefined;
  message: string;
}

export function useCalculatorValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateRules = useCallback((rules: ValidationRule[]) => {
    const nextErrors: Record<string, string> = {};

    rules.forEach(({ name, value, message }) => {
      if (value === undefined || value === null || value === "") {
        nextErrors[name] = message;
        return;
      }

      const normalizedValue = parseNumberInput(value);

      if (Number.isNaN(normalizedValue) || !Number.isFinite(normalizedValue)) {
        nextErrors[name] = "Digite um número válido. Use ponto ou vírgula para decimais.";
        return;
      }

      if (!isPositiveNumber(value)) {
        nextErrors[name] = message;
      }
    });

    setErrors(nextErrors);
    return {
      isValid: Object.keys(nextErrors).length === 0,
      errors: nextErrors,
    };
  }, []);

  const clearFieldError = useCallback((name: string) => {
    setErrors((prev) => {
      if (!prev[name]) {
        return prev;
      }

      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const clearErrors = useCallback(() => setErrors({}), []);

  return {
    errors,
    setErrors,
    validateRules,
    clearFieldError,
    clearErrors,
  };
}
