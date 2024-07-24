import type { ReactNode } from "react";

export function ScorePanel({ children }: { children: ReactNode }) {
  return <div className="border-border flex border">{children}</div>;
}
