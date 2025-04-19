import { useState, useEffect } from "react";
import { CompassIcon, LeafIcon, SparklesIcon, CloudyIcon, ShirtIcon, MapPinIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

type DiscoverTab = "trending" | "outfits" | "sustainable";

// Simple mood filter component
function MoodFilters({ selectedMood, onSelectMood }: { selectedMood: string, onSelectMood: (mood: string) => void }) {
  const moods = ["All", "Chill", "Bold", "Retro", "Casual", "Elegant"];
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs text-gray-400">Mood:</span>
      <ToggleGroup 
        type="single" 
        variant="outline" 
        value={selectedMood}
        onValueChange={(value) => value && onSelectMood(value)}
        className="bg-muted/60 rounded-lg border border-purple-900/20 p-0.5"
      >
        {moods.map((mood) => (
          <ToggleGroupItem 
            key={mood} 
            value={mood}
            size="sm"
            className={`px-2 py-0.5 text-xs rounded data-[state=on]:bg-gradient-to-r data-[state=on]:from-primary/30 data-[state=on]:to-purple-800/30 data-[state=on]:text-white data-[state=on]:shadow-sm data-[state=on]:shadow-purple-900/10`}
          >
            {mood}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

// Simple region selector component
function RegionSelector({ selectedRegion, onSelectRegion }: { selectedRegion: string, onSelectRegion: (region: string) => void }) {
  const regions = ["Global", "New York", "Paris", "London", "Tokyo", "Seoul", "Milan", "Berlin"];
  
  return (
    <div className="flex items-center">
      <Select
        value={selectedRegion}
        onValueChange={onSelectRegion}
      >
        <SelectTrigger 
          className="bg-muted/80 text-white rounded-lg px-3 py-1 h-auto w-32 focus:ring-primary/50 border border-purple-900/30 hover:bg-muted/90 transition-all shadow-sm text-xs"
        >
          <div className="flex items-center gap-1.5">
            <MapPinIcon className="h-3 w-3 text-primary/80" />
            <SelectValue placeholder="Select Region" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-muted/95 backdrop-blur-md border-purple-900/30 rounded-lg shadow-xl">
          {regions.map((region) => (
            <SelectItem 
              key={region} 
              value={region}
              className="my-0.5 rounded hover:bg-purple-900/20 focus:bg-purple-900/30 transition-colors text-sm"
            >
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function DiscoverPanel() {
  const [activeTab, setActiveTab] = useState<DiscoverTab>("trending");
  const [selectedMood, setSelectedMood] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("Global");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full lg:w-1/3 flex flex-col h-full bg-background overflow-hidden">
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
              <ShirtIcon className="h-4 w-4 mr-2" />
              Outfits
            </TabsTrigger>
            <TabsTrigger value="sustainable" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/40 data-[state=active]:to-purple-800/40">
              <LeafIcon className="h-4 w-4 mr-2" />
              Sustainable
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-5 w-32 bg-gray-800/50" />
                <Skeleton className="h-4 w-20 bg-gray-800/50" />
              </div>
              
              <Skeleton className="h-52 w-full bg-gray-800/30 rounded-lg" />
              <Skeleton className="h-52 w-full bg-gray-800/30 rounded-lg" />
            </div>
          ) : (
            <>
              <TabsContent value="trending" className="mt-0">
                {/* Trending Fashion Tags - Content to be fleshed out in future PR */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium flex items-center">
                      <SparklesIcon className="h-4 w-4 mr-1.5 text-primary" />
                      Trending Now
                    </h3>
                    <span className="text-xs text-gray-400">8 trending tags</span>
                  </div>
                  
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-3/4 sm:basis-1/2 md:basis-1/3">
                          <Card className="bg-muted/70 backdrop-blur-md border-purple-900/20 hover:shadow-md hover:border-purple-800/30 transition-all overflow-hidden">
                            <div className="relative aspect-square w-full overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <div className="bg-gradient-to-br from-primary/5 to-purple-900/40 h-full w-full"></div>
                              <div className="absolute bottom-2 left-2 z-20">
                                <Badge 
                                  className="bg-gradient-to-r from-primary to-purple-800 hover:from-primary hover:to-purple-800 shadow-md px-2 py-1 text-white border-none"
                                >
                                  #{["Y2K", "Streetwear", "Minimalist", "DarkAcademia", "Cottagecore"][index]}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="p-3">
                              <p className="text-xs text-gray-300 line-clamp-2 h-8">Trending fashion style with unique aesthetic and growing popularity</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-primary/90">{Math.floor(Math.random() * 5) + 1}.{Math.floor(Math.random() * 9)}M posts</span>
                                <span className="text-xs text-gray-400">{selectedRegion}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex items-center justify-end gap-1 mt-2">
                      <CarouselPrevious className="relative right-0 top-0 translate-x-0 translate-y-0 bg-muted/80 hover:bg-primary/20 border-purple-900/20 h-7 w-7" />
                      <CarouselNext className="relative right-0 top-0 translate-x-0 translate-y-0 bg-muted/80 hover:bg-primary/20 border-purple-900/20 h-7 w-7" />
                    </div>
                  </Carousel>
                </div>
              </TabsContent>
              
              <TabsContent value="outfits" className="mt-0">
                {/* Outfit Inspiration Cards - Content to be fleshed out in future PR */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Outfit Inspiration</h3>
                    <span className="text-xs text-gray-400">8 outfits</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Card key={index} className="bg-muted/70 backdrop-blur-md border-purple-900/20 hover:shadow-md hover:shadow-purple-900/5 transition-all overflow-hidden">
                        <div className="relative aspect-square w-full overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                          <div className="bg-gradient-to-br from-purple-900/20 to-black/60 h-full w-full"></div>
                          <div className="absolute bottom-3 left-3 z-20">
                            <h4 className="text-white font-medium text-sm">{["Urban Explorer", "Parisian Chic", "Tokyo Street", "Vintage Academia"][index]}</h4>
                            <p className="text-gray-200 text-xs mt-0.5">by Designer</p>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <p className="text-xs text-gray-300 line-clamp-2 h-8">Stylish outfit with attention to detail and perfect for the current season</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-xs bg-muted/50 text-primary border-purple-900/20">
                              {selectedMood === "All" ? ["Casual", "Elegant", "Bold", "Retro"][index] : selectedMood}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              {Math.floor(Math.random() * 3) + 1},{Math.floor(Math.random() * 900) + 100} likes
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sustainable" className="mt-0">
                {/* Sustainable Fashion Spotlight - Content to be fleshed out in future PR */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-900/20 to-primary/10 p-4 rounded-lg border border-green-900/20 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-800/30 p-2 rounded-full">
                        <LeafIcon className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">Sustainable Fashion Spotlight</h3>
                        <p className="text-xs text-gray-300 mt-1">Discover eco-friendly brands making a positive impact on the fashion industry.</p>
                      </div>
                    </div>
                  </div>
                  
                  <Card className="bg-muted/70 backdrop-blur-md border-green-900/20 hover:shadow-md hover:shadow-green-900/5 transition-all overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-1/3 aspect-video sm:aspect-square overflow-hidden">
                        <div className="bg-gradient-to-br from-green-900/20 to-black/60 h-full w-full"></div>
                      </div>
                      <CardContent className="p-3 w-full sm:w-2/3">
                        <div className="mb-1">
                          <Badge variant="outline" className="text-xs bg-green-900/20 text-green-400 border-green-900/30">
                            EcoVogue
                          </Badge>
                        </div>
                        <h4 className="text-sm font-medium text-white">Organic Cotton Collection</h4>
                        <p className="text-xs text-gray-300 mt-1 line-clamp-2">Ethically produced garments using 100% organic cotton with natural dyes</p>
                        
                        <div className="mt-2 p-2 bg-green-900/10 rounded border border-green-900/20">
                          <p className="text-xs text-green-300 font-medium">
                            <span className="text-green-400">Impact:</span> Saves 2,700 liters of water per item
                          </p>
                        </div>
                        
                        <div className="mt-3 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs bg-muted/50 border-green-900/30 text-white hover:bg-green-900/20"
                          >
                            Visit Website
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
}