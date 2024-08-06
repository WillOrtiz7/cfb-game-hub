import { useGetLeagueId } from "@/hooks/useGetLeagueId";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { useGetCommits } from "../api/queries/useGetRecruits";
import { CommitCard } from "./CommitCard";

export function CommitsBody() {
  useGetLeagueId();
  const leagueId = useLeagueStore((state) => state.leagueId);

  const { data: commits, isLoading, isError, error } = useGetCommits(leagueId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    commits && (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 2xl:grid-cols-4">
        {commits.map((commit) => (
          <CommitCard key={commit.id} commit={commit} />
        ))}
      </div>
    )
  );
}
