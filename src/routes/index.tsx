import { useLeagueStore } from "@/zustand/useLeagueStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RootMain,
});

function RootMain() {
  const setLeagueId = useLeagueStore((state) => state.setLeagueId);

  useEffect(() => {
    setLeagueId(undefined);
  }, [setLeagueId]);

  return <div className="flex flex-col">In Progress</div>;
}
