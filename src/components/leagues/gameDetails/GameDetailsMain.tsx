import { GameDetailsHeader } from "./components/GameDetailsHeader";
import { GameDetailsTabs } from "./components/GameDetailsTabs";

export function GameDetailsMain() {
  return (
    <div className="flex flex-col gap-2">
      <GameDetailsHeader />
      <GameDetailsTabs />
    </div>
  );
}
