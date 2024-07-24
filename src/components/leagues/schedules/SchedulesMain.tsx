import { useGetSchedules } from "./api/useGetSchedules";

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
      <h1>Schedule Page</h1>
      {data && (
        <>
          <h2>
            {data[0].year} Week {data[0].week}
          </h2>
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
