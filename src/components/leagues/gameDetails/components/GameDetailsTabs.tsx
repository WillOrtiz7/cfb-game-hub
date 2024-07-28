import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function GameDetailsTabs() {
  return (
    <Tabs defaultValue="overview" className="w-[400px]">
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
        <h1>highlights</h1>
      </TabsContent>
    </Tabs>
  );
}
