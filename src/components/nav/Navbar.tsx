import { useGetLeagueSlug } from "@/hooks/useGetLeagueSlug";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";

export function Navbar() {
  useGetLeagueSlug();
  const leagueSlug = useLeagueStore((state) => state.leagueSlug);

  return (
    <nav className="flex flex-row justify-between bg-primary-foreground items-center p-2 border-b-[1px]">
      <Link
        to="/leagues/$leagueSlug/schedules"
        params={{ leagueSlug: leagueSlug || "" }}
      >
        <h1 className="font-bold">CFB GameHub</h1>
      </Link>
      <ThemeToggle />
    </nav>
  );
}
