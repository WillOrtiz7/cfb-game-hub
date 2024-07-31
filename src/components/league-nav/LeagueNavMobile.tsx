import { useGetLeagueSlug } from "@/hooks/useGetLeagueSlug";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { Link } from "@tanstack/react-router";
import { Calendar, Home } from "lucide-react";

export function LeagueNavMobile() {
  useGetLeagueSlug();
  const leagueSlug = useLeagueStore((state) => state.leagueSlug);

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t-[1px] p-2 bg-primary-foreground flex justify-center items-center gap-8">
      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
      >
        <Home className="w-7 h-7" />
        <p>Home</p>
      </Link>
      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
      >
        <Calendar className="w-7 h-7" />
        <p>Schedule</p>
      </Link>
      {/* Add more links/icons as needed */}
    </nav>
  );
}
