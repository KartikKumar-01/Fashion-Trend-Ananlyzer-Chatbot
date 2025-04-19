import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateGeminiResponse } from "./services/gemini";
import { geminiPromptSchema } from "@shared/schema";
import { z } from "zod";
import { getFilteredTrends } from "../client/src/data/trendData";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for chat
  app.post('/api/chat', async (req, res) => {
    try {
      // Validate the request body
      const validatedData = geminiPromptSchema.parse(req.body);
      
      // Generate response using Gemini API
      const response = await generateGeminiResponse(validatedData);
      
      // Return the response
      res.json({ response });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid input", 
          errors: error.errors 
        });
      } else {
        console.error('Error processing chat request:', error);
        res.status(500).json({ 
          message: "Failed to generate response" 
        });
      }
    }
  });

  // API endpoint for trends
  app.get('/api/trends', (req, res) => {
    try {
      const { season = 'All Seasons', gender = 'Unisex' } = req.query;
      
      // Get trends filtered by season and gender
      const trends = getFilteredTrends(
        season as string, 
        gender as string
      );
      
      res.json(trends);
    } catch (error) {
      console.error('Error fetching trends:', error);
      res.status(500).json({ 
        message: "Failed to fetch trends" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
