import { CommitsBody } from "./components/CommitsBody";
import { CommitsHeader } from "./components/CommitsHeader";

export function CommitsMain() {
  return (
    <div className="flex flex-col gap-4">
      <CommitsHeader />
      <CommitsBody />
    </div>
  );
}
