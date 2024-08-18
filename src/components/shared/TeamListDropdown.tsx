import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useInitializeLeagueId,
  useLeagueStore,
} from "@/zustand/useLeagueStore";
import { useGetTeams } from "../leagues/schedules/api/queries/useGetTeams";
import { TEAM_LOGOS_BASE_URL } from "../leagues/schedules/constants/baseUrls";

interface TeamListDropdownProps {
  defaultValue: string | undefined;
  setNewValue: (value: string) => void;
  showAllTeamsOption?: boolean;
  triggerWidth?: number;
}

export function TeamListDropdown({
  showAllTeamsOption,
  defaultValue,
  setNewValue,
  triggerWidth,
}: TeamListDropdownProps) {
  useInitializeLeagueId();
  const leagueId = useLeagueStore((state) => state.leagueId);

  const { data: teams, isLoading, isError, error } = useGetTeams(leagueId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    teams && (
      <Select
        onValueChange={(value) => setNewValue(value)}
        value={defaultValue}
      >
        <SelectTrigger style={{ width: triggerWidth }}>
          <SelectValue placeholder="Select a team" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>User Teams</SelectLabel>
            {showAllTeamsOption && (
              <SelectItem value="ALL">All teams</SelectItem>
            )}
            {teams.userTeams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                <div className="flex flex-row gap-2">
                  <img
                    src={TEAM_LOGOS_BASE_URL + team.teams.logo_id + ".png"}
                    alt="Team Logo"
                    className="object-scale-down w-6 h-6"
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
                    className="object-scale-down w-6 h-6"
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
