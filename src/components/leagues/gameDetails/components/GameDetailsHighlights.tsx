import { Button } from "@/components/ui/button";
import { useParams } from "@tanstack/react-router";
import { Upload } from "lucide-react";
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
    <div className="flex flex-col gap-2 my-4">
      <h3 className="text-2xl font-semibold">Highlights</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {highlights && highlights.length > 0 ? (
          highlights.map((highlight) => (
            <div className="w-full" key={highlight.id}>
              <h4 className="font-semibold">{highlight.title}</h4>
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
      </div>
      <GameDetailsUpsertHighlightsModal
        description="Paste the URL of the highlight video (Twitch clips only for now)"
        requestType="POST"
        scheduleId={scheduleId}
        title="Add a Highlight"
        triggerButton={
          <Button className="items-center self-end justify-center w-full md:w-fit">
            <span>Add a Highlight</span> <Upload className="w-4 h-4 ml-2" />
          </Button>
        }
      />
    </div>
  );
}
