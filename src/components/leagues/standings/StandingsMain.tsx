import { useGetLeagueId } from "@/hooks/useGetLeagueId";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { useGetStandings } from "./api/queries/useGetStandings";

export function StandingsMain() {
  useGetLeagueId();
  const leagueId = useLeagueStore((state) => state.leagueId);
  const { data, isLoading, isError } = useGetStandings(leagueId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  if (data) {
    console.log(data);
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold">Standings</h1>
    </div>
  );
}
