"use client";

import type { GameCellState } from "@/utilities/types";
import Image from "next/image";
import hitMark from "@/app/assets/Hit.png";
import missMark from "@/app/assets/Miss.png";
import { useCellState } from "@/hooks/use-cell-state";
import { stringifyAccordion } from "@/utilities/helpers";

function CellMark({ gameCellState }: { gameCellState: GameCellState }) {
  if (gameCellState === "hit" || gameCellState === "sunk") {
    return <Image alt="Hit" src={hitMark} placeholder="blur" />;
  }
  if (gameCellState === "miss") {
    return <Image alt="Missed" src={missMark} placeholder="blur" />;
  }
  return;
}

export function GameCell({
  accordion: { x, y },
}: {
  accordion: { x: number; y: number };
}) {
  const { gameCellState, setFire } = useCellState({ x, y });
  const hoverStyle =
    gameCellState === "empty" ? "hover:bg-red hover:bg-opacity-30" : "";

  // If a boat is sunk show the cell as red
  const sunkStyle = gameCellState === "sunk" ? "bg-red bg-opacity-30" : "";
  return (
    <button
      id={stringifyAccordion({ x, y })}
      onClick={() => {
        setFire({ x, y });
      }}
      className={`size-full border border-border ${hoverStyle} ${sunkStyle}`}
      type="button"
    >
      <CellMark gameCellState={gameCellState} />
    </button>
  );
}