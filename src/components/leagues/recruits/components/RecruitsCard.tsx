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
import { GetRecruitsResponse } from "../api/queries/useGetRecruits";
import { RecruitStarRating } from "./RecruitStarRating";

interface RecruitsCardProps {
  recruit: GetRecruitsResponse;
}

export function RecruitsCard({ recruit }: RecruitsCardProps) {
  return (
    <Card
      className="flex flex-col items-center justify-center"
      style={{ borderColor: recruit.team?.team_info.primary_color }}
    >
      <CardHeader className="flex flex-row self-start justify-between w-full pb-0">
        <img
          src={TEAM_LOGOS_BASE_URL + recruit.team?.team_info.logo_id + ".png"}
          className="object-scale-down w-16 h-16"
        />
        <span className="text-xl font-semibold">{recruit.position}</span>
      </CardHeader>
      <CardContent className="flex flex-col items-center w-full">
        <img
          src="https://zmkaoxtedbqmpsgercdu.supabase.co/storage/v1/object/public/commits/portraits/1.png"
          className="object-scale-down w-40 h-40 rounded-md border-[1px] bg-primary-foreground"
        />
      </CardContent>
      <CardFooter className="relative flex flex-row items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center">
          <p>{recruit.first_name.toUpperCase()}</p>
          <p className="text-2xl font-semibold">
            {recruit.last_name.toUpperCase()}
          </p>
          <RecruitStarRating starRating={recruit.star_rating} />
        </div>

        <img
          src={
            TEAM_LOGOS_HELMET_BASE_URL +
            recruit.team?.team_info.logo_id +
            ".png"
          }
          className="absolute object-scale-down w-16 h-16 right-4"
        />
      </CardFooter>
    </Card>
  );
}
