import { useLeagueStore } from "@/zustand/useLeagueStore";
import { useState } from "react";
import { LEAGUE_MAIN_LOGOS_BASE_URL } from "../leagues/schedules/constants/baseUrls";

export function LeagueLogo() {
  const leagueId = useLeagueStore((state) => state.leagueId);
  const [imgError, setImgError] = useState(false);
  return (
    <>
      {leagueId && !imgError && (
        <img
          src={`${LEAGUE_MAIN_LOGOS_BASE_URL}${leagueId}.png`}
          className="w-12 h-10 mr-2 object-fit"
          onError={() => setImgError(true)}
        />
      )}
    </>
  );
}
