import { useGetSchedules } from "../api/useGetSchedules";
import { ScheduleCard } from "./ScheduleCard";

export function ScheduleGameList() {
  const {
    data: scheduleItemList,
    isLoading,
    isError,
    error,
  } = useGetSchedules();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    scheduleItemList && (
      <div>
        {scheduleItemList.map((scheduleItem, index) => (
          <ScheduleCard key={index} scheduleItem={scheduleItem} />
        ))}
      </div>
    )
  );
}
