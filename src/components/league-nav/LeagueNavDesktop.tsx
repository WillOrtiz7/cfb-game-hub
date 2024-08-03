import { useGetLeagueSlug } from "@/hooks/useGetLeagueSlug";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { Link } from "@tanstack/react-router";
import { Calendar, Home, ListOrdered } from "lucide-react";

export function LeagueNavDesktop() {
  useGetLeagueSlug();
  const leagueSlug = useLeagueStore((state) => state.leagueSlug);

  return (
    <nav className="flex flex-col items-center gap-5 p-2 h-max">
      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug || "" }}
      >
        <Home />
      </Link>
      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug || "" }}
      >
        <Calendar />
      </Link>
      <Link
        to={"/leagues/$leagueSlug/standings"}
        params={{ leagueSlug: leagueSlug || "" }}
      >
        <ListOrdered />
      </Link>
    </nav>
  );
}
