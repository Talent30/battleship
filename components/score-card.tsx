import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

const scoreCard = tv({
  slots: {
    card: "text-center py-5 w-full",
    layout: "grid gap-y-2",
    scoreText: "text-3xl md:text-5xl  font-black text-foreground px-6",
    playerText:
      "text-xl md:text-2xl whitespace-nowrap font-black text-foreground px-6",
    divider: "border-t-foreground mx-2",
  },
  variants: {
    color: {
      green: { card: "bg-green" },
      yellow: { card: "bg-yellow" },
    },
  },
});

const { card, divider, layout, scoreText, playerText } = scoreCard();

type ScoreCardVariants = Required<VariantProps<typeof scoreCard>>;

type ScoreCardProperties = ScoreCardVariants & {
  playerName: string;
  score?: string;
};

export function ScoreCard({
  playerName,
  score = "00",
  color,
}: ScoreCardProperties) {
  return (
    <div className={card({ color })}>
      <div className={layout()}>
        <p className={scoreText()}>{score}</p>
        <hr className={divider()} />
        <p className={playerText()}>{playerName}</p>
      </div>
    </div>
  );
}
