import { useRef, useEffect } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { Spinner } from "@/components/ui/spinner"; 
import { SeasonSelector } from "@/components/controls/SeasonSelector";
import { GenderToggle } from "@/components/controls/GenderToggle";
import { ImageUpload } from "@/components/controls/ImageUpload";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import { Shirt } from "lucide-react";

export function ChatPanel() {
  const { messages, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full flex flex-col h-full border-r border-gray-700">
      {/* Chat Controls */}
      <div className="bg-gradient-to-r from-purple-900/40 to-background p-5 border-b border-gray-700 flex flex-wrap gap-4 items-center justify-between backdrop-blur-sm shadow-sm">
        <div className="flex gap-2 items-center">
          <SeasonSelector />
          <GenderToggle />
        </div>
        <ImageUpload />
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-gradient-to-b from-background to-background/50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 rounded-xl bg-muted/30 backdrop-blur-sm max-w-md">
              <TShirtIcon className="w-16 h-16 text-primary/60 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Fashion Trend Analyzer</h3>
              <p className="text-gray-400">Ask me anything about fashion trends, style advice, or outfit recommendations!</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
              <TShirtIcon className="h-5 w-5 text-white" />
            </div>
            <div className="chat-bubble-bot bg-muted/80 backdrop-blur-sm p-4 rounded-2xl rounded-tl-none">
              <div className="flex space-x-2 px-2">
                <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <ChatInput />
    </div>
  );
}

function TShirtIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/>
    </svg>
  );
}
