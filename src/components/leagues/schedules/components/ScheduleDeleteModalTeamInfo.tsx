import { TEAM_LOGOS_BASE_URL } from "../constants/baseUrls";

interface ScheduleDeleteModalTeamInfoProps {
  coachName: string | undefined;
  teamLogoId: number | undefined;
  teamName: string | undefined;
  teamScore: number | undefined;
}

export function ScheduleDeleteModalTeamInfo({
  coachName,
  teamLogoId,
  teamName,
  teamScore,
}: ScheduleDeleteModalTeamInfoProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center gap-2">
        <img
          src={TEAM_LOGOS_BASE_URL + teamLogoId + ".png"}
          alt="Away Team Logo"
          className="object-scale-down w-6 h-6"
        />
        <p>{teamName}</p>
        <p>{teamScore}</p>
      </div>
      <p className="text-sm text-muted-foreground">({coachName})</p>
    </div>
  );
}
