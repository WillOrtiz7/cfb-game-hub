import { ScheduleGameList } from "./components/ScheduleGameList";
import { ScheduleHeader } from "./components/ScheduleHeader";

export function SchedulesMain() {
  return (
    <div>
      <ScheduleHeader />
      <ScheduleGameList />
    </div>
  );
}
