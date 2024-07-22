import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="flex flex-col">
      Root route
      <Link to="/leagues/$leagueSlug/recruits" params={{ leagueSlug: "b2s" }}>
        Go to Back2School
      </Link>
    </div>
  ),
});
