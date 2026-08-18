import { formatDecimal } from "./numberHelpers";

export interface MortarCalculationResult {
  area: number;
  consumptionPerSquareMeter: number;
  totalKg: number;
  bags: number;
  bagWeight: number;
}

const consumptionMap: Record<string, number> = {
  Interno: 4.0,
  Externo: 4.5,
  "Área especial": 8.0,
};

export function calculateMortar({
  area,
  coatingType,
  bagWeight = 20,
}: {
  area: number;
  coatingType: string;
  bagWeight?: number;
}): MortarCalculationResult {
  const consumptionPerSquareMeter = consumptionMap[coatingType] ?? 4.5;
  const totalKg = area * consumptionPerSquareMeter;
  const bags = Math.ceil(totalKg / bagWeight);

  return {
    area: formatDecimal(area),
    consumptionPerSquareMeter,
    totalKg: formatDecimal(totalKg),
    bags,
    bagWeight,
  };
}
