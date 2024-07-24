import type { ShipType } from "@/utilities/types";
import type { ReactNode } from "react";
import Image from "next/image";
import battleShip from "@/app/assets/Battleship Shape.png";
import carrier from "@/app/assets/Carrier Shape.png";
import cruiser from "@/app/assets/Cruiser Shape.png";
import destroyer from "@/app/assets/Destroyer Shape.png";
import submarine from "@/app/assets/Submarine Shape.png";
import { shipInfo } from "@/utilities/constants";

import { ShipPart } from "./ship-part";

const shipIconStyle = "w-20 sm:w-22 md:w-24 aspect-auto";

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

export function ShipStatusIndicator({ shipType }: { shipType: ShipType }) {
  return (
    <span className="flex items-center justify-start gap-x-2">
      {shipIcon[shipType]}
      <span className="flex md:gap-y-2">
        {shipInfo
          .find(({ ship }) => ship === shipType)
          ?.positions.map(([x, y], index) => (
            <ShipPart
              partcoordinates={{ x, y }}
              key={`${shipType}-part-${index.toString()}`}
            />
          ))}
      </span>
    </span>
  );
}
