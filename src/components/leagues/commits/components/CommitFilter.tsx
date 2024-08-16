import { PositionListDropdown } from "@/components/shared/PositionListDropdown";
import { TeamListDropdown } from "@/components/shared/TeamListDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export function CommitFilter() {
  const year = useCommitStore((state) => state.filterYear);
  const setYear = useCommitStore((state) => state.setFilterYear);
  const teamId = useCommitStore((state) => state.filterTeamId);
  const setTeamId = useCommitStore((state) => state.setFilterTeamId);
  const position = useCommitStore((state) => state.filterPosition);
  const setPosition = useCommitStore((state) => state.setFilterPosition);

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
                triggerWidth={180}
              />
            </div>
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="position">Position</Label>
              <PositionListDropdown
                setValue={setPosition}
                value={position}
                triggerWidth={180}
              />
            </div>
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="minStars">Min Stars</Label>
              <Input
                id="minStars"
                defaultValue="25px"
                className="h-8 col-span-2"
              />
            </div>
            <div className="grid items-center grid-cols-3 gap-4">
              <Label htmlFor="maxStars">Max Stars</Label>
              <Input
                id="maxStars"
                defaultValue="none"
                className="h-8 col-span-2"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
