import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">Hello world</div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
