import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";

export function HomeMain() {
  const { leagueSlug } = useParams({ from: "/leagues/$leagueSlug/home" });
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-semibold">{leagueSlug} Home Page</h3>

      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug }}
      >
        <Button>View Schedules</Button>
      </Link>
    </div>
  );
}
