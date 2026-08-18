import { formatDecimal } from "./numberHelpers";

export interface GroutCalculationResult {
  area: number;
  consumptionPerSquareMeter: number;
  totalKg: number;
}

const defaultCoefficient = 1.0;

export function calculateGrout({
  area,
  jointWidth,
  pieceDimension,
  thickness,
  coefficient = defaultCoefficient,
}: {
  area: number;
  jointWidth: number;
  pieceDimension: number;
  thickness: number;
  coefficient?: number;
}): GroutCalculationResult {
  const consumptionPerSquareMeter =
    (2 * thickness * jointWidth * coefficient) / pieceDimension;
  const totalKg = area * consumptionPerSquareMeter;

  return {
    area: formatDecimal(area),
    consumptionPerSquareMeter: formatDecimal(consumptionPerSquareMeter, 4),
    totalKg: formatDecimal(totalKg),
  };
}
