import { PositionListDropdown } from "@/components/shared/PositionListDropdown";
import { TeamListDropdown } from "@/components/shared/TeamListDropdown";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useCommitStore } from "../store/useCommitStore";
import { CommitStarRatingDropdown } from "./CommitStarRatingDropdown";

export function CommitFilter() {
  const year = useCommitStore((state) => state.filterYear);
  const setYear = useCommitStore((state) => state.setFilterYear);
  const teamId = useCommitStore((state) => state.filterTeamId);
  const setTeamId = useCommitStore((state) => state.setFilterTeamId);
  const position = useCommitStore((state) => state.filterPosition);
  const setPosition = useCommitStore((state) => state.setFilterPosition);
  const minStars = useCommitStore((state) => state.filterMinStars);
  const setMinStars = useCommitStore((state) => state.setFilterMinStars);
  const maxStars = useCommitStore((state) => state.filterMaxStars);
  const setMaxStars = useCommitStore((state) => state.setFilterMaxStars);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filter</h4>
            <p className="text-sm text-muted-foreground">
              Select attributes to filter commits by.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="year">Year</Label>
              <Select onValueChange={(value) => setYear(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={year ? year.toString() : "Select a year"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="team">Team</Label>
              <TeamListDropdown
                setNewValue={setTeamId}
                defaultValue={teamId}
                showAllTeamsOption={true}
                triggerWidth={180}
              />
            </div>
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="position">Position</Label>
              <PositionListDropdown
                setValue={setPosition}
                value={position}
                showAllPositionsOption={true}
                triggerWidth={180}
              />
            </div>
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="minStars">Min Stars</Label>
              <CommitStarRatingDropdown
                value={minStars}
                setValue={setMinStars}
                triggerWidth={180}
              />
            </div>
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="maxStars">Max Stars</Label>
              <CommitStarRatingDropdown
                value={maxStars}
                setValue={setMaxStars}
                triggerWidth={180}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
