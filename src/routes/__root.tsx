import { Navbar } from "@/components/nav/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : React.lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    );

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <div className="flex flex-col p-4">
        <Outlet />
      </div>
      <Suspense fallback={<>Loading...</>}>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
