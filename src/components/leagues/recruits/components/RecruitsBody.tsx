import { useGetLeagueId } from "@/hooks/useGetLeagueId";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { useGetRecruits } from "../api/queries/useGetRecruits";
import { RecruitsTable } from "./RecruitsTable";

export function RecruitsBody() {
  useGetLeagueId();
  const leagueId = useLeagueStore((state) => state.leagueId);

  const {
    data: recruits,
    isLoading,
    isError,
    error,
  } = useGetRecruits(leagueId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    recruits && (
      <div className="flex flex-col">
        <RecruitsTable recruits={recruits} />
      </div>
    )
  );
}
