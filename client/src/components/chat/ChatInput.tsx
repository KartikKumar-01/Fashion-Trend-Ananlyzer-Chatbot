import { useState, FormEvent } from "react";
import { Layers, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/useChat";

export function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage, isLoading } = useChat();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const message = inputValue;
    setInputValue("");
    await sendMessage(message);
  };

  return (
    <div className="border-t border-gray-700 p-4 bg-card">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          placeholder="Ask about fashion trends and styles..."
          className="w-full bg-muted rounded-lg border border-gray-700 px-4 py-6 pr-12 focus:outline-none focus:ring-2 focus:ring-primary text-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80 disabled:opacity-50"
          disabled={isLoading || !inputValue.trim()}
        >
          <Layers className="h-5 w-5" />
        </Button>
      </form>
      <div className="text-xs text-muted-foreground mt-2 flex items-center">
        <InfoIcon className="h-3 w-3 mr-1" />
        <span>Powered by Gemini AI - Ask fashion questions for personalized advice</span>
      </div>
    </div>
  );
}
