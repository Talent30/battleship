"use client";

import Image from "next/image";
import hit from "@/app/assets/Hit small.png";
import part from "@/app/assets/Miss small.png";
import { useShipPartState } from "@/hooks/use-ship-part-state";

export function ShipPart({
  partcoordinates,
}: {
  partcoordinates: { x: number; y: number };
}) {
  const { isHit } = useShipPartState(partcoordinates);
  return isHit ? (
    <Image
      className="size-3 sm:size-4"
      placeholder="blur"
      src={hit}
      alt="Hit part"
    />
  ) : (
    <Image
      className="size-3 sm:size-4"
      placeholder="blur"
      src={part}
      alt="Complete part"
    />
  );
}
