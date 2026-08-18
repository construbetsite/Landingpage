import { formatDecimal } from "./numberHelpers";

export interface FloorCalculationResult {
  area: number;
  adjustedArea: number;
  pieces: number;
  boxes: number;
  lossPercent: number;
  pieceArea: number;
}

export function calculateFloor({
  width,
  length,
  pieceWidth,
  pieceLength,
  lossPercent,
  piecesPerBox = 10,
}: {
  width: number;
  length: number;
  pieceWidth: number;
  pieceLength: number;
  lossPercent: number;
  piecesPerBox?: number;
}): FloorCalculationResult {
  const area = width * length;
  const adjustedArea = area * (1 + lossPercent / 100);
  const pieceArea = pieceWidth * pieceLength;
  const pieces = Math.ceil(adjustedArea / pieceArea);
  const boxes = Math.ceil(pieces / piecesPerBox);

  return {
    area: formatDecimal(area),
    adjustedArea: formatDecimal(adjustedArea),
    pieceArea: formatDecimal(pieceArea, 4),
    pieces,
    boxes,
    lossPercent,
  };
}
