export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Trend {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  status: 'HOT' | 'TRENDING' | 'GROWING' | 'NEW' | 'STABLE';
  dataSeries: number[];
  labels: string[];
  weeksActive: number;
  season?: string;
  gender?: string;
}

export type Season = 'All Seasons' | 'Spring' | 'Summer' | 'Fall' | 'Winter';
export type Gender = 'Male' | 'Female' | 'Unisex';

export interface ChatContextType {
  messages: ChatMessage[];
  isLoading: boolean;
  selectedSeason: Season;
  selectedGender: Gender;
  addMessage: (message: string, isUser: boolean) => void;
  sendMessage: (message: string) => Promise<void>;
  setSelectedSeason: (season: Season) => void;
  setSelectedGender: (gender: Gender) => void;
  uploadImage?: (file: File) => Promise<void>;
}
