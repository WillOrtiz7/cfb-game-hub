import { ThemeToggle } from "../theme-toggle/ThemeToggle";

export function Navbar() {
  return (
    <nav className="flex flex-row justify-between bg-primary-foreground items-center p-2 border-b-[1px]">
      <h1 className="font-bold">CFB GameHub</h1>
      <ThemeToggle />
    </nav>
  );
}
