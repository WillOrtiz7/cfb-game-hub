import { Link, useParams } from "@tanstack/react-router";
import { GetSchedulesResponse } from "../api/queries/useGetSchedules";
import { TEAM_LOGOS_BASE_URL } from "../constants/baseUrls";
import { ScheduleCardHeader } from "./ScheduleCardHeader";

interface ScheduleCardProps {
  scheduleItem: GetSchedulesResponse[number];
  week: number;
  year: number;
}

export function ScheduleCard({ scheduleItem, week, year }: ScheduleCardProps) {
  const { leagueSlug } = useParams({ from: "/leagues/$leagueSlug/schedules" });

  return (
    <div className="bg-background shadow-md mt-4 border-[1px] border-secondary-foreground rounded-md">
      <ScheduleCardHeader scheduleItem={scheduleItem} week={week} year={year} />
      <Link
        to={"/leagues/$leagueSlug/gameDetails/$scheduleId"}
        params={{ leagueSlug: leagueSlug, scheduleId: scheduleItem.id }}
      >
        <div
          className="flex items-center justify-between p-2 border-t-[1px] border-secondary-foreground"
          style={{
            backgroundColor: scheduleItem?.home_team?.team?.primary_color,
          }}
        >
          <div className="flex items-center space-x-4">
            <img
              src={
                TEAM_LOGOS_BASE_URL +
                scheduleItem.home_team?.team.logo_id +
                ".png"
              }
              alt="Home Team Logo"
              className="object-scale-down w-10 h-10"
            />
            <div>
              <div className="flex flex-row items-center gap-2">
                <h3 className="text-lg font-semibold">
                  {scheduleItem.home_team?.team.name_nick}
                </h3>
                <p className="text-sm italic font-light">
                  {scheduleItem.home_team?.coach_name}
                </p>
              </div>
              <p className="text-sm italic">
                {scheduleItem.home_team?.standings[0]?.wins_total} -{" "}
                {scheduleItem.home_team?.standings[0]?.losses_total}
              </p>
            </div>
          </div>
          <div className="text-2xl font-bold">
            {scheduleItem.home_team_score}
          </div>
        </div>
        <hr className="border-secondary-foreground" />
        <div
          className="flex items-center justify-between p-2 rounded-b-md"
          style={{
            backgroundColor: scheduleItem.away_team?.team.primary_color,
          }}
        >
          <div className="flex items-center space-x-4">
            <img
              src={
                TEAM_LOGOS_BASE_URL +
                scheduleItem.away_team?.team.logo_id +
                ".png"
              }
              alt="Away Team Logo"
              className="object-scale-down w-10 h-10"
            />
            <div>
              <div className="flex flex-row items-center gap-2">
                <h3 className="text-lg font-semibold">
                  {scheduleItem.away_team?.team.name_nick}
                </h3>
                <p className="text-sm italic font-light">
                  {scheduleItem.away_team?.coach_name}
                </p>
              </div>
              <p className="text-sm italic">
                {scheduleItem.away_team?.standings[0]?.wins_total} -{" "}
                {scheduleItem.away_team?.standings[0]?.losses_total}
              </p>
            </div>
          </div>
          <div className="text-2xl font-bold">
            {scheduleItem.away_team_score}
          </div>
        </div>
      </Link>
    </div>
  );
}
