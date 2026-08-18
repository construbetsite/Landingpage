import { formatDecimal } from "./numberHelpers";

export interface PaintCalculationResult {
  area: number;
  usefulArea: number;
  liters: number;
  cans: number;
}

export function calculatePaint({
  height,
  width,
  walls,
  coats,
  yieldPerLiter,
  openingsArea = 0,
  packageSize = 18,
}: {
  height: number;
  width: number;
  walls: number;
  coats: number;
  yieldPerLiter: number;
  openingsArea?: number;
  packageSize?: number;
}): PaintCalculationResult {
  const grossArea = height * width * walls;
  const usefulArea = Math.max(grossArea - openingsArea, 0);
  const liters = Number(Math.ceil((usefulArea * coats) / yieldPerLiter).toFixed(0));
  const cans = Math.ceil(liters / packageSize);

  return {
    area: formatDecimal(grossArea),
    usefulArea: formatDecimal(usefulArea),
    liters,
    cans,
  };
}
