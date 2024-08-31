import {
  useInitializeLeagueId,
  useLeagueStore,
} from "@/zustand/useLeagueStore";
import { useGetStandings } from "../api/queries/useGetStandings";
import { StandingsTable } from "./StandingsTable";

export function StandingsBody() {
  useInitializeLeagueId();
  const leagueId = useLeagueStore((state) => state.leagueId);
  const leagueYear = useLeagueStore((state) => state.leagueYear);
  const {
    data: conferences,
    isLoading,
    isError,
  } = useGetStandings(leagueYear, leagueId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  return (
    conferences && (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {conferences.map((conference, index) => (
          <StandingsTable key={index} conference={conference} />
        ))}
      </div>
    )
  );
}
