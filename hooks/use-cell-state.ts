import type { GameCellState } from "@/utilities/types";
import { use } from "react";
import { GameContext, GameDispatchContext } from "@/provider/game-context";
import { shipsCoordinatesSet } from "@/utilities/constants";
import { stringifyCoordinates } from "@/utilities/helpers";

function getCellState({
  isFired,
  isHit,
  isSunk,
}: {
  isFired: boolean;
  isHit: boolean;
  isSunk: boolean;
}): GameCellState {
  if (isSunk) {
    return "sunk" as const;
  }
  if (isHit && isFired) {
    return "hit" as const;
  }
  if (isFired) {
    return "miss" as const;
  }
  return "empty" as const;
}

export function useCellState({ x, y }: { x: number; y: number }) {
  const gameState = use(GameContext);
  const dispatch = use(GameDispatchContext);
  if (gameState === undefined || dispatch === undefined) {
    throw new Error(
      "useCellState hook needs to be used within GameContextProvider",
    );
  }

  const setFire = (firecoordinates: { x: number; y: number }) => {
    dispatch({ type: "fire", firedCoordinates: firecoordinates });
  };

  const cellCoordinates = stringifyCoordinates({
    x,
    y,
  });

  // Determine if the shipsPostion has been fired on
  const isFired = gameState.firedCoordinates.has(cellCoordinates);

  const isHit = shipsCoordinatesSet.has(cellCoordinates);

  // Determine if the cell is part of sunk ship from the sunkShips set
  const isSunk = gameState.sunkShipCoordinates.has(cellCoordinates);
  // Cell can only have 4 stats (hit, miss, sunk, empty)
  // hit: isHit && isFired, miss: !isHit && isFired, sunk: isHit && isFired && isSunk(part of a sunken ship)
  const gameCellState = getCellState({ isFired, isHit, isSunk });

  return { setFire, gameCellState };
}
