import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useParams } from "@tanstack/react-router";
import { useGetGameDetailsHeader } from "../api/queries/useGetGameDetailsHeader";
import { GameDetailsHeaderTeamInfo } from "./GameDetailsHeaderTeamInfo";
import { GameDetailsHeaderTeamInfoMobile } from "./GameDetailsHeaderTeamInfoMobile";

export function GameDetailsHeader() {
  const { scheduleId } = useParams({
    from: "/leagues/$leagueSlug/gameDetails/$scheduleId",
  });

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    data: gameDetails,
    isLoading,
    isError,
    error,
  } = useGetGameDetailsHeader(scheduleId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    gameDetails && (
      <div className="border rounded-lg shadow-md p-4 md:p-6 lg:p-8">
        <p className="text-center font-semibold">
          {gameDetails.game_played ? "Final" : "Not Played"}
        </p>

        {isDesktop ? (
          <div className="flex flex-row justify-between items-center">
            <div className="flex-1 flex justify-center">
              <GameDetailsHeaderTeamInfo
                coachName={gameDetails.home_team.coach_name}
                losses={gameDetails.home_team.losses}
                score={gameDetails.home_team_score}
                teamPrimaryColor={gameDetails.home_team.team.primary_color}
                teamLogoId={gameDetails.home_team.team.logo_id}
                teamNameNick={gameDetails.home_team.team.name_nick}
                wins={gameDetails.home_team.wins}
              />
            </div>
            <div className="flex-1 flex justify-center">
              <GameDetailsHeaderTeamInfo
                coachName={gameDetails.away_team.coach_name}
                losses={gameDetails.away_team.losses}
                mirrorTeamInfoOrder={true}
                score={gameDetails.away_team_score}
                teamPrimaryColor={gameDetails.away_team.team.primary_color}
                teamLogoId={gameDetails.away_team.team.logo_id}
                teamNameNick={gameDetails.away_team.team.name_nick}
                wins={gameDetails.away_team.wins}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center w-full">
            <GameDetailsHeaderTeamInfoMobile
              coachName={gameDetails.home_team.coach_name}
              losses={gameDetails.home_team.losses}
              score={gameDetails.home_team_score}
              teamPrimaryColor={gameDetails.home_team.team.primary_color}
              teamLogoId={gameDetails.home_team.team.logo_id}
              teamNameNick={gameDetails.home_team.team.name_nick}
              wins={gameDetails.home_team.wins}
            />
            <GameDetailsHeaderTeamInfoMobile
              coachName={gameDetails.away_team.coach_name}
              losses={gameDetails.away_team.losses}
              score={gameDetails.away_team_score}
              teamPrimaryColor={gameDetails.away_team.team.primary_color}
              teamLogoId={gameDetails.away_team.team.logo_id}
              teamNameNick={gameDetails.away_team.team.name_nick}
              wins={gameDetails.away_team.wins}
            />
          </div>
        )}
      </div>
    )
  );
}
