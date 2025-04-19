import { useState } from "react";
import { CompassIcon, LeafIcon, SparklesIcon } from "lucide-react";
import { TrendingCarousel } from "./TrendingCarousel";
import { OutfitInspirationCards } from "./OutfitInspirationCards";
import { MoodFilters } from "./MoodFilters";
import { RegionSelector } from "./RegionSelector";
import { SustainableSpotlight } from "./SustainableSpotlight";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DiscoverTab = "trending" | "outfits" | "sustainable";

export function DiscoverPanel() {
  const [activeTab, setActiveTab] = useState<DiscoverTab>("trending");
  const [selectedMood, setSelectedMood] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("Global");

  return (
    <div className="hidden lg:flex lg:w-1/3 flex-col h-full bg-background overflow-hidden">
      <div className="bg-gradient-to-r from-purple-900/40 to-background p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold flex items-center">
          <CompassIcon className="h-5 w-5 text-primary/80 mr-2" />
          Discover Fashion
        </h2>
      </div>

      <div className="px-4 pt-4">
        <div className="flex justify-between mb-4">
          <MoodFilters selectedMood={selectedMood} onSelectMood={setSelectedMood} />
          <RegionSelector selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 bg-gradient-to-b from-background to-background/50 space-y-4 scrollbar-hide">
        <Tabs defaultValue="trending" className="w-full" onValueChange={(value) => setActiveTab(value as DiscoverTab)}>
          <TabsList className="w-full bg-muted/80 border border-purple-900/20 mb-4">
            <TabsTrigger value="trending" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/40 data-[state=active]:to-purple-800/40">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="outfits" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/40 data-[state=active]:to-purple-800/40">
              Outfits
            </TabsTrigger>
            <TabsTrigger value="sustainable" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/40 data-[state=active]:to-purple-800/40">
              <LeafIcon className="h-4 w-4 mr-2" />
              Sustainable
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-0">
            <TrendingCarousel region={selectedRegion} mood={selectedMood} />
          </TabsContent>
          
          <TabsContent value="outfits" className="mt-0">
            <OutfitInspirationCards region={selectedRegion} mood={selectedMood} />
          </TabsContent>
          
          <TabsContent value="sustainable" className="mt-0">
            <SustainableSpotlight region={selectedRegion} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}