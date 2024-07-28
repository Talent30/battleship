"use client";

import type { Dispatch, ReactNode } from "react";
import { createContext, useReducer } from "react";
import { shipInfo } from "@/utilities/constants";
import {
  getSunkShipCoordinates,
  stringifyCoordinates,
} from "@/utilities/helpers";

type GameState = {
  readonly firedCoordinates: ReadonlySet<string>;
  readonly sunkShipCoordinates: ReadonlySet<string>;
};

type ActionType =
  | { type: "fire"; firedCoordinates: { x: number; y: number } }
  | { type: "resetGame" };

export const GameContext = createContext<GameState | undefined>(undefined);
export const GameDispatchContext = createContext<
  Dispatch<ActionType> | undefined
>(undefined);

const initialGameState = {
  firedCoordinates: new Set(),
  sunkShipCoordinates: new Set(),
} satisfies GameState;

function gameReducer(gameState: GameState, action: ActionType) {
  switch (action.type) {
    case "fire": {
      const firecoordinates = stringifyCoordinates({
        x: action.firedCoordinates.x,
        y: action.firedCoordinates.y,
      });

      // Set can handle dedupe
      const newfiredCoordinates = new Set([
        ...gameState.firedCoordinates,
        firecoordinates,
      ]);

      // If the positions of a ship are the subset of hit parts, mark the ship as sunk and save the positions
      // Do the search once instead of doing it everytime for each cell
      const newSunkShipCoordinates = getSunkShipCoordinates({
        shipInfo,
        firedCoordinates: newfiredCoordinates,
      });

      return {
        firedCoordinates: newfiredCoordinates,
        sunkShipCoordinates: newSunkShipCoordinates,
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
