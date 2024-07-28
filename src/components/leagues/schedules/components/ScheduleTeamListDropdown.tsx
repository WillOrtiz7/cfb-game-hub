import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetTeams } from "../api/queries/useGetTeams";
import { TEAM_LOGOS_BASE_URL } from "../constants/baseUrls";

interface ScheduleTeamListDropdownProps {
  defaultValue: string;
  onValueChange: (value: string) => void;
}

export function ScheduleTeamListDropdown({
  defaultValue,
  onValueChange,
}: ScheduleTeamListDropdownProps) {
  const { data: teams, isLoading, isError, error } = useGetTeams();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    teams && (
      <Select onValueChange={onValueChange} defaultValue={defaultValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a team" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>User Teams</SelectLabel>
            {teams.userTeams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                <div className="flex flex-row gap-2">
                  <img
                    src={TEAM_LOGOS_BASE_URL + team.teams.logo_id + ".png"}
                    alt="Team Logo"
                    className="h-6 w-6 object-scale-down"
                  />
                  <p>
                    {team.teams.name_nick} ({team.coach_name})
                  </p>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>CPU Teams</SelectLabel>
            {teams.cpuTeams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                <div className="flex flex-row gap-2">
                  <img
                    src={TEAM_LOGOS_BASE_URL + team.teams.logo_id + ".png"}
                    alt="Team Logo"
                    className="h-6 w-6 object-scale-down"
                  />
                  <p>
                    {team.teams.name_nick} ({team.coach_name})
                  </p>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  );
}
