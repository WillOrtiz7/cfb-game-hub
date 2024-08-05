import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetRecruitsResponse } from "../api/queries/useGetRecruits";

interface RecruitsTableProps {
  recruits: GetRecruitsResponse[];
}

export function RecruitsTable({ recruits }: RecruitsTableProps) {
  return (
    <div className="border-[1px] rounded-md">
      <div className="flex flex-row items-center gap-2 p-2">
        <p className="text-xl font-semibold">Blah</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Star</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recruits.map((recruit, index) => (
            <TableRow key={recruit.id} className="text-lg">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                <span>
                  {recruit.first_name.charAt(0)}. {recruit.last_name}
                </span>
              </TableCell>
              <TableCell>{recruit.position}</TableCell>
              <TableCell>{recruit.star_rating}</TableCell>
              <TableCell>
                {recruit.team_id ? "Committed" : "Not Committed"}
              </TableCell>
              <TableCell>
                {recruit.team_id ? "Committed" : "Not Committed"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
