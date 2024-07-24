"use client";

import { useGameState } from "@/hooks/use-game-state";
import { colSize, rowSize } from "@/utilities/constants";
import { stringifyCoordinates } from "@/utilities/helpers";

import { GameCell } from "./game-cell";

export function GameBoard() {
  const { isGamOver, resetGame } = useGameState();
  return isGamOver ? (
    <div className="flex aspect-square w-full max-w-full flex-col items-center justify-center gap-y-4 border-8 border-yellow bg-yellow sm:border-4 md:max-w-3xl">
      <h1 className="text-6xl text-white">Game Over</h1>
      <button
        onClick={() => {
          resetGame();
        }}
        type="submit"
        className="rounded-sm bg-white px-6 py-2 text-foreground ring-2 ring-white hover:bg-gray-100"
      >
        Play Again
      </button>
    </div>
  ) : (
    <div className="grid aspect-square w-full max-w-full grid-cols-[repeat(10,10%)] grid-rows-[repeat(10,10%)] border-8 border-yellow sm:border-4 md:max-w-3xl">
      {Array.from({ length: colSize }).map((_col, x) => {
        return Array.from({ length: rowSize }).map((_row, y) => {
          return (
            <GameCell
              key={stringifyCoordinates({ x, y })}
              coordinates={{ x, y }}
            />
          );
        });
      })}
    </div>
  );
}
