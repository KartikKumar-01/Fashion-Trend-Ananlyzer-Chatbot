import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LeafIcon, ExternalLinkIcon } from "lucide-react";

interface SustainableSpotlightProps {
  region: string;
}

// Sustainable fashion data
// In a real app, this would come from an API
const sustainableItems = [
  {
    id: 1,
    title: "Organic Cotton Collection",
    brand: "EcoVogue",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
    description: "Ethically produced garments using 100% organic cotton with natural dyes",
    impact: "Saves 2,700 liters of water per item",
    website: "#",
    region: "Global"
  },
  {
    id: 2,
    title: "Recycled Denim Initiative",
    brand: "BlueRenewal",
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c",
    description: "Jeans made from post-consumer recycled denim with zero-waste production",
    impact: "Diverts 5kg of textile waste per pair",
    website: "#",
    region: "New York"
  },
  {
    id: 3,
    title: "Biodegradable Footwear",
    brand: "TerraSole",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    description: "Shoes that decompose naturally within 5 years after disposal",
    impact: "Reduces landfill waste by 300 tons annually",
    website: "#",
    region: "London"
  },
  {
    id: 4,
    title: "Upcycled Luxury Collection",
    brand: "Renaissance Couture",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
    description: "Luxury pieces created from deadstock designer fabrics and vintage garments",
    impact: "Zero new materials used in production",
    website: "#",
    region: "Paris"
  },
  {
    id: 5,
    title: "Solar-Powered Textiles",
    brand: "SunWoven",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
    description: "Fabrics manufactured using 100% solar energy with closed-loop water systems",
    impact: "Carbon-neutral production process",
    website: "#",
    region: "Milan"
  },
  {
    id: 6,
    title: "Seaweed Fiber Clothing",
    brand: "OceanThreads",
    image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176",
    description: "Innovative clothing line using seaweed-derived fibers that nourish skin",
    impact: "Biodegradable and regenerative resource",
    website: "#",
    region: "Tokyo"
  },
  {
    id: 7,
    title: "Living Wage Certification",
    brand: "FairFashion Collective",
    image: "https://images.unsplash.com/photo-1594761386893-d397c7fbc8ae",
    description: "Transparent supply chain with certified living wages for all workers",
    impact: "Supports 5,000+ artisans and factory workers",
    website: "#",
    region: "Berlin"
  },
  {
    id: 8,
    title: "Zero-Waste Knitwear",
    brand: "LoopKnit",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0",
    description: "Computer-programmed knitting with no cutting waste and minimal seams",
    impact: "Reduces fabric waste by 97%",
    website: "#",
    region: "Seoul"
  }
];

export function SustainableSpotlight({ region }: SustainableSpotlightProps) {
  // Filter sustainable items based on selected region
  const filteredItems = sustainableItems.filter(item => {
    return region === "Global" || item.region === region || item.region === "Global";
  });

  return (
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
      
      {filteredItems.length === 0 ? (
        <div className="flex items-center justify-center p-6 bg-muted/30 rounded-lg border border-purple-900/10">
          <p className="text-sm text-gray-400">No sustainable items available for the selected region</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-muted/70 backdrop-blur-md border-green-900/20 hover:shadow-md hover:shadow-green-900/5 transition-all overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/3 aspect-video sm:aspect-square overflow-hidden">
                  <img
                    src={`${item.image}?auto=format&fit=crop&w=200&q=80`}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-3 w-full sm:w-2/3">
                  <div className="mb-1">
                    <Badge variant="outline" className="text-xs bg-green-900/20 text-green-400 border-green-900/30">
                      {item.brand}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-medium text-white">{item.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2">{item.description}</p>
                  
                  <div className="mt-2 p-2 bg-green-900/10 rounded border border-green-900/20">
                    <p className="text-xs text-green-300 font-medium">
                      <span className="text-green-400">Impact:</span> {item.impact}
                    </p>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs bg-muted/50 border-green-900/30 text-white hover:bg-green-900/20"
                    >
                      Visit Website
                      <ExternalLinkIcon className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}