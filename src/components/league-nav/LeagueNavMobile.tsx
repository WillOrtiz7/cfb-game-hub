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
  const leagueSlug = useLeagueStore((state) => state.leagueSlug);
  const selectedTab = useLeagueNavStore((state) => state.selectedTab);
  const setSelectedTab = useLeagueNavStore((state) => state.setSelectedTab);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-8 p-2 border-t border-border bg-primary-foreground">
      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.HOME)}
      >
        <div className="flex flex-col items-center transition-transform transform active:scale-75">
          {selectedTab === LeagueNavTabOptions.HOME ? (
            <IoHome className="w-6 h-6" />
          ) : (
            <IoHomeOutline className="w-6 h-6" />
          )}
          <p className="text-sm">Home</p>
        </div>
      </Link>
      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.SCHEDULE)}
      >
        <div className="flex flex-col items-center transition-transform transform active:scale-75">
          {selectedTab === LeagueNavTabOptions.SCHEDULE ? (
            <IoCalendar className="w-6 h-6 fill-white" />
          ) : (
            <IoCalendarOutline className="w-6 h-6" />
          )}
          <p className="text-sm">Schedule</p>
        </div>
      </Link>
      <Link
        to="/leagues/$leagueSlug/standings"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.STANDINGS)}
      >
        <div className="flex flex-col items-center transition-transform transform active:scale-75">
          {selectedTab === LeagueNavTabOptions.STANDINGS ? (
            <IoPodium className="w-6 h-6 fill-white" />
          ) : (
            <IoPodiumOutline className="w-6 h-6" />
          )}
          <p className="text-sm">Standings</p>
        </div>
      </Link>
      <Link
        to="/leagues/$leagueSlug/commits"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.COMMITS)}
      >
        <div className="flex flex-col items-center transition-transform transform active:scale-75 ">
          {selectedTab === LeagueNavTabOptions.COMMITS ? (
            <IoReceipt className="w-6 h-6 fill-white" />
          ) : (
            <IoReceiptOutline className="w-6 h-6" />
          )}
          <p className="text-sm">Commits</p>
        </div>
      </Link>
    </nav>
  );
}
