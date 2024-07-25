import { useGetSchedules } from "./api/useGetSchedules";
import { ScheduleHeader } from "./components/ScheduleHeader";

export function SchedulesMain() {
  const { data, isLoading, isError, error } = useGetSchedules();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <ScheduleHeader />

      {data && (
        <>
          {data.map((schedule, index) => (
            <div key={index}>
              <p>Home Score: {schedule.home_team_score}</p>
              <p>Away Score: {schedule.away_team_score}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
