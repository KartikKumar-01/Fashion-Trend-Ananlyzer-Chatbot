import { Trend } from "@/types";
import { getRandomInt } from "@/lib/utils";

// Fashion trend images
const trendImages = [
  // Fashion trends
  "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Oversized Blazers
  "https://images.unsplash.com/photo-1577383067063-fda20965a3ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Statement Accessories
  "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Sustainable Fashion
  "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Bold Colors
  "https://images.unsplash.com/photo-1519568470290-c0c1fbfff16f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Wide Leg Pants
  "https://images.unsplash.com/photo-1551799517-eb8f03cb5e6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Minimalist Style
  
  // Seasonal clothing
  "https://images.unsplash.com/photo-1563004879-7424b250c9b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Summer dresses
  "https://images.unsplash.com/photo-1574300328682-e5a67ebba07a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Winter coats
  "https://images.unsplash.com/photo-1542295669297-4d352b042bca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Spring jackets
  "https://images.unsplash.com/photo-1569398034126-476b0d96e2d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Fall layers
  
  // Fashion accessories
  "https://images.unsplash.com/photo-1592878904946-b4b8b4a9745b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Jewelry
  "https://images.unsplash.com/photo-1574621100236-d25b64cfd647?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Bags
  "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Shoes
  "https://images.unsplash.com/photo-1508243771214-6e95d137426b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", // Hats
];

// Generate trend data
export const trends: Trend[] = [
  {
    id: 1,
    title: "Oversized Blazers",
    description: "Modern silhouettes with relaxed proportions dominating streetwear and formal settings.",
    imageUrl: trendImages[0],
    category: "Outerwear",
    status: "HOT",
    dataSeries: [30, 45, 58, 63, 82, 85, 92, 97],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
    weeksActive: 8,
    season: "Fall",
    gender: "Unisex"
  },
  {
    id: 2,
    title: "Statement Accessories",
    description: "Bold jewelry and accessories are making a comeback with chunky chains and oversized pieces.",
    imageUrl: trendImages[1],
    category: "Accessories",
    status: "TRENDING",
    dataSeries: [25, 35, 48, 62, 78, 83],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    weeksActive: 6,
    season: "All Seasons",
    gender: "Female"
  },
  {
    id: 3,
    title: "Sustainable Fashion",
    description: "Eco-conscious materials and ethical production are moving from niche to mainstream.",
    imageUrl: trendImages[2],
    category: "Sustainable",
    status: "GROWING",
    dataSeries: [15, 18, 25, 38, 42, 48, 55, 62, 68, 75, 82, 90],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12"],
    weeksActive: 12,
    season: "All Seasons",
    gender: "Unisex"
  },
  {
    id: 4,
    title: "Bold Colors",
    description: "Vibrant hues and color blocking are taking over from minimalist palettes.",
    imageUrl: trendImages[3],
    category: "Color Trends",
    status: "HOT",
    dataSeries: [20, 35, 48, 60, 75, 85, 92],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    weeksActive: 7,
    season: "Spring",
    gender: "Unisex"
  },
  {
    id: 5,
    title: "Wide Leg Pants",
    description: "Comfort meets style with relaxed silhouettes replacing skinny cuts across all demographics.",
    imageUrl: trendImages[4],
    category: "Bottoms",
    status: "TRENDING",
    dataSeries: [30, 42, 55, 68, 75, 82, 88, 92, 95],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9"],
    weeksActive: 9,
    season: "Fall",
    gender: "Female"
  },
  {
    id: 6,
    title: "Minimalist Style",
    description: "Clean lines and understated elegance continue to influence both casual and formal wear.",
    imageUrl: trendImages[5],
    category: "Style",
    status: "STABLE",
    dataSeries: [60, 62, 65, 63, 67, 70, 72, 70, 73, 75],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10"],
    weeksActive: 10,
    season: "All Seasons",
    gender: "Male"
  },
  {
    id: 7,
    title: "Summer Dresses",
    description: "Flowy fabrics and floral patterns define this season's most sought-after summer dresses.",
    imageUrl: trendImages[6],
    category: "Dresses",
    status: "HOT",
    dataSeries: [40, 55, 65, 78, 88, 95],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    weeksActive: 6,
    season: "Summer",
    gender: "Female"
  },
  {
    id: 8,
    title: "Winter Layering",
    description: "Strategic layering techniques with mixed textures and unexpected combinations.",
    imageUrl: trendImages[7],
    category: "Outerwear",
    status: "GROWING",
    dataSeries: [25, 35, 42, 53, 60, 72, 80],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    weeksActive: 7,
    season: "Winter",
    gender: "Unisex"
  },
  {
    id: 9,
    title: "Statement Bags",
    description: "Distinctive shapes, bold colors, and unique details define the latest bag trends.",
    imageUrl: trendImages[11],
    category: "Accessories",
    status: "NEW",
    dataSeries: [15, 25, 38, 50],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    weeksActive: 4,
    season: "Spring",
    gender: "Female"
  },
  {
    id: 10,
    title: "Premium Sneakers",
    description: "Luxury sneakers blending comfort and high fashion continue to dominate footwear trends.",
    imageUrl: trendImages[12],
    category: "Footwear",
    status: "TRENDING",
    dataSeries: [45, 52, 60, 68, 75, 80, 85, 82],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
    weeksActive: 8,
    season: "All Seasons",
    gender: "Male"
  }
];

// Helper function to get trends filtered by season and gender
export function getFilteredTrends(
  season: "All Seasons" | string = "All Seasons",
  gender: "Unisex" | string = "Unisex"
): Trend[] {
  return trends.filter(trend => {
    const seasonMatch = season === "All Seasons" || trend.season === season || trend.season === "All Seasons";
    const genderMatch = gender === "Unisex" || trend.gender === gender || trend.gender === "Unisex";
    return seasonMatch && genderMatch;
  }).slice(0, 5); // Only return top 5 trends
}
