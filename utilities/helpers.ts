import type { ShipInfo } from "./types";

export function stringifyCoordinates({ x, y }: { x: number; y: number }) {
  return `${x.toString()},${y.toString()}`;
}

export function getSunkShipCoordinates({
  shipInfo,
  firedCoordinates,
}: {
  shipInfo: ShipInfo;
  firedCoordinates: ReadonlySet<string>;
}) {
  const sunkPartsSet = new Set<string>();

  for (const { positions } of shipInfo) {
    const result = positions.every(([x, y]) =>
      firedCoordinates.has(stringifyCoordinates({ x, y })),
    );

    if (result) {
      for (const [x, y] of positions) {
        sunkPartsSet.add(stringifyCoordinates({ x, y }));
      }
    }
  }

  return sunkPartsSet;
}

export function areSetsEqual<T>(a: ReadonlySet<T>, b: ReadonlySet<T>) {
  return a.size === b.size && [...a].every((value) => b.has(value));
}

export function isSuperset<T>(
  superSet: ReadonlySet<T>,
  subSet: ReadonlySet<T>,
) {
  for (const element of subSet) {
    if (!superSet.has(element)) {
      return false;
    }
  }
  return true;
}
