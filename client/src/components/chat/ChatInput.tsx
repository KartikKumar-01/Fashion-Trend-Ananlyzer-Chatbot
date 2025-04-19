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
    <div className="border-t border-gray-700 p-4 bg-gradient-to-r from-background to-purple-900/20">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Ask about fashion trends and styles..."
            className="w-full bg-muted/60 backdrop-blur-sm rounded-full border border-purple-700/30 px-6 py-6 pr-16 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white shadow-lg hover:shadow-purple-900/30 transition-all text-base"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-2 p-2 rounded-full bg-gradient-to-r from-primary to-purple-700 text-white hover:opacity-90 disabled:opacity-50 shadow-md shadow-primary/20"
            disabled={isLoading || !inputValue.trim()}
          >
            <Layers className="h-5 w-5" />
          </Button>
        </div>
      </form>
      <div className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1.5">
        <InfoIcon className="h-3 w-3" />
        <span>Powered by Gemini AI - Ask fashion questions for personalized advice</span>
      </div>
    </div>
  );
}
