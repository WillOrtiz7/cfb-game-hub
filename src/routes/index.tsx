import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="flex flex-col">
      Root route
      <Link to="/leagues/$leagueSlug/schedules" params={{ leagueSlug: "b2s" }}>
        <Button>Go to schedules</Button>
      </Link>
    </div>
  ),
});
