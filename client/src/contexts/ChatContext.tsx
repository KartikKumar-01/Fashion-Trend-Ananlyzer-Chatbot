import { createContext, useState, useEffect, ReactNode } from "react";
import { ChatContextType, ChatMessage, Season, Gender } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export const ChatContext = createContext<ChatContextType>({
  messages: [],
  isLoading: false,
  selectedSeason: "All Seasons",
  selectedGender: "Unisex",
  addMessage: () => {},
  sendMessage: async () => {},
  setSelectedSeason: () => {},
  setSelectedGender: () => {},
});

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<Season>("All Seasons");
  const [selectedGender, setSelectedGender] = useState<Gender>("Unisex");
  const { toast } = useToast();

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: uuidv4(),
      content: "Hi there! I'm your Fashion Trend Analyzer assistant. Ask me anything about fashion trends, style advice, or outfit recommendations!",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: ChatMessage = {
      id: uuidv4(),
      content,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message to chat
    addMessage(content, true);
    
    // Set loading state
    setIsLoading(true);

    try {
      // Send message to Gemini API
      const response = await apiRequest("POST", "/api/chat", {
        query: content,
        gender: selectedGender,
        season: selectedSeason !== "All Seasons" ? selectedSeason : undefined,
      });

      const data = await response.json();
      
      // Add AI response to chat
      addMessage(data.response, false);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    messages,
    isLoading,
    selectedSeason,
    selectedGender,
    addMessage,
    sendMessage,
    setSelectedSeason,
    setSelectedGender,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
