import { RecruitsMain } from "@/components/leagues/recruits/RecruitsMain";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leagues/$leagueSlug/recruits")({
  component: RecruitsMain,
});
