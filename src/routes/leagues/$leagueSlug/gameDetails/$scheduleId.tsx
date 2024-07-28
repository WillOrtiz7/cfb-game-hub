import { GameDetailsMain } from "@/components/leagues/gameDetails/GameDetailsMain";
import { supabase } from "@/supabase/createClient";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const scheduleIdSchema = z.string().uuid();

export const Route = createFileRoute(
  "/leagues/$leagueSlug/gameDetails/$scheduleId"
)({
  // Safeguard against invalid scheduleId
  loader: async ({ params }) => {
    // Prevent spamming of scheduleIds that aren't UUIDs
    try {
      scheduleIdSchema.parse(params.scheduleId);
    } catch (e) {
      redirect({ to: "/notFound", throw: true });
    }
    // Validate scheduleId against the DB
    const { data, error } = await supabase
      .from("schedules")
      .select("id")
      .eq("id", params.scheduleId);

    if (data?.length === 0 || error) {
      redirect({ to: "/notFound", throw: true });
    }
  },
  component: GameDetailsMain,
});
