import { GameBoard } from "@/components/game-board";
import { ScoreCard } from "@/components/score-card";
import { ShipStatusIndicator } from "@/components/ship-status-indicator";
import { shipInfo } from "@/utilities/constants";

export default function Home() {
  return (
    <div className="flex flex-row flex-wrap-reverse sm:gap-y-4 md:flex-nowrap md:gap-x-4 lg:gap-y-0">
      <div className="flex basis-full flex-col gap-y-2 sm:flex-row sm:gap-x-2 md:basis-2/6 md:flex-col">
        <div className="flex sm:border sm:border-border">
          <ScoreCard playerName="player 1" color="yellow" />
          <ScoreCard playerName="player 2" color="green" />
        </div>
        <div className="grid w-full grid-cols-2 grid-rows-3 gap-x-2 gap-y-1 md:grid-cols-1 md:gap-y-2">
          {shipInfo.map(({ ship }) => (
            <ShipStatusIndicator key={ship} shipType={ship} />
          ))}
        </div>
      </div>
      <div className="basis-full md:basis-4/6">
        <GameBoard />
      </div>
    </div>
  );
}
