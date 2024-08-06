import { CommitsMain } from "@/components/leagues/commits/CommitsMain";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leagues/$leagueSlug/commits")({
  component: CommitsMain,
});
