import { RecruitsBody } from "./components/RecruitsBody";
import { RecruitsHeader } from "./components/RecruitsHeader";

export function RecruitsMain() {
  return (
    <div className="flex flex-col gap-4">
      <RecruitsHeader />
      <RecruitsBody />
    </div>
  );
}
