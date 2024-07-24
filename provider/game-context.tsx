"use client";

import type { Dispatch, ReactNode } from "react";
import { createContext, useReducer } from "react";
import { shipInfo, shipsAccordionSet } from "@/utilities/constants";
import {
  getSunkShipPartsAccordions,
  stringifyAccordion,
} from "@/utilities/helpers";

type GameState = {
  readonly firedPosition: Set<string>;
  readonly hitParts: Set<string>;
  readonly sunkShipParts: Set<string>;
};

type ActionType =
  | { type: "fire"; firedPosition: { x: number; y: number } }
  | { type: "resetGame" };

export const GameContext = createContext<GameState | undefined>(undefined);
export const GameDispatchContext = createContext<
  Dispatch<ActionType> | undefined
>(undefined);

const initialGameState = {
  firedPosition: new Set(),
  hitParts: new Set(),
  sunkShipParts: new Set(),
} satisfies GameState;

function gameReducer(gameState: GameState, action: ActionType) {
  switch (action.type) {
    case "fire": {
      const fireAccordion = stringifyAccordion({
        x: action.firedPosition.x,
        y: action.firedPosition.y,
      });

      // Set can handle dedupe
      const newFiredPosition = new Set([
        ...gameState.firedPosition,
        fireAccordion,
      ]);

      const newHitParts = shipsAccordionSet.has(fireAccordion)
        ? new Set([...gameState.hitParts, fireAccordion])
        : gameState.hitParts;

      // If the positions of a ship are the subset of hit parts, mark the ship as sunk and save the positions
      // Do the search once instead of doing it everytime for each cell
      const newSunkShipParts = getSunkShipPartsAccordions({
        shipInfo,
        hitParts: newHitParts,
      });

      return {
        firedPosition: newFiredPosition,
        hitParts: newHitParts,
        sunkShipParts: newSunkShipParts,
      };
    }
    case "resetGame": {
      return initialGameState;
    }
    default: {
      throw new Error("Unknown action");
    }
  }
}

export function GameContextProvider({ children }: { children: ReactNode }) {
  const [gameStatus, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameContext value={gameStatus}>
      <GameDispatchContext value={dispatch}>{children}</GameDispatchContext>
    </GameContext>
  );
}
