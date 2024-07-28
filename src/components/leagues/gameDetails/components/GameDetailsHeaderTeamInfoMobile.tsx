import {
  TEAM_LOGOS_BASE_URL,
  TEAM_LOGOS_HELMET_BASE_URL,
} from "../../schedules/constants/baseUrls";

interface GameDetailsHeaderTeamInfoMobileProps {
  coachName: string;
  losses: number;
  score: number;
  teamPrimaryColor: string;
  teamLogoId: number;
  teamNameAbbreviation: string;
  wins: number;
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
        className="flex items-center justify-center rounded-full h-24 w-24"
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
      <div className="flex flex-row gap-4 items-center">
        <div className="flex items-center justify-center w-12 h-12">
          <img
            src={TEAM_LOGOS_BASE_URL + teamLogoId + ".png"}
            alt="Away Team Logo"
            className="w-12 h-12 object-scale-down"
          />
        </div>
        <div className="text-2xl font-bold">{score}</div>
      </div>
    </div>
  );
}
