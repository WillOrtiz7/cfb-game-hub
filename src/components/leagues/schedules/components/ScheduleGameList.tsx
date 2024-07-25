import { useGetSchedules } from "../api/useGetSchedules";
import { ScheduleCard } from "./ScheduleCard";

export function ScheduleGameList() {
  const { data, isLoading, isError, error } = useGetSchedules();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    data && (
      <div>
        {data.map((schedule, index) => (
          <ScheduleCard key={index} />
        ))}
      </div>
    )
  );
}
