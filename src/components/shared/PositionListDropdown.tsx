import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/db/types";

interface CommitPositionsDropdownProps {
  setValue: (value: Database["public"]["Enums"]["commit_position"]) => void;
  value: Database["public"]["Enums"]["commit_position"] | undefined;
  showAllPositionsOption?: boolean;
  triggerWidth?: number;
}

export function PositionListDropdown({
  setValue,
  value,
  showAllPositionsOption,
  triggerWidth,
}: CommitPositionsDropdownProps) {
  return (
    <Select
      onValueChange={(value) =>
        setValue(value as Database["public"]["Enums"]["commit_position"])
      }
      defaultValue={value}
    >
      <SelectTrigger style={{ width: triggerWidth }}>
        <SelectValue placeholder="Select a position" />
      </SelectTrigger>

      <SelectContent>
        {showAllPositionsOption && (
          <SelectItem value="ALL">All positions</SelectItem>
        )}
        <SelectItem value="ATH">ATH</SelectItem>
        <SelectItem value="QB">QB</SelectItem>
        <SelectItem value="HB">HB</SelectItem>
        <SelectItem value="WR">WR</SelectItem>
        <SelectItem value="TE">TE</SelectItem>
        <SelectItem value="OT">OT</SelectItem>
        <SelectItem value="OG">OG</SelectItem>
        <SelectItem value="DE">DE</SelectItem>
        <SelectItem value="DT">DT</SelectItem>
        <SelectItem value="OLB">OLB</SelectItem>
        <SelectItem value="MLB">MLB</SelectItem>
        <SelectItem value="CB">CB</SelectItem>
        <SelectItem value="FS">FS</SelectItem>
        <SelectItem value="SS">SS</SelectItem>
        <SelectItem value="K">K</SelectItem>
        <SelectItem value="P">P</SelectItem>
      </SelectContent>
    </Select>
  );
}
