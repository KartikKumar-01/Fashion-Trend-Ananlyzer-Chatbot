import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export const seasonColors = {
  Spring: "text-green-400",
  Summer: "text-yellow-400",
  Fall: "text-orange-400",
  Winter: "text-blue-400",
  "All Seasons": "text-gray-400",
};

export const genderColors = {
  Male: "bg-primary text-white",
  Female: "bg-accent text-white",
  Unisex: "bg-secondary text-white",
};

export const statusColors = {
  HOT: "bg-accent/20 text-accent",
  TRENDING: "bg-secondary/20 text-secondary",
  GROWING: "bg-green-500/20 text-green-500",
  NEW: "bg-blue-500/20 text-blue-500",
  STABLE: "bg-yellow-500/20 text-yellow-500",
};

export const statusColorMap = {
  HOT: "#EC4899", // pink-500
  TRENDING: "#4F46E5", // indigo-600
  GROWING: "#10B981", // green-500
  NEW: "#3B82F6", // blue-500
  STABLE: "#F59E0B", // yellow-500
};

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
