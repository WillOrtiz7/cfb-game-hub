import { useGetUser } from "@/hooks/useGetUser";
import { supabase } from "@/supabase/createClient";
import { useLeagueStore } from "@/zustand/useLeagueStore";
import { useUserStore } from "@/zustand/useUserStore";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { LEAGUE_MAIN_LOGOS_BASE_URL } from "../leagues/schedules/constants/baseUrls";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { Button } from "../ui/button";
import { UserDropdownMenu } from "./UserDropdownMenu";

export function Navbar() {
  useGetUser();
  const user = useUserStore((state) => state.user);
  const leagueId = useLeagueStore((state) => state.leagueId);
  const [imgError, setImgError] = useState(false);

  async function handleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: window.location.href,
      },
    });
  }

  return (
    <nav className="flex flex-row justify-between bg-primary-foreground items-center p-2 border-b-[1px]">
      <Link to="/">
        <h1 className="font-bold">CFB GameHub</h1>
      </Link>

      <div className="flex flex-row items-center gap-2">
        {leagueId && !imgError && (
          <img
            src={`${LEAGUE_MAIN_LOGOS_BASE_URL}${leagueId}.png`}
            className="w-12 h-10 mr-2 object-fit"
            onError={() => setImgError(true)}
          />
        )}

        <ThemeToggle />
        {user ? (
          <UserDropdownMenu user={user} />
        ) : (
          <Button onClick={handleSignIn}>Sign in</Button>
        )}
      </div>
    </nav>
  );
}
