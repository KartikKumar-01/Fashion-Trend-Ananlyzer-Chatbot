import { GeminiPrompt } from "@shared/schema";

// Updated Gemini API base URL for the v1beta version
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Function to generate a response using Gemini API
export async function generateGeminiResponse(prompt: GeminiPrompt): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    throw new Error("API key not configured. Please add GEMINI_API_KEY to your environment variables.");
  }

  // Build context-specific fashion prompt
  let fashionPrompt = "You're a fashion assistant. Help the user with outfit recommendations, style tips, and trend advice. ";

  if (prompt.season && prompt.season !== "All Seasons") {
    fashionPrompt += `Focus on ${prompt.season} fashion trends and recommendations. `;
  }

  if (prompt.gender) {
    fashionPrompt += `Provide advice specific to ${prompt.gender} fashion. `;
  }

  fashionPrompt += `User question: ${prompt.query}`;

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

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}