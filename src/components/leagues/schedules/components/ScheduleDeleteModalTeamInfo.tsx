import { TEAM_LOGOS_BASE_URL } from "../constants/baseUrls";

interface ScheduleDeleteModalTeamInfoProps {
  coachName: string;
  teamLogoId: number;
  teamName: string;
  teamScore: number;
}

export function ScheduleDeleteModalTeamInfo({
  coachName,
  teamLogoId,
  teamName,
  teamScore,
}: ScheduleDeleteModalTeamInfoProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-2 items-center">
        <img
          src={TEAM_LOGOS_BASE_URL + teamLogoId + ".png"}
          alt="Away Team Logo"
          className="h-6 w-6 object-scale-down"
        />
        <p>{teamName}</p>
        <p>{teamScore}</p>
      </div>
      <p className="text-muted-foreground text-sm">({coachName})</p>
    </div>
  );
}
