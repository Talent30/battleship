import type { ShipInfo } from "./types";

export function stringifyAccordion({ x, y }: { x: number; y: number }) {
  return `${x.toString()},${y.toString()}`;
}

export function getSunkShipPartsAccordion({
  shipInfo,
  hitParts,
}: {
  shipInfo: ShipInfo;
  hitParts: Set<string>;
}) {
  const sunkPartsSet = new Set<string>();

  for (const { positions } of shipInfo) {
    const result = positions.every(([x, y]) =>
      hitParts.has(stringifyAccordion({ x, y })),
    );

    if (result) {
      for (const [x, y] of positions) {
        sunkPartsSet.add(stringifyAccordion({ x, y }));
      }
    }
  }

  return sunkPartsSet;
}
