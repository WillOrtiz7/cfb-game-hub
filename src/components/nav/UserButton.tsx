import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserButtonProps {
  user: User;
}

export function UserButton({ user }: UserButtonProps) {
  return (
    <Avatar className="transition-transform transform cursor-pointer hover:ring-2 hover:ring-blue-500">
      <AvatarImage src={user.user_metadata.avatar_url} alt="avatar" />
      <AvatarFallback>User Avatar</AvatarFallback>
    </Avatar>
  );
}
