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

export function LeagueNavDesktop() {
  const leagueSlug = useLeagueStore((state) => state.leagueSlug);
  const selectedTab = useLeagueNavStore((state) => state.selectedTab);
  const setSelectedTab = useLeagueNavStore((state) => state.setSelectedTab);

  return (
    <nav className="flex flex-col items-center gap-5 p-2 h-max">
      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.HOME)}
      >
        <div className="transition-transform transform active:scale-90">
          {selectedTab === LeagueNavTabOptions.HOME ? (
            <IoHome className="w-6 h-6" />
          ) : (
            <IoHomeOutline className="w-6 h-6" />
          )}
        </div>
      </Link>
      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.SCHEDULE)}
      >
        <div className="transition-transform transform active:scale-90">
          {selectedTab === LeagueNavTabOptions.SCHEDULE ? (
            <IoCalendar className="w-6 h-6 fill-white" />
          ) : (
            <IoCalendarOutline className="w-6 h-6" />
          )}
        </div>
      </Link>
      <Link
        to="/leagues/$leagueSlug/standings"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.STANDINGS)}
      >
        <div className="transition-transform transform active:scale-90">
          {selectedTab === LeagueNavTabOptions.STANDINGS ? (
            <IoPodium className="w-6 h-6 fill-white" />
          ) : (
            <IoPodiumOutline className="w-6 h-6" />
          )}
        </div>
      </Link>
      <Link
        to="/leagues/$leagueSlug/commits"
        params={{ leagueSlug: leagueSlug || "" }}
        className="flex flex-col items-center justify-center text-center"
        onClick={() => setSelectedTab(LeagueNavTabOptions.COMMITS)}
      >
        <div className="transition-transform transform active:scale-90">
          {selectedTab === LeagueNavTabOptions.COMMITS ? (
            <IoReceipt className="w-6 h-6 fill-white" />
          ) : (
            <IoReceiptOutline className="w-6 h-6" />
          )}
        </div>
      </Link>
    </nav>
  );
}
