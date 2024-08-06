import { useGetLeagueId } from "@/hooks/useGetLeagueId";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { useGetRecruits } from "../api/queries/useGetRecruits";
import { RecruitsCard } from "./RecruitsCard";

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 2xl:grid-cols-4">
        {recruits.map((recruit) => (
          <RecruitsCard key={recruit.id} recruit={recruit} />
        ))}
      </div>
    )
  );
}
