import { GeminiPrompt } from "@shared/schema";

// Gemini API base URL - using standard gemini-pro model
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Function to generate a response using Gemini API
export async function generateGeminiResponse(prompt: GeminiPrompt): Promise<string> {
  // Get API key from environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    throw new Error("API key not configured. Please add GEMINI_API_KEY to your environment variables.");
  }

  // Build context-specific fashion prompt
  let fashionPrompt = "You're a fashion assistant. Help the user with outfit recommendations, style tips, and trend advice. ";
  
  // Add season context if provided
  if (prompt.season && prompt.season !== "All Seasons") {
    fashionPrompt += `Focus on ${prompt.season} fashion trends and recommendations. `;
  }
  
  // Add gender context if provided
  if (prompt.gender) {
    fashionPrompt += `Provide advice specific to ${prompt.gender} fashion. `;
  }
  
  // Add the user's question
  fashionPrompt += `User question: ${prompt.query}`;

  try {
    // Make API request to Gemini
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fashionPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        }
      })
    });

    // Check for successful response
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    // Parse and extract response content
    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
      throw new Error("Unexpected response format from Gemini API");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
