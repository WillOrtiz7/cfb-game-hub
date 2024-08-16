import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  COMMIT_PORTRAIT_BASE_URL,
  TEAM_LOGOS_BASE_URL,
  TEAM_LOGOS_HELMET_BASE_URL,
} from "../../schedules/constants/baseUrls";
import { GetCommitsResponse } from "../api/queries/useGetCommits";
import { useCommitStore } from "../store/useCommitStore";
import { CommitCardEditModeOptions } from "./CommitCardEditModeOptions";
import { CommitStarRating } from "./CommitStarRating";

interface CommitCardProps {
  commit: GetCommitsResponse;
}

export function CommitCard({ commit }: CommitCardProps) {
  const isEditMode = useCommitStore((state) => state.isEditMode);
  return (
    <Card
      className="flex flex-col items-center justify-center"
      style={{ borderColor: commit.team?.team_info.primary_color }}
    >
      {isEditMode && (
        <div className="flex justify-end border-b-[1px] w-full">
          <CommitCardEditModeOptions commit={commit} />
        </div>
      )}
      <CardHeader className="flex flex-row items-center self-start justify-between w-full py-1">
        <img
          src={TEAM_LOGOS_BASE_URL + commit.team?.team_info.logo_id + ".png"}
          className="object-scale-down w-16 h-16"
        />
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold">{commit.position}</span>
          <span className="text-xs italic ">{commit.year}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center w-full">
        <img
          src={COMMIT_PORTRAIT_BASE_URL + commit.portrait_id + ".png"}
          className="object-scale-down w-40 h-40 rounded-md border-[1px] bg-primary-foreground"
        />
      </CardContent>
      <CardFooter className="relative flex flex-row items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center">
          <p>{commit.first_name.toUpperCase()}</p>
          <p className="text-2xl font-semibold">
            {commit.last_name.toUpperCase()}
          </p>
          <CommitStarRating starRating={commit.star_rating} />
        </div>
        <span className="absolute italic bottom-4 left-4">
          #{commit.rank_national}
        </span>
        <img
          src={
            TEAM_LOGOS_HELMET_BASE_URL + commit.team?.team_info.logo_id + ".png"
          }
          className="absolute object-scale-down w-16 h-16 right-4"
        />
      </CardFooter>
    </Card>
  );
}
