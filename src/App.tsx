import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabase/createClient";

interface Recruit {
  id: string;
  first_name: string;
  last_name: string;
}

function App() {
  const [recruits, setRecruits] = useState<Array<Recruit> | null>(null);
  useEffect(() => {
    getRecruits();
  }, []);
  async function getRecruits() {
    const { data } = await supabase.from("recruits").select();
    setRecruits(data);
  }
  return (
    <>
      <h1>Supabase test</h1>
      <ul>
        {recruits?.map((recruit) => (
          <li key={recruit.id}>
            {recruit.first_name} {recruit.last_name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
