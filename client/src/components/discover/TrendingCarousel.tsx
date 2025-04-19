import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon } from "lucide-react";

interface TrendingCarouselProps {
  region: string;
  mood: string;
}

// Trending fashion tags data
// In a real app, this would come from an API
const fashionTags = [
  {
    id: 1,
    tag: "#Y2K",
    image: "https://images.unsplash.com/photo-1602810319428-019690571b5b",
    description: "Early 2000s inspired fashion with colorful accessories and nostalgic elements",
    engagement: "2.4M posts",
    region: "Global",
    mood: "Retro"
  },
  {
    id: 2,
    tag: "#Streetwear",
    image: "https://images.unsplash.com/photo-1588117305388-c2631a279f82",
    description: "Urban-inspired casual clothing with bold graphics and statement pieces",
    engagement: "5.7M posts",
    region: "Global",
    mood: "Bold"
  },
  {
    id: 3,
    tag: "#Minimalist",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f",
    description: "Clean, simple silhouettes with neutral colors and quality basics",
    engagement: "3.2M posts",
    region: "Paris",
    mood: "Chill"
  },
  {
    id: 4,
    tag: "#DarkAcademia",
    image: "https://images.unsplash.com/photo-1614251056798-0a63eda2bb25",
    description: "Scholarly aesthetic with tweed, plaid and vintage-inspired pieces",
    engagement: "1.8M posts",
    region: "London",
    mood: "Elegant"
  },
  {
    id: 5,
    tag: "#Cottagecore",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    description: "Romanticized rural lifestyle with floral prints and prairie dresses",
    engagement: "4.1M posts",
    region: "Global",
    mood: "Chill"
  },
  {
    id: 6,
    tag: "#TechWear",
    image: "https://images.unsplash.com/photo-1551854838-212c50b4c184",
    description: "Functional, futuristic clothing with technical fabrics and utility features",
    engagement: "1.5M posts",
    region: "Tokyo",
    mood: "Bold"
  },
  {
    id: 7,
    tag: "#VintageLuxe",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
    description: "Vintage-inspired designer pieces with modern styling",
    engagement: "2.9M posts",
    region: "Milan",
    mood: "Retro"
  },
  {
    id: 8,
    tag: "#ScandiChic",
    image: "https://images.unsplash.com/photo-1604176424472-9d997e14d897",
    description: "Nordic minimalism with sleek, functional pieces and natural materials",
    engagement: "1.3M posts",
    region: "Berlin",
    mood: "Casual"
  }
];

export function TrendingCarousel({ region, mood }: TrendingCarouselProps) {
  // Filter tags based on selected region and mood
  const filteredTags = fashionTags.filter(tag => {
    const regionMatch = region === "Global" || tag.region === region;
    const moodMatch = mood === "All" || tag.mood === mood;
    return regionMatch && moodMatch;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium flex items-center">
          <SparklesIcon className="h-4 w-4 mr-1.5 text-primary" />
          Trending Now
        </h3>
        <span className="text-xs text-gray-400">
          {filteredTags.length} trending {filteredTags.length === 1 ? 'tag' : 'tags'}
        </span>
      </div>
      
      {filteredTags.length === 0 ? (
        <div className="flex items-center justify-center p-6 bg-muted/30 rounded-lg border border-purple-900/10">
          <p className="text-sm text-gray-400">No trending tags available for the selected filters</p>
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {filteredTags.map((item) => (
              <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-3/4 sm:basis-1/2 md:basis-1/3">
                <Card className="bg-muted/70 backdrop-blur-md border-purple-900/20 hover:shadow-md hover:shadow-purple-900/5 transition-all overflow-hidden">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <img
                      src={`${item.image}?auto=format&fit=crop&w=300&q=80`}
                      alt={item.tag}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 z-20">
                      <Badge 
                        className="bg-gradient-to-r from-primary to-purple-800 hover:from-primary hover:to-purple-800 shadow-md px-2 py-1 text-white border-none"
                      >
                        {item.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs text-gray-300 line-clamp-2 h-8">{item.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-primary/90">{item.engagement}</span>
                      <span className="text-xs text-gray-400">{item.region}</span>
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
      )}
    </div>
  );
}