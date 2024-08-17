import { useGetLeagueSlug } from "@/hooks/useGetLeagueSlug";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { Link } from "@tanstack/react-router";
import {
  IoCalendar,
  IoCalendarOutline,
  IoHome,
  IoHomeOutline,
  IoPodium,
  IoPodiumOutline,
  IoReceipt,
  IoReceiptOutline,
} from "react-icons/io5";
import { LeagueNavTabOptions } from "./constants/leagueNavTabOptions";
import { useLeagueNavStore } from "./store/useLeagueNavStore";

export function LeagueNavMobile() {
  useGetLeagueSlug();
  const leagueSlug = useLeagueStore((state) => state.leagueSlug);
  const selectedTab = useLeagueNavStore((state) => state.selectedTab);
  const setSelectedTab = useLeagueNavStore((state) => state.setSelectedTab);

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t-[1px] p-2 bg-primary-foreground flex justify-center items-center gap-8 z-10">
      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.HOME)}
      >
        {selectedTab === LeagueNavTabOptions.HOME ? (
          <IoHome className="w-6 h-6" />
        ) : (
          <IoHomeOutline className="w-6 h-6" />
        )}

        <p className="text-sm">Home</p>
      </Link>
      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.SCHEDULE)}
      >
        {selectedTab === LeagueNavTabOptions.SCHEDULE ? (
          <IoCalendar className="w-6 h-6 fill-white" />
        ) : (
          <IoCalendarOutline className="w-6 h-6" />
        )}

        <p className="text-sm">Schedule</p>
      </Link>
      <Link
        to="/leagues/$leagueSlug/standings"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.STANDINGS)}
      >
        {selectedTab === LeagueNavTabOptions.STANDINGS ? (
          <IoPodium className="w-6 h-6 fill-white" />
        ) : (
          <IoPodiumOutline className="w-6 h-6" />
        )}

        <p className="text-sm">Standings</p>
      </Link>
      <Link
        to="/leagues/$leagueSlug/commits"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.COMMITS)}
      >
        {selectedTab === LeagueNavTabOptions.COMMITS ? (
          <IoReceipt className="w-6 h-6 fill-white" />
        ) : (
          <IoReceiptOutline className="w-6 h-6" />
        )}

        <p className="text-sm">Commits</p>
      </Link>
    </nav>
  );
}
