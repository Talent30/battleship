import type { shipInfo, shipTypes } from "./constants";

export type ShipInfo = typeof shipInfo;
export type ShipType = keyof typeof shipTypes;

export type GameCellState = "hit" | "miss" | "empty" | "sunk";
