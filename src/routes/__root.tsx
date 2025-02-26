import { Navbar } from "@/components/nav/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { Toaster } from "sonner";

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
      <div className="flex flex-col">
        <Outlet />
      </div>
      <Suspense fallback={<>Loading...</>}>
        <TanStackRouterDevtools />
      </Suspense>
      <Toaster
        closeButton={true}
        richColors={true}
        position={
          window.matchMedia("(max-width: 768px)").matches
            ? "top-center"
            : "bottom-right"
        }
      />
    </>
  ),
});
