import { Button } from "@/components/ui/button";
import { useParams } from "@tanstack/react-router";
import { useGetHighlights } from "../api/queries/useGetHighlights";
import { GameDetailsUpsertHighlightsModal } from "./GameDetailsUpsertHighlightsModal";

export default function GameDetailsHighlights() {
  const { scheduleId } = useParams({
    from: "/leagues/$leagueSlug/gameDetails/$scheduleId",
  });

  const {
    data: highlights,
    isLoading,
    isError,
    error,
  } = useGetHighlights(scheduleId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <h3 className="text-2xl font-semibold">Highlights</h3>
      {highlights && highlights.length > 0 ? (
        highlights.map((highlight) => (
          <div className="w-full" key={highlight.id}>
            <iframe
              className="w-full h-80"
              src={highlight.url}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        ))
      ) : (
        <p>No highlights</p>
      )}

      <GameDetailsUpsertHighlightsModal
        description="Add an iframe URL from YouTube or Twich"
        requestType="POST"
        scheduleId={scheduleId}
        title="Add a Highlight"
        triggerButton={
          <Button variant="outline" className="w-full md:w-fit">
            Add a Highlight
          </Button>
        }
      />
    </div>
  );
}
