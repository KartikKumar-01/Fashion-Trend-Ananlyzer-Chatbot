import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

interface OutfitInspirationCardsProps {
  region: string;
  mood: string;
}

// Outfit inspiration data
// In a real app, this would come from an API
const outfits = [
  {
    id: 1,
    name: "Urban Explorer",
    image: "https://images.unsplash.com/photo-1603400521630-9f2de124b33b",
    description: "Versatile city outfit with layered textures and comfortable footwear",
    likes: 2456,
    designer: "Alex Wong",
    region: "New York",
    mood: "Casual"
  },
  {
    id: 2,
    name: "Parisian Chic",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae",
    description: "Elegant ensemble with classic silhouettes and subtle statement pieces",
    likes: 3187,
    designer: "Marie Laurent",
    region: "Paris",
    mood: "Elegant"
  },
  {
    id: 3,
    name: "Tokyo Street",
    image: "https://images.unsplash.com/photo-1626516269969-4cd5c52fe73c",
    description: "Bold avant-garde pieces with experimental proportions and textures",
    likes: 1853,
    designer: "Haru Tanaka",
    region: "Tokyo",
    mood: "Bold"
  },
  {
    id: 4,
    name: "Vintage Academia",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8",
    description: "Scholar-inspired look with tweed, wool and vintage accessories",
    likes: 2912,
    designer: "Oliver Bennett",
    region: "London",
    mood: "Retro"
  },
  {
    id: 5,
    name: "Scandinavian Minimal",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153",
    description: "Clean lines and neutral palette with focus on quality materials",
    likes: 1735,
    designer: "Lisa Bergman",
    region: "Berlin",
    mood: "Chill"
  },
  {
    id: 6,
    name: "Seoul Streetwear",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67",
    description: "K-fashion inspired with oversized silhouettes and bold accessories",
    likes: 3421,
    designer: "Jin Park",
    region: "Seoul",
    mood: "Bold"
  },
  {
    id: 7,
    name: "Milano Eleganza",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    description: "Sophisticated tailoring with luxe fabrics and artisanal accessories",
    likes: 2876,
    designer: "Giulia Romano",
    region: "Milan",
    mood: "Elegant"
  },
  {
    id: 8,
    name: "California Casual",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
    description: "Relaxed silhouettes with sustainable materials and earthy tones",
    likes: 1694,
    designer: "Sam Rivera",
    region: "Global",
    mood: "Chill"
  }
];

export function OutfitInspirationCards({ region, mood }: OutfitInspirationCardsProps) {
  const [likedOutfits, setLikedOutfits] = useState<number[]>([]);

  // Filter outfits based on selected region and mood
  const filteredOutfits = outfits.filter(outfit => {
    const regionMatch = region === "Global" || outfit.region === region || outfit.region === "Global";
    const moodMatch = mood === "All" || outfit.mood === mood;
    return regionMatch && moodMatch;
  });

  const toggleLike = (id: number) => {
    setLikedOutfits(prev => 
      prev.includes(id) 
        ? prev.filter(outfitId => outfitId !== id) 
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Outfit Inspiration</h3>
        <span className="text-xs text-gray-400">{filteredOutfits.length} outfits</span>
      </div>
      
      {filteredOutfits.length === 0 ? (
        <div className="flex items-center justify-center p-6 bg-muted/30 rounded-lg border border-purple-900/10">
          <p className="text-sm text-gray-400">No outfits available for the selected filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredOutfits.map((outfit) => (
            <Card key={outfit.id} className="bg-muted/70 backdrop-blur-md border-purple-900/20 hover:shadow-md hover:shadow-purple-900/5 transition-all overflow-hidden">
              <div className="relative aspect-square w-full overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  src={`${outfit.image}?auto=format&fit=crop&w=300&q=80`}
                  alt={outfit.name}
                  className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 z-20">
                  <h4 className="text-white font-medium text-sm">{outfit.name}</h4>
                  <p className="text-gray-200 text-xs mt-0.5">by {outfit.designer}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`absolute top-3 right-3 z-20 h-8 w-8 p-0 rounded-full ${
                    likedOutfits.includes(outfit.id) 
                      ? 'bg-primary/60 border-white/20 text-white' 
                      : 'bg-black/40 border-white/10 text-white/70'
                  }`}
                  onClick={() => toggleLike(outfit.id)}
                >
                  <HeartIcon className="h-4 w-4" fill={likedOutfits.includes(outfit.id) ? "currentColor" : "none"} />
                </Button>
              </div>
              <CardContent className="p-3">
                <p className="text-xs text-gray-300 line-clamp-2 h-8">{outfit.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline" className="text-xs bg-muted/50 text-primary border-purple-900/20">
                    {outfit.mood}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {likedOutfits.includes(outfit.id) ? outfit.likes + 1 : outfit.likes} likes
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}