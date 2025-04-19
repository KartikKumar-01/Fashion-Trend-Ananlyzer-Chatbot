import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  content: text("content").notNull(),
  isUser: boolean("is_user").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  userId: true,
  content: true,
  isUser: true,
});

export const trends = pgTable("trends", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull(), // "HOT", "TRENDING", "GROWING", etc.
  dataSeries: text("data_series").notNull(), // JSON.stringify([23, 45, 67, ...])
  weeksActive: integer("weeks_active").notNull(),
  season: text("season"), // "Spring", "Summer", "Fall", "Winter", null for all seasons
  gender: text("gender"), // "Male", "Female", "Unisex"
});

export const insertTrendSchema = createInsertSchema(trends).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertTrend = z.infer<typeof insertTrendSchema>;
export type Trend = typeof trends.$inferSelect;

export const geminiPromptSchema = z.object({
  query: z.string().min(1),
  gender: z.enum(["Male", "Female", "Unisex"]).optional(),
  season: z.string().optional(),
});

export type GeminiPrompt = z.infer<typeof geminiPromptSchema>;
