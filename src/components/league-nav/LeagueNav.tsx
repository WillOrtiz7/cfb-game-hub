import { useMediaQuery } from "@/hooks/useMediaQuery"; // Assuming you have a custom hook for media queries
import { LeagueNavDesktop } from "./LeagueNavDesktop";
import { LeagueNavMobile } from "./LeagueNavMobile";

export function LeagueNav() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <LeagueNavDesktop />;
  } else {
    return <LeagueNavMobile />;
  }
}
