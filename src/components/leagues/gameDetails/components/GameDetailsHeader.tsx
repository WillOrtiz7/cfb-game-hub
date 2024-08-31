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
      <div className="p-4 border rounded-lg shadow-md md:p-6 lg:p-8">
        <p className="font-semibold text-center">
          {gameDetails.game_played ? "Final" : "Not Played"}
        </p>

        {isDesktop ? (
          <div className="flex flex-row items-center justify-between">
            <div className="flex justify-center flex-1">
              <GameDetailsHeaderTeamInfo
                coachName={gameDetails.home_team?.coach_name}
                losses={gameDetails.home_team?.standings[0].losses_total}
                score={gameDetails.home_team_score}
                teamPrimaryColor={gameDetails.home_team?.team.primary_color}
                teamLogoId={gameDetails.home_team?.team.logo_id}
                teamNameNick={gameDetails.home_team?.team.name_nick}
                wins={gameDetails.home_team?.standings[0].wins_total}
              />
            </div>
            <div className="flex justify-center flex-1">
              <GameDetailsHeaderTeamInfo
                coachName={gameDetails.away_team?.coach_name}
                losses={gameDetails.away_team?.losses}
                mirrorTeamInfoOrder={true}
                score={gameDetails.away_team_score}
                teamPrimaryColor={gameDetails.away_team?.team.primary_color}
                teamLogoId={gameDetails.away_team?.team.logo_id}
                teamNameNick={gameDetails.away_team?.team.name_nick}
                wins={gameDetails.away_team?.standings[0].wins_total}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full gap-4">
            <GameDetailsHeaderTeamInfoMobile
              coachName={gameDetails.home_team?.coach_name}
              losses={gameDetails.home_team?.standings[0].losses_total}
              score={gameDetails.home_team_score}
              teamPrimaryColor={gameDetails.home_team?.team.primary_color}
              teamLogoId={gameDetails.home_team?.team.logo_id}
              teamNameAbbreviation={
                gameDetails.home_team?.team.name_abbreviation
              }
              wins={gameDetails.home_team?.standings[0].wins_total}
            />
            <GameDetailsHeaderTeamInfoMobile
              coachName={gameDetails.away_team?.coach_name}
              losses={gameDetails.away_team?.standings[0].losses_total}
              score={gameDetails.away_team_score}
              teamPrimaryColor={gameDetails.away_team?.team.primary_color}
              teamLogoId={gameDetails.away_team?.team.logo_id}
              teamNameAbbreviation={
                gameDetails.away_team?.team.name_abbreviation
              }
              wins={gameDetails.home_team?.standings[0].wins_total}
            />
          </div>
        )}
      </div>
    )
  );
}
