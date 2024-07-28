import { Button } from "@/components/ui/button";
import { useParams } from "@tanstack/react-router";
import { GameDetailsUpsertHighlightsModal } from "./GameDetailsUpsertHighlightsModal";

export default function GameDetailsHighlights() {
  const { scheduleId } = useParams({
    from: "/leagues/$leagueSlug/gameDetails/$scheduleId",
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="w-full">
        <iframe
          className="w-full h-80"
          src="https://clips.twitch.tv/embed?clip=RichPerfectRaisinHassaanChop-KWduEdSWQygsIfGz&parent=cfbgamehub.netlify.app&parent=www.cfbgamehub.netlify.app"
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className="w-full">
        <iframe
          className="w-full h-80"
          src="https://www.youtube.com/embed/gCCErCKOjjA?si=b33P83yHeUaMDBYN"
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
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
