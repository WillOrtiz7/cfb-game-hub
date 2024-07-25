import { useGetCurrentYearWeek } from "@/components/leagues/schedules/api/useGetCurrentYearWeek";

export function ScheduleHeader() {
  const { data, isLoading, isError, error } = useGetCurrentYearWeek();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  console.log(data);
  return (
    data && (
      <div>
        <h1 className="font-semibold text-2xl">Schedule</h1>
        <h2>
          {data[0].year} Week {data[0].week}
        </h2>
      </div>
    )
  );
}
