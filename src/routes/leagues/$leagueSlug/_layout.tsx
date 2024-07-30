import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/leagues/$leagueSlug/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <h1>League Layout</h1>
    </div>
  );
}
