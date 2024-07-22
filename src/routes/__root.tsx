import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col">
        <h1>Hello World</h1>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
