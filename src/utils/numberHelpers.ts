export function parseNumberInput(value: string | number): number {
  if (typeof value === "number") {
    return value;
  }

  const normalized = value.trim().replace(/,/g, ".");
  return Number(normalized);
}

export function isPositiveNumber(value: string | number): boolean {
  const parsed = parseNumberInput(value);
  return !Number.isNaN(parsed) && Number.isFinite(parsed) && parsed > 0;
}

export function formatDecimal(value: number, digits = 2): number {
  return Number(value.toFixed(digits));
}
