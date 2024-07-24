import { use } from "react";
import { GameContext } from "@/provider/game-context";
import { stringifyCoordinates } from "@/utilities/helpers";

export function useShipPartState({ x, y }: { x: number; y: number }) {
  const gameState = use(GameContext);
  if (gameState === undefined) {
    throw new Error(
      "useShipPartState hook needs to be used within GameContextProvider",
    );
  }

  const partCoordinates = stringifyCoordinates({
    x,
    y,
  });

  const isHit = gameState.hitParts.has(partCoordinates);

  return { isHit };
}
