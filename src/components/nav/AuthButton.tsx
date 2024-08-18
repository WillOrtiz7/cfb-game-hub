import { useGetUser } from "@/hooks/useGetUser";
import { supabase } from "@/supabase/createClient";
import { useUserStore } from "@/zustand/useUserStore";
import { Button } from "../ui/button";
import { UserDropdownMenu } from "./UserDropdownMenu";

export function AuthButton() {
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

  return user ? (
    <UserDropdownMenu user={user} />
  ) : (
    <Button onClick={handleSignIn}>Sign in</Button>
  );
}
