import { SchedulesMain } from "@/components/leagues/schedules/SchedulesMain";
import { supabase } from "@/supabase/createClient";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const leagueSlugSchema = z.string().min(1).max(100);
export const Route = createFileRoute("/leagues/$leagueSlug/schedules")({
  // Safeguard against invalid leagueSlug
  loader: async ({ params }) => {
    // Prevent spamming of leagueSlugs that aren't valid strings
    try {
      leagueSlugSchema.parse(params.leagueSlug);
    } catch (e) {
      redirect({ to: "/notFound", throw: true });
    }
    // Validate leagueSlug against the DB
    const response = await supabase
      .from("leagues")
      .select("id")
      .eq("slug_name", params.leagueSlug)
      .maybeSingle();

    if (response?.data === null || response.error) {
      redirect({ to: "/notFound", throw: true });
    }
  },
  component: SchedulesMain,
});
