import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notFound")({
  component: () => <div>404 Page not found</div>,
});
