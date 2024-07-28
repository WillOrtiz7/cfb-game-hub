import { ScheduleItem } from "../api/queries/useGetSchedules";
import { TEAM_LOGOS_BASE_URL } from "../constants/baseUrls";
import { ScheduleCardHeader } from "./ScheduleCardHeader";

interface ScheduleCardProps {
  scheduleItem: ScheduleItem;
}

export function ScheduleCard({ scheduleItem }: ScheduleCardProps) {
  return (
    <div className="bg-background shadow-md mt-4 border-[1px] border-secondary-foreground rounded-md">
      <ScheduleCardHeader scheduleItem={scheduleItem} />
      <div
        className="flex items-center justify-between p-2 border-t-[1px] border-secondary-foreground"
        style={{ backgroundColor: scheduleItem.home_team.team.primary_color }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={
              TEAM_LOGOS_BASE_URL + scheduleItem.home_team.team.logo_id + ".png"
            }
            alt="Home Team Logo"
            className="h-10 w-10 object-scale-down"
          />
          <div>
            <div className="flex flex-row gap-2 items-center">
              <h3 className="text-lg font-semibold">
                {scheduleItem.home_team.team.name_nick}
              </h3>
              <p className="text-sm font-light italic">
                ({scheduleItem.home_team.coach_name})
              </p>
            </div>
            <p className="text-muted-foreground text-sm">
              {scheduleItem.home_team.wins} - {scheduleItem.home_team.losses}
            </p>
          </div>
        </div>
        <div className="text-2xl font-bold">{scheduleItem.home_team_score}</div>
      </div>
      <hr className="border-secondary-foreground" />
      <div
        className="flex items-center justify-between p-2 rounded-b-md"
        style={{ backgroundColor: scheduleItem.away_team.team.primary_color }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={
              TEAM_LOGOS_BASE_URL + scheduleItem.away_team.team.logo_id + ".png"
            }
            alt="Away Team Logo"
            className="h-10 w-10 object-scale-down"
          />
          <div>
            <div className="flex flex-row gap-2 items-center">
              <h3 className="text-lg font-semibold">
                {scheduleItem.away_team.team.name_nick}
              </h3>
              <p className="text-sm font-light italic">
                ({scheduleItem.away_team.coach_name})
              </p>
            </div>
            <p className="text-muted-foreground text-sm">
              {scheduleItem.away_team.wins} - {scheduleItem.away_team.losses}
            </p>
          </div>
        </div>
        <div className="text-2xl font-bold">{scheduleItem.away_team_score}</div>
      </div>
    </div>
  );
}
