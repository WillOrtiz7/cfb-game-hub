import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TEAM_LOGOS_BASE_URL } from "../../schedules/constants/baseUrls";
import { Conference } from "../api/queries/useGetStandings";

interface StandingsTableProps {
  conference: Conference;
}

export function StandingsTable({ conference }: StandingsTableProps) {
  return (
    <div className="border-[1px] rounded-md">
      <div className="flex flex-row items-center gap-2 p-2">
        <p className="text-xl font-semibold">{conference.name}</p>
        <img
          src={conference.logo_url || ""}
          alt="Conference Logo"
          className="object-scale-down w-12 h-12"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Overall</TableHead>
            <TableHead>Conf</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conference.teams.map((team, index) => (
            <TableRow key={team.id} className="text-lg">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={TEAM_LOGOS_BASE_URL + team.team_info.logo_id + ".png"}
                    alt="Team Logo"
                    className="object-scale-down w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <span>{team.team_info.name_abbreviation}</span>
                    <span className="text-xs italic font-light">
                      {team.coach_name}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {team.standings.wins_total}-{team.standings.losses_total}
                {team.standings.ties_total
                  ? `-${team.standings.ties_total}`
                  : ""}
              </TableCell>
              <TableCell>
                {team.standings.wins_conf}-{team.standings.losses_conf}
                {team.standings.ties_conf ? `-${team.standings.ties_conf}` : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
