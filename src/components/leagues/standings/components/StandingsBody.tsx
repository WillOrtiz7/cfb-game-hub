import { useGetLeagueId } from "@/hooks/useGetLeagueId";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { useGetStandings } from "../api/queries/useGetStandings";
import { StandingsTable } from "./StandingsTable";

export function StandingsBody() {
  useGetLeagueId();
  const leagueId = useLeagueStore((state) => state.leagueId);
  const { data: conferences, isLoading, isError } = useGetStandings(leagueId);

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
