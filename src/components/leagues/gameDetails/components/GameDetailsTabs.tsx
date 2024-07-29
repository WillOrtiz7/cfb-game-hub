import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameDetailsHighlights from "./GameDetailsHighlights";
import { GameDetailsTeamStats } from "./GameDetailsTeamStats";

export function GameDetailsTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="team-stats">Team Stats</TabsTrigger>
        <TabsTrigger value="highlights">Highlights</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <GameDetailsHighlights />
        <GameDetailsTeamStats />
      </TabsContent>
      <TabsContent value="team-stats">
        <GameDetailsTeamStats />
      </TabsContent>
      <TabsContent value="highlights">
        <GameDetailsHighlights />
      </TabsContent>
    </Tabs>
  );
}
