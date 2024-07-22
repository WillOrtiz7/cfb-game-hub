import { useGetRecruits } from "@/components/leagues/recruits/api/useGetRecruits";

export function RecruitsMain() {
  const { data, isLoading } = useGetRecruits();
  return (
    <div>
      <h1>Recruits</h1>
      {isLoading && <div>Loading...</div>}
      {data && (
        <ul>
          {data.map((recruit) => (
            <li key={recruit.id}>{recruit.first_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
