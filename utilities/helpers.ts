import type { ShipInfo } from "./types";

export function stringifyCoordinates({ x, y }: { x: number; y: number }) {
  return `${x.toString()},${y.toString()}`;
}

export function getSunkShipCoordinates({
  shipInfo,
  hitParts,
}: {
  shipInfo: ShipInfo;
  hitParts: Set<string>;
}) {
  const sunkPartsSet = new Set<string>();

  for (const { positions } of shipInfo) {
    const result = positions.every(([x, y]) =>
      hitParts.has(stringifyCoordinates({ x, y })),
    );

    if (result) {
      for (const [x, y] of positions) {
        sunkPartsSet.add(stringifyCoordinates({ x, y }));
      }
    }
  }

  return sunkPartsSet;
}

export function areSetsEqual<T>(a: Set<T>, b: Set<T>) {
  return a.size === b.size && [...a].every((value) => b.has(value));
}
