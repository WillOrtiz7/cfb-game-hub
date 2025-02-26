import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { AuthButton } from "./AuthButton";
import { LeagueLogo } from "./LeagueLogo";

export function Navbar() {
  return (
    <nav className="flex flex-row justify-between bg-primary-foreground items-center p-2 border-b-[1px]">
      <Link to="/">
        <h1 className="font-bold">CFB GameHub</h1>
      </Link>
      <div className="flex flex-row items-center gap-2">
        <LeagueLogo />
        <ThemeToggle />
        <AuthButton />
      </div>
    </nav>
  );
}
