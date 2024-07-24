import { use } from "react";
import { GameContext } from "@/provider/game-context";
import { stringifyAccordion } from "@/utilities/helpers";

export function useShipPartState({ x, y }: { x: number; y: number }) {
  const gameState = use(GameContext);
  if (gameState === undefined) {
    throw new Error(
      "useShipPartState hook needs to be used within GameContextProvider",
    );
  }

  const accordion = stringifyAccordion({
    x,
    y,
  });

  const isHit = gameState.hitParts.has(accordion);

  return { isHit };
}
