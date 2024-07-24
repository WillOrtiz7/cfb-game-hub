import { ThemeToggle } from "@/components/theme-toggle/ThemeToggle";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeToggle />
      <div className="flex flex-col">
        <h1>CFB Game Hub</h1>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
