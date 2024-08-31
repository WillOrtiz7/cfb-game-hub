import {
  TEAM_LOGOS_BASE_URL,
  TEAM_LOGOS_HELMET_BASE_URL,
} from "../../schedules/constants/baseUrls";

interface GameDetailsHeaderTeamInfoMobileProps {
  coachName: string | undefined;
  losses: number | undefined;
  score: number | undefined;
  teamPrimaryColor: string | undefined;
  teamLogoId: number | undefined;
  teamNameAbbreviation: string | undefined;
  wins: number | undefined;
}

export function GameDetailsHeaderTeamInfoMobile({
  coachName,
  losses,
  score,
  teamPrimaryColor,
  teamLogoId,
  teamNameAbbreviation,
  wins,
}: GameDetailsHeaderTeamInfoMobileProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div
        className="flex items-center justify-center w-24 h-24 rounded-full"
        style={{
          backgroundColor: teamPrimaryColor,
        }}
      >
        <img
          src={TEAM_LOGOS_HELMET_BASE_URL + teamLogoId + ".png"}
          alt="Team Helmet Logo"
          className="w-16 h-16"
        />
      </div>
      <div className="flex flex-col items-start flex-grow mx-4">
        <span className="text-xl font-bold">{teamNameAbbreviation}</span>
        <span className="text-sm italic">{coachName}</span>
        <span className="text-sm">
          {wins} - {losses}
        </span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12">
          <img
            src={TEAM_LOGOS_BASE_URL + teamLogoId + ".png"}
            alt="Away Team Logo"
            className="object-scale-down w-12 h-12"
          />
        </div>
        <div className="text-2xl font-bold">{score}</div>
      </div>
    </div>
  );
}
