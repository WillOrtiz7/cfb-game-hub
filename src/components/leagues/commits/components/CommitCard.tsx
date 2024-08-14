import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  TEAM_LOGOS_BASE_URL,
  TEAM_LOGOS_HELMET_BASE_URL,
} from "../../schedules/constants/baseUrls";
import { GetCommitsResponse } from "../api/queries/useGetRecruits";
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
      {isEditMode && <CommitCardEditModeOptions commit={commit} />}
      <CardHeader className="flex flex-row self-start justify-between w-full pb-0">
        <img
          src={TEAM_LOGOS_BASE_URL + commit.team?.team_info.logo_id + ".png"}
          className="object-scale-down w-16 h-16"
        />
        <span className="text-xl font-semibold">{commit.position}</span>
      </CardHeader>
      <CardContent className="flex flex-col items-center w-full">
        <img
          src="https://zmkaoxtedbqmpsgercdu.supabase.co/storage/v1/object/public/commits/portraits/2.png"
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
