import { useEffect, useState } from "react";
import { useGetCurrentYearWeek } from "./api/useGetCurrentYearWeek";
import { ScheduleAddGameModal } from "./components/ScheduleAddGameModal";
import { ScheduleGameList } from "./components/ScheduleGameList";
import { ScheduleHeader } from "./components/ScheduleHeader";
import { ScheduleWeekSelector } from "./components/ScheduleWeekSelector";

export function SchedulesMain() {
  const [year, setYear] = useState(2024);
  const [week, setWeek] = useState(0);

  const { data, isLoading, isError, error } = useGetCurrentYearWeek();

  useEffect(() => {
    if (data) {
      setYear(data[0].year!);
      setWeek(data[0].week!);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <ScheduleHeader week={week} year={year} />
        <ScheduleWeekSelector
          setWeek={setWeek}
          setYear={setYear}
          week={week}
          year={year}
        />
      </div>
      <ScheduleGameList week={week} year={year} />
      <ScheduleAddGameModal />
    </div>
  );
}
