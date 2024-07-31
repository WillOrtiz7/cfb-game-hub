import { LeagueNav } from "@/components/league-nav/LeagueNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/leagues")({
  component: () => (
    <div className="flex flex-row w-full gap-2">
      <LeagueNav />
      <div className="flex flex-col w-full p-4 pb-[76px] md:pb-4 border-l-[1px] min-h-screen">
        <Outlet />
      </div>
    </div>
  ),
});
