import { useGetUser } from "@/hooks/useGetUser";
import { supabase } from "@/supabase/createClient";
import { useUserStore } from "@/zustand/useUserStore";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { Button } from "../ui/button";
import { UserDropdownMenu } from "./UserDropdownMenu";

export function Navbar() {
  useGetUser();
  const user = useUserStore((state) => state.user);

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
