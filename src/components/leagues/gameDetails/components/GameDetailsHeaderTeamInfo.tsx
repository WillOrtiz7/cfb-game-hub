import {
  TEAM_LOGOS_BASE_URL,
  TEAM_LOGOS_HELMET_BASE_URL,
} from "../../schedules/constants/baseUrls";

interface GameDetailsHeaderTeamInfoProps {
  coachName: string | undefined;
  losses: number | undefined;
  mirrorTeamInfoOrder?: boolean;
  score: number | undefined;
  teamPrimaryColor: string | undefined;
  teamLogoId: number | undefined;
  teamNameNick: string | undefined;
  wins: number | undefined;
}

export function GameDetailsHeaderTeamInfo({
  coachName,
  losses,
  mirrorTeamInfoOrder,
  score,
  teamPrimaryColor,
  teamLogoId,
  teamNameNick,
  wins,
}: GameDetailsHeaderTeamInfoProps) {
  if (mirrorTeamInfoOrder) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-4xl font-bold">{score}</div>
        <div className="flex items-center justify-center">
          <img
            src={TEAM_LOGOS_BASE_URL + teamLogoId + ".png"}
            alt="Team Logo"
            className="object-scale-down w-12 h-12"
          />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold">{teamNameNick}</span>
          <span className="text-sm italic">{coachName}</span>
          <span className="text-sm">
            {wins} - {losses}
          </span>
        </div>
        <div
          className="flex items-center justify-center rounded-full h-28 w-28"
          style={{
            backgroundColor: teamPrimaryColor,
          }}
        >
          <img
            src={TEAM_LOGOS_HELMET_BASE_URL + teamLogoId + ".png"}
            alt="Team Helmet Logo"
            className="w-20 h-20"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center space-x-4">
      <div
        className="flex items-center justify-center rounded-full h-28 w-28"
        style={{
          backgroundColor: teamPrimaryColor,
        }}
      >
        <img
          src={TEAM_LOGOS_HELMET_BASE_URL + teamLogoId + ".png"}
          alt="Team Helmet Logo"
          className="w-20 h-20"
        />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-2xl font-bold">{teamNameNick}</span>
        <span className="text-sm italic">{coachName}</span>
        <span className="text-sm">
          {wins} - {losses}
        </span>
      </div>
      <div className="flex items-center justify-center">
        <img
          src={TEAM_LOGOS_BASE_URL + teamLogoId + ".png"}
          alt="Team Logo"
          className="object-scale-down w-12 h-12"
        />
      </div>
      <div className="text-4xl font-bold">{score}</div>
    </div>
  );
}
