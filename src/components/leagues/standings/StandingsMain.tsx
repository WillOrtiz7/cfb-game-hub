import { StandingsBody } from "./components/StandingsBody";
import { StandingsHeader } from "./components/StandingsHeader";

export function StandingsMain() {
  return (
    <div className="flex flex-col gap-4">
      <StandingsHeader />
      <StandingsBody />
    </div>
  );
}
