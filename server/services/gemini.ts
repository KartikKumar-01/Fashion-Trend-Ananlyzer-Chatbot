import { GeminiPrompt } from "@shared/schema";

// Updated Gemini API base URL for the v1beta version
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Fashion product suggestions with images
const fashionProducts = [
  {
    category: "casual",
    items: [
      {
        name: "Relaxed Fit Cotton T-Shirt",
        brand: "Essential Tees",
        price: "$29.99",
        description: "A comfortable, breathable cotton t-shirt perfect for everyday wear.",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300"
      },
      {
        name: "Slim Fit Jeans",
        brand: "Denim Co.",
        price: "$59.99",
        description: "Classic five-pocket jeans with a modern slim fit and slight stretch for comfort.",
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300"
      }
    ]
  },
  {
    category: "formal",
    items: [
      {
        name: "Tailored Fit Blazer",
        brand: "Executive Line",
        price: "$129.99",
        description: "A sophisticated blazer with modern cut and premium fabric.",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300"
      },
      {
        name: "Pleated Dress Pants",
        brand: "Business Essentials",
        price: "$89.99",
        description: "Professional dress pants with a timeless pleated design.",
        imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=300"
      }
    ]
  },
  {
    category: "summer",
    items: [
      {
        name: "Linen Short Sleeve Shirt",
        brand: "Summer Vibes",
        price: "$45.99",
        description: "Breathable linen shirt perfect for hot summer days.",
        imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=300"
      },
      {
        name: "Lightweight Chino Shorts",
        brand: "Coastal Collection",
        price: "$39.99",
        description: "Comfortable cotton shorts ideal for warm weather.",
        imageUrl: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&w=300"
      }
    ]
  },
  {
    category: "winter",
    items: [
      {
        name: "Wool Blend Coat",
        brand: "Northern Style",
        price: "$149.99",
        description: "A stylish and warm coat for the coldest winter days.",
        imageUrl: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=300"
      },
      {
        name: "Cashmere Sweater",
        brand: "Cozy Comfort",
        price: "$89.99",
        description: "Luxuriously soft cashmere sweater with ribbed details.",
        imageUrl: "https://images.unsplash.com/photo-1608991317260-ec93071ad2a7?auto=format&fit=crop&w=300"
      }
    ]
  },
  {
    category: "athletic",
    items: [
      {
        name: "Performance Running Shoes",
        brand: "Athletic Pro",
        price: "$119.99",
        description: "Lightweight, responsive running shoes with cushioned support.",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300"
      },
      {
        name: "Moisture-Wicking Training Shirt",
        brand: "FitWear",
        price: "$34.99",
        description: "Technical fabric shirt that keeps you dry during intense workouts.",
        imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=300"
      }
    ]
  }
];

// Function to determine relevant product categories based on the query
function determineRelevantCategories(query: string, season?: string, gender?: string): string[] {
  query = query.toLowerCase();
  const categories: string[] = [];
  
  // Season-based matching - prioritize explicitly selected season
  if (season) {
    const seasonLower = season.toLowerCase();
    if (seasonLower.includes('summer') || seasonLower.includes('spring')) {
      categories.push('summer');
    }
    if (seasonLower.includes('winter') || seasonLower.includes('fall')) {
      categories.push('winter');
    }
  }
  
  // Query-based matching
  if (query.includes('casual') || query.includes('everyday') || query.includes('relaxed')) {
    categories.push('casual');
  }
  if (query.includes('formal') || query.includes('business') || query.includes('professional') || query.includes('office')) {
    categories.push('formal');
  }
  if (query.includes('workout') || query.includes('gym') || query.includes('exercise') || query.includes('running') || query.includes('training')) {
    categories.push('athletic');
  }
  if (query.includes('summer') || query.includes('hot') || query.includes('beach') || query.includes('vacation')) {
    categories.push('summer');
  }
  if (query.includes('winter') || query.includes('cold') || query.includes('snow') || query.includes('warm clothes')) {
    categories.push('winter');
  }
  
  // If no specific categories matched, include casual by default
  if (categories.length === 0) {
    // If season is specified but no category matched yet, prioritize season
    if (season && season !== "All Seasons") {
      const seasonLower = season.toLowerCase();
      if (seasonLower.includes('summer') || seasonLower.includes('spring')) {
        categories.push('summer');
      } else if (seasonLower.includes('winter') || seasonLower.includes('fall')) {
        categories.push('winter');
      } else {
        categories.push('casual');
      }
    } else {
      categories.push('casual');
    }
  }
  
  // Deduplicate categories using Array.filter instead of Set
  return categories.filter((category, index) => categories.indexOf(category) === index);
}

// Gender-specific product mapping
const genderSpecificProducts = {
  "Male": {
    "casual": [
      {
        name: "Men's Classic Fit T-Shirt",
        brand: "Essential Tees",
        price: "$29.99",
        description: "A comfortable, breathable cotton t-shirt with a classic fit for men.",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300"
      },
      {
        name: "Men's Slim Fit Jeans",
        brand: "Denim Co.",
        price: "$59.99",
        description: "Men's five-pocket jeans with a modern slim fit and slight stretch for comfort.",
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300"
      }
    ],
    "formal": [
      {
        name: "Men's Tailored Fit Blazer",
        brand: "Executive Line",
        price: "$129.99",
        description: "A sophisticated men's blazer with modern cut and premium fabric.",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300"
      },
      {
        name: "Men's Dress Shirt",
        brand: "Business Essentials",
        price: "$69.99",
        description: "Crisp, professional dress shirt ideal for business settings.",
        imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300"
      }
    ],
    "summer": [
      {
        name: "Men's Linen Shirt",
        brand: "Summer Vibes",
        price: "$49.99",
        description: "Lightweight, breathable linen shirt perfect for hot summer days.",
        imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=300"
      },
      {
        name: "Men's Chino Shorts",
        brand: "Coastal Collection",
        price: "$39.99",
        description: "Versatile cotton shorts ideal for warm weather and casual outings.",
        imageUrl: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&w=300"
      }
    ],
    "winter": [
      {
        name: "Men's Wool Overcoat",
        brand: "Northern Style",
        price: "$159.99",
        description: "Sophisticated wool blend coat for cold weather with classic silhouette.",
        imageUrl: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=300"
      },
      {
        name: "Men's Cable Knit Sweater",
        brand: "Cozy Comfort",
        price: "$79.99",
        description: "Warm, textured sweater perfect for layering in cold weather.",
        imageUrl: "https://images.unsplash.com/photo-1608991317260-ec93071ad2a7?auto=format&fit=crop&w=300"
      }
    ]
  },
  "Female": {
    "casual": [
      {
        name: "Women's Relaxed Fit Tee",
        brand: "Essential Tees",
        price: "$27.99",
        description: "A soft, flattering t-shirt designed for everyday comfort.",
        imageUrl: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=300"
      },
      {
        name: "Women's High-Waisted Jeans",
        brand: "Denim Co.",
        price: "$64.99",
        description: "Stylish high-waisted jeans with a comfortable stretch fit.",
        imageUrl: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=300"
      }
    ],
    "formal": [
      {
        name: "Women's Blazer",
        brand: "Executive Line",
        price: "$119.99",
        description: "A tailored women's blazer perfect for professional settings.",
        imageUrl: "https://images.unsplash.com/photo-1520013225692-fff4010c0ae0?auto=format&fit=crop&w=300"
      },
      {
        name: "Pencil Skirt",
        brand: "Business Essentials",
        price: "$79.99",
        description: "Classic pencil skirt with a comfortable stretch and elegant silhouette.",
        imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=300"
      }
    ],
    "summer": [
      {
        name: "Women's Sundress",
        brand: "Summer Vibes",
        price: "$59.99",
        description: "Light, airy sundress perfect for hot summer days and beach outings.",
        imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300"
      },
      {
        name: "Women's Linen Blend Shorts",
        brand: "Coastal Collection",
        price: "$42.99",
        description: "Comfortable, breathable shorts ideal for warm weather adventures.",
        imageUrl: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=300"
      }
    ],
    "winter": [
      {
        name: "Women's Wool Blend Coat",
        brand: "Northern Style",
        price: "$149.99",
        description: "Elegant wool blend coat with feminine silhouette for colder months.",
        imageUrl: "https://images.unsplash.com/photo-1520013225692-fff4010c0ae0?auto=format&fit=crop&w=300"
      },
      {
        name: "Women's Cashmere Turtleneck",
        brand: "Cozy Comfort",
        price: "$89.99",
        description: "Luxuriously soft cashmere turtleneck sweater for warmth and style.",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300"
      }
    ]
  }
};

// Unisex products
const unisexProducts = {
  "casual": [
    {
      name: "Unisex Crew Neck Sweatshirt",
      brand: "Universal Basics",
      price: "$39.99",
      description: "Comfortable crew neck sweatshirt with timeless design suitable for all genders.",
      imageUrl: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=300"
    },
    {
      name: "Classic Denim Jacket",
      brand: "Denim Co.",
      price: "$79.99",
      description: "Versatile denim jacket with universal fit and timeless style.",
      imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=300"
    }
  ],
  "athletic": [
    {
      name: "Performance Athletic Tee",
      brand: "FitWear",
      price: "$34.99",
      description: "Technical fabric athletic t-shirt suitable for all genders and fitness activities.",
      imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=300"
    },
    {
      name: "Versatile Training Shorts",
      brand: "Athletic Pro",
      price: "$42.99",
      description: "Functional training shorts with comfortable fit for any workout.",
      imageUrl: "https://images.unsplash.com/photo-1565060169861-d41a64b59122?auto=format&fit=crop&w=300"
    }
  ],
  "summer": [
    {
      name: "Linen Beach Shirt",
      brand: "Coastal Collection",
      price: "$44.99",
      description: "Breezy linen shirt perfect for beach days and summer evenings.",
      imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=300"
    }
  ],
  "winter": [
    {
      name: "Merino Wool Beanie",
      brand: "Northern Style",
      price: "$29.99",
      description: "Premium merino wool beanie to keep warm while looking stylish.",
      imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=300"
    }
  ]
};

// Function to select relevant products based on query
function selectRelevantProducts(query: string, season?: string, gender?: string): any[] {
  const relevantCategories = determineRelevantCategories(query, season, gender);
  const selectedProducts: any[] = [];
  
  // Handle gender-specific product recommendations
  if (gender === "Male" || gender === "Female") {
    // First try to get gender-specific products for relevant categories
    relevantCategories.forEach(category => {
      // Check if we have gender-specific products for this category
      if (genderSpecificProducts[gender] && 
          genderSpecificProducts[gender][category as keyof typeof genderSpecificProducts[typeof gender]]) {
        
        const genderProducts = genderSpecificProducts[gender][category as keyof typeof genderSpecificProducts[typeof gender]];
        if (genderProducts) {
          selectedProducts.push(...genderProducts);
        }
      }
    });
  } 
  else if (gender === "Unisex") {
    // For Unisex, prioritize unisex products
    relevantCategories.forEach(category => {
      if (unisexProducts[category as keyof typeof unisexProducts]) {
        const unisexItems = unisexProducts[category as keyof typeof unisexProducts];
        selectedProducts.push(...unisexItems);
      }
    });
  }
  
  // If we don't have enough specific products, add from general categories
  if (selectedProducts.length < 2) {
    relevantCategories.forEach(category => {
      // Skip categories we already have gender-specific products for
      if (gender === "Male" || gender === "Female") {
        if (genderSpecificProducts[gender] && 
            genderSpecificProducts[gender][category as keyof typeof genderSpecificProducts[typeof gender]]) {
          return; // Skip this category as we already have products for it
        }
      }
      else if (gender === "Unisex") {
        if (unisexProducts[category as keyof typeof unisexProducts]) {
          return; // Skip this category as we already have unisex products for it
        }
      }
      
      // Add general category products
      const categoryProducts = fashionProducts.find(p => p.category === category);
      if (categoryProducts) {
        selectedProducts.push(...categoryProducts.items);
      }
    });
  }
  
  // Add season-specific products if needed
  if (season && season !== "All Seasons" && selectedProducts.length < 3) {
    const seasonCategory = season.toLowerCase().includes("summer") || 
                          season.toLowerCase().includes("spring") ? "summer" : 
                          season.toLowerCase().includes("winter") || 
                          season.toLowerCase().includes("fall") ? "winter" : null;
                          
    if (seasonCategory) {
      // First try gender+season specific products
      if (gender === "Male" || gender === "Female") {
        const genderSeasonProducts = genderSpecificProducts[gender][seasonCategory as keyof typeof genderSpecificProducts[typeof gender]];
        if (genderSeasonProducts) {
          // Add gender-specific seasonal products that aren't already included
          for (const product of genderSeasonProducts) {
            if (!selectedProducts.some(p => p.name === product.name)) {
              selectedProducts.push(product);
            }
          }
        }
      }
      else if (gender === "Unisex" && unisexProducts[seasonCategory as keyof typeof unisexProducts]) {
        // Add unisex seasonal products
        const unisexSeasonProducts = unisexProducts[seasonCategory as keyof typeof unisexProducts];
        for (const product of unisexSeasonProducts) {
          if (!selectedProducts.some(p => p.name === product.name)) {
            selectedProducts.push(product);
          }
        }
      }
      
      // If still need more products, add from general season category
      if (selectedProducts.length < 3) {
        const seasonProducts = fashionProducts.find(p => p.category === seasonCategory);
        if (seasonProducts) {
          // Add season products that aren't already included
          for (const product of seasonProducts.items) {
            if (!selectedProducts.some(p => p.name === product.name)) {
              selectedProducts.push(product);
            }
          }
        }
      }
    }
  }
  
  // Limit to maximum 4 products total
  return selectedProducts.slice(0, 4);
}

// Function to format product suggestions as markdown
function formatProductSuggestions(products: any[]): string {
  if (products.length === 0) return '';
  
  let markdown = "\n\n### Product Suggestions\n\nBased on your question, you might be interested in these items:\n\n";
  
  products.forEach((product, index) => {
    markdown += `**${product.name}** by ${product.brand} - ${product.price}\n`;
    markdown += `${product.description}\n\n`;
    markdown += `![${product.name}](${product.imageUrl})\n\n`;
    
    if (index < products.length - 1) {
      markdown += "---\n\n";
    }
  });
  
  return markdown;
}

// Function to generate a response using Gemini API
export async function generateGeminiResponse(prompt: GeminiPrompt): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    throw new Error("API key not configured. Please add GEMINI_API_KEY to your environment variables.");
  }

  // Build context-specific fashion prompt
  let fashionPrompt = `You're a fashion expert named Fashion Trend Analyzer. Provide helpful, personalized fashion advice.
Your responses should be:
1. Conversational and friendly
2. Specific to the user's question
3. Include current fashion trends and practical styling tips
4. Formatted with bullet points for easy reading when appropriate
5. Brief but informative (aim for 2-3 paragraphs maximum)

`;

  if (prompt.season && prompt.season !== "All Seasons") {
    fashionPrompt += `Focus on ${prompt.season} fashion trends and recommendations. `;
  }

  if (prompt.gender) {
    fashionPrompt += `Provide advice specific to ${prompt.gender} fashion. `;
  }

  fashionPrompt += `User question: ${prompt.query}

Please structure your response with a friendly greeting, followed by your advice, and end with a suggestion or question to continue the conversation.`;

  // Get relevant product suggestions
  const relevantProducts = selectRelevantProducts(prompt.query, prompt.season, prompt.gender);
  
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fashionPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("Unexpected Gemini response format:", data);
      throw new Error("Unexpected response format from Gemini API");
    }

    let aiResponse = data.candidates[0].content.parts[0].text;
    
    // Add product suggestions to the AI response
    if (relevantProducts.length > 0) {
      const productSuggestions = formatProductSuggestions(relevantProducts);
      aiResponse += productSuggestions;
    }

    return aiResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}