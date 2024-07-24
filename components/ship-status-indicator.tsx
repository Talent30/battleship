import type { ShipType } from "@/utilities/types";
import type { ReactNode } from "react";
import Image from "next/image";
import battleShip from "@/app/assets/Battleship Shape.png";
import carrier from "@/app/assets/Carrier Shape.png";
import cruiser from "@/app/assets/Cruiser Shape.png";
import destroyer from "@/app/assets/Destroyer Shape.png";
import hit from "@/app/assets/Hit small.png";
import part from "@/app/assets/Miss small.png";
import submarine from "@/app/assets/Submarine Shape.png";
import { shipTypes } from "@/utilities/constants";

const shipIconStyle = "w-20 sm:w-24 aspect-auto";

const shipIcon = {
  battleship: (
    <Image
      className={shipIconStyle}
      alt="battleShip"
      placeholder="blur"
      src={battleShip}
    />
  ),
  carrier: (
    <Image
      className={shipIconStyle}
      alt="carrier"
      placeholder="blur"
      src={carrier}
    />
  ),
  cruiser: (
    <Image
      className={shipIconStyle}
      alt="cruiser"
      placeholder="blur"
      src={cruiser}
    />
  ),
  submarine: (
    <Image
      className={shipIconStyle}
      alt="submarine"
      placeholder="blur"
      src={submarine}
    />
  ),
  destroyer: (
    <Image
      className={shipIconStyle}
      alt="destroyer"
      placeholder="blur"
      src={destroyer}
    />
  ),
} as const satisfies Record<ShipType, ReactNode>;

function ShipPart({ isHit = false }: { isHit?: boolean }) {
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

export function ShipStatusIndicator({ shipType }: { shipType: ShipType }) {
  return (
    <span className="flex items-center justify-start gap-x-2">
      {shipIcon[shipType]}
      <span className="flex md:gap-x-2">
        {Array.from({ length: shipTypes[shipType].size }).map((_, index) => (
          <ShipPart key={`${shipType}-part-${index.toString()}`} />
        ))}
      </span>
    </span>
  );
}
