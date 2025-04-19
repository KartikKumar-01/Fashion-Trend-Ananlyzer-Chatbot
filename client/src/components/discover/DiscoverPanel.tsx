import { useState, useEffect } from "react";
import { CompassIcon, LeafIcon, SparklesIcon, CloudyIcon, ShirtIcon, MapPinIcon, ExternalLinkIcon, HeartIcon } from "lucide-react";
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

// Import images
import y2kImage from "../../assets/images/y2k.jpg";
import streetwearImage from "../../assets/images/streetwear.jpg";
import minimalistImage from "../../assets/images/minimalist.jpg";
import darkAcademiaImage from "../../assets/images/darkacademia.jpg";
import cottageCore from "../../assets/images/cottagecore.jpg";
import urbanImage from "../../assets/images/urban.jpg";
import parisImage from "../../assets/images/paris.jpg";
import sustainableImage from "../../assets/images/sustainable.jpg";
import fashionTrendImage from "../../assets/images/fashion-trend.png";

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
    <div className="w-full flex flex-col h-full bg-background overflow-hidden">
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
                      {[
                        { tag: "Y2K", image: y2kImage, posts: "2.4M" },
                        { tag: "Streetwear", image: streetwearImage, posts: "5.7M" },
                        { tag: "Minimalist", image: minimalistImage, posts: "3.2M" },
                        { tag: "DarkAcademia", image: darkAcademiaImage, posts: "1.8M" },
                        { tag: "Cottagecore", image: cottageCore, posts: "4.1M" }
                      ].map((item, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-3/4 sm:basis-1/2 md:basis-1/3">
                          <Card className="bg-muted/70 backdrop-blur-md border-purple-900/20 hover:shadow-md hover:border-purple-800/30 transition-all overflow-hidden">
                            <div className="relative aspect-square w-full overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                              <img 
                                src={item.image} 
                                alt={item.tag} 
                                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                              />
                              <div className="absolute bottom-2 left-2 z-20">
                                <Badge 
                                  className="bg-gradient-to-r from-primary to-purple-800 hover:from-primary hover:to-purple-800 shadow-md px-2 py-1 text-white border-none"
                                >
                                  #{item.tag}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="p-3">
                              <p className="text-xs text-gray-300 line-clamp-2 h-8">
                                {item.tag === "Y2K" && "Early 2000s inspired fashion with colorful accessories and nostalgic elements"}
                                {item.tag === "Streetwear" && "Urban-inspired casual clothing with bold graphics and statement pieces"}
                                {item.tag === "Minimalist" && "Clean, simple silhouettes with neutral colors and quality basics"}
                                {item.tag === "DarkAcademia" && "Scholarly aesthetic with tweed, plaid and vintage-inspired pieces"}
                                {item.tag === "Cottagecore" && "Romanticized rural lifestyle with floral prints and prairie dresses"}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-primary/90">{item.posts} posts</span>
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
                    {[
                      { 
                        name: "Urban Explorer", 
                        image: urbanImage, 
                        designer: "Alex Wong", 
                        description: "Versatile city outfit with layered textures and comfortable footwear", 
                        mood: "Casual", 
                        likes: 2456 
                      },
                      { 
                        name: "Parisian Chic", 
                        image: parisImage, 
                        designer: "Marie Laurent", 
                        description: "Elegant ensemble with classic silhouettes and subtle statement pieces", 
                        mood: "Elegant", 
                        likes: 3187 
                      },
                      { 
                        name: "Tokyo Street", 
                        image: streetwearImage, 
                        designer: "Haru Tanaka", 
                        description: "Bold avant-garde pieces with experimental proportions and textures", 
                        mood: "Bold", 
                        likes: 1853 
                      },
                      { 
                        name: "Vintage Academia", 
                        image: darkAcademiaImage, 
                        designer: "Oliver Bennett", 
                        description: "Scholar-inspired look with tweed, wool and vintage accessories", 
                        mood: "Retro", 
                        likes: 2912 
                      }
                    ].map((outfit, index) => (
                      <Card key={index} className="bg-muted/70 backdrop-blur-md border-purple-900/20 hover:shadow-md hover:shadow-purple-900/5 transition-all overflow-hidden">
                        <div className="relative aspect-square w-full overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                          <img 
                            src={outfit.image} 
                            alt={outfit.name} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute bottom-3 left-3 z-20">
                            <h4 className="text-white font-medium text-sm">{outfit.name}</h4>
                            <p className="text-gray-200 text-xs mt-0.5">by {outfit.designer}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="absolute top-3 right-3 z-20 h-8 w-8 p-0 rounded-full bg-black/40 border-white/10 text-white/70 hover:bg-primary/60 hover:border-white/20 hover:text-white"
                          >
                            <HeartIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardContent className="p-3">
                          <p className="text-xs text-gray-300 line-clamp-2 h-8">{outfit.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-xs bg-muted/50 text-primary border-purple-900/20">
                              {selectedMood === "All" ? outfit.mood : selectedMood}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              {outfit.likes.toLocaleString()} likes
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
                        <img 
                          src={sustainableImage} 
                          alt="Sustainable Fashion" 
                          className="w-full h-full object-cover"
                        />
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
                            className="h-7 text-xs bg-muted/50 border-green-900/30 text-white hover:bg-green-900/20 flex items-center gap-1.5"
                          >
                            Visit Website
                            <ExternalLinkIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                  
                  <Card className="bg-muted/70 backdrop-blur-md border-green-900/20 hover:shadow-md hover:shadow-green-900/5 transition-all overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-1/3 aspect-video sm:aspect-square overflow-hidden">
                        <img 
                          src={fashionTrendImage} 
                          alt="Recycled Denim" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3 w-full sm:w-2/3">
                        <div className="mb-1">
                          <Badge variant="outline" className="text-xs bg-green-900/20 text-green-400 border-green-900/30">
                            BlueRenewal
                          </Badge>
                        </div>
                        <h4 className="text-sm font-medium text-white">Recycled Denim Initiative</h4>
                        <p className="text-xs text-gray-300 mt-1 line-clamp-2">Jeans made from post-consumer recycled denim with zero-waste production</p>
                        
                        <div className="mt-2 p-2 bg-green-900/10 rounded border border-green-900/20">
                          <p className="text-xs text-green-300 font-medium">
                            <span className="text-green-400">Impact:</span> Diverts 5kg of textile waste per pair
                          </p>
                        </div>
                        
                        <div className="mt-3 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs bg-muted/50 border-green-900/30 text-white hover:bg-green-900/20 flex items-center gap-1.5"
                          >
                            Visit Website
                            <ExternalLinkIcon className="h-3 w-3" />
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