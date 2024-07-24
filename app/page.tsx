import { ScorePanel } from "../components/score-board";
import { ScoreCard } from "../components/score-card";

export default function Home() {
  return (
    <ScorePanel>
      <ScoreCard playerName="player 1" color="yellow" />
      <ScoreCard playerName="player 2" color="green" />
    </ScorePanel>
  );
}
