export default function GameDetailsHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="w-full">
        <iframe
          className="w-full h-80"
          src="https://clips.twitch.tv/embed?clip=RichPerfectRaisinHassaanChop-KWduEdSWQygsIfGz&parent=www.example.com"
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
    </div>
  );
}
