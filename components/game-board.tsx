import { colSize, rowSize } from "../utilities/constants";

export function GameBoard() {
  return (
    <div className="grid aspect-square w-full max-w-full grid-cols-[repeat(10,10%)] grid-rows-[repeat(10,10%)] border-8 border-yellow sm:border-4 md:max-w-3xl">
      {Array.from({ length: colSize }).map((_col, x) => {
        return Array.from({ length: rowSize }).map((_row, y) => {
          return (
            <div
              key={`${x.toString()},${y.toString()}`}
              id={`${x.toString()},${y.toString()}`}
              className="border border-border"
            />
          );
        });
      })}
    </div>
  );
}
