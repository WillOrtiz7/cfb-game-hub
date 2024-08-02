import { StandingsMain } from "@/components/leagues/standings/StandingsMain";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leagues/$leagueSlug/standings")({
  component: StandingsMain,
});
