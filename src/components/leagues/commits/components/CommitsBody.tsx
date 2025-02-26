import {
  useInitializeLeagueId,
  useLeagueStore,
} from "@/zustand/useLeagueStore";
import { useGetCommits } from "../api/queries/useGetCommits";
import { useCommitStore } from "../store/useCommitStore";
import { CommitCard } from "./CommitCard";
import { CommitsTable } from "./CommitsTable";

export function CommitsBody() {
  useInitializeLeagueId();
  const leagueId = useLeagueStore((state) => state.leagueId);
  const year = useCommitStore((state) => state.filterYear);
  const teamId = useCommitStore((state) => state.filterTeamId);
  const position = useCommitStore((state) => state.filterPosition);
  const minStars = useCommitStore((state) => state.filterMinStars);
  const maxStars = useCommitStore((state) => state.filterMaxStars);
  const isTableViewMode = useCommitStore((state) => state.isTableViewMode);

  const {
    data: commits,
    isLoading,
    isError,
    error,
  } = useGetCommits(leagueId, year, teamId, position, minStars, maxStars);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  if (commits?.length === 0) {
    return <div>No commits found</div>;
  }

  return (
    commits && (
      <>
        {isTableViewMode ? (
          <CommitsTable commits={commits} />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
            {commits.map((commit) => (
              <CommitCard key={commit.id} commit={commit} />
            ))}
          </div>
        )}
      </>
    )
  );
}
