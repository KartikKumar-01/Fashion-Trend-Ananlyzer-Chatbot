import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/types";
import { formatDate } from "@/lib/utils";
import { Shirt, User } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { content, isUser, timestamp } = message;

  if (isUser) {
    return (
      <div className="flex items-start justify-end space-x-3 transform transition-all">
        <div className="chat-bubble-user bg-gradient-to-br from-primary to-purple-700 p-3 sm:p-4 rounded-2xl rounded-tr-none shadow-lg shadow-primary/20 max-w-[90%] sm:max-w-[85%] hover:shadow-xl hover:shadow-primary/30 transition-all">
          <p className="text-white leading-relaxed">{content}</p>
          <div className="text-xs text-white/70 text-right mt-2 font-light">
            {formatDate(timestamp)}
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center flex-shrink-0 shadow-md border border-gray-700">
          <User className="h-5 w-5 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 transform transition-all">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 border border-purple-500/30">
        <Shirt className="h-5 w-5 text-white" />
      </div>
      <div className="chat-bubble-bot bg-muted/80 backdrop-blur-sm p-4 rounded-2xl rounded-tl-none shadow-lg max-w-[85%] hover:bg-muted/90 transition-all border border-purple-500/10">
        <div className="text-gray-100 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
        <div className="text-xs text-gray-400 mt-2 font-light">{formatDate(timestamp)}</div>
      </div>
    </div>
  );
}

function formatContent(content: string): string {
  // Replace markdown image syntax with HTML img tags
  let formatted = content.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="w-full max-w-sm rounded-md my-3 shadow-lg" />');

  // Convert markdown-style lists to HTML
  formatted = formatted.replace(/\n- ([^\n]+)/g, '<li>$1</li>');
  if (formatted.includes('<li>')) {
    formatted = formatted.replace(/<li>/g, '<ul class="list-disc ml-5 mt-2 space-y-1"><li>');
    formatted = formatted.replace(/<\/li>(?!\s*<li>)/g, '</li></ul>');
  }
  
  // Add spacing between paragraphs
  formatted = formatted.replace(/\n\n/g, '</p><p class="mt-2 text-gray-200">');
  
  // Bold text between ** markers
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<span class="font-semibold text-white">$1</span>');
  
  // Handle markdown headers
  formatted = formatted.replace(/### (.*?)\n/g, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>');
  formatted = formatted.replace(/## (.*?)\n/g, '<h2 class="text-xl font-bold text-white mt-4 mb-2">$1</h2>');
  formatted = formatted.replace(/# (.*?)\n/g, '<h1 class="text-2xl font-bold text-white mt-4 mb-3">$1</h1>');
  
  // Convert horizontal rules
  formatted = formatted.replace(/---/g, '<hr class="my-4 border-gray-600" />');
  
  // Wrap in paragraph tags if not already
  if (!formatted.startsWith('<p>') && 
      !formatted.startsWith('<h1>') && 
      !formatted.startsWith('<h2>') && 
      !formatted.startsWith('<h3>') && 
      !formatted.startsWith('<img')) {
    formatted = `<p class="text-gray-200">${formatted}</p>`;
  }
  
  return formatted;
}
