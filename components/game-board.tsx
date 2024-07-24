import { colSize, rowSize } from "../utilities/constants";

export function GameBoard() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid aspect-square w-full max-w-sm grid-cols-[repeat(10,10%)] grid-rows-[repeat(10,10%)] border border-border sm:max-w-3xl md:max-w-xl">
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
    </div>
  );
}
