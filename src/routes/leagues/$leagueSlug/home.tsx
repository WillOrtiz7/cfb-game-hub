import { HomeMain } from "@/components/leagues/home/HomeMain";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leagues/$leagueSlug/home")({
  component: HomeMain,
});
