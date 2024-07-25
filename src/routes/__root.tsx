import { Navbar } from "@/components/nav/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <div className="flex flex-col p-4">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
