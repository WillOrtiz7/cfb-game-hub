import { SchedulesMain } from "@/components/leagues/schedules/SchedulesMain";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leagues/$leagueSlug/schedules")({
  component: SchedulesMain,
});
