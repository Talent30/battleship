import { use } from "react";
import { GameContext, GameDispatchContext } from "@/provider/game-context";
import { shipsCoordinatesSet } from "@/utilities/constants";
import { isSuperSet } from "@/utilities/helpers";

export function useGameState() {
  const gameState = use(GameContext);
  const dispatch = use(GameDispatchContext);
  if (gameState === undefined || dispatch === undefined) {
    throw new Error(
      "useGameState hook needs to be used within GameContextProvider",
    );
  }

  const isGamOver = isSuperSet(gameState.firedCoordinates, shipsCoordinatesSet);

  const resetGame = () => {
    dispatch({ type: "resetGame" });
  };

  return { isGamOver, resetGame };
}
