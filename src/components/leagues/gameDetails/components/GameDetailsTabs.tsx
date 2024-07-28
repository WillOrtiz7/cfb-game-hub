import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameDetailsHighlights from "./GameDetailsHighlights";

export function GameDetailsTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="team-stats">Team Stats</TabsTrigger>
        <TabsTrigger value="highlights">Highlights</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <h1>overview</h1>
      </TabsContent>
      <TabsContent value="team-stats">
        <h1>team stats</h1>
      </TabsContent>
      <TabsContent value="highlights">
        <GameDetailsHighlights />
      </TabsContent>
    </Tabs>
  );
}
