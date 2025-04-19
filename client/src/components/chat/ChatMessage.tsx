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
      <div className="flex items-start justify-end space-x-2 mb-6">
        <div className="chat-bubble-user bg-primary p-3 rounded-lg max-w-[80%]">
          <p className="text-white">{content}</p>
          <div className="text-xs text-white/70 text-right mt-1">
            {formatDate(timestamp)}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-2 mb-6">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <Shirt className="h-4 w-4 text-white" />
      </div>
      <div className="chat-bubble-bot bg-muted p-3 rounded-lg max-w-[80%]">
        <div className="text-gray-200" dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
        <div className="text-xs text-gray-400 mt-1">{formatDate(timestamp)}</div>
      </div>
    </div>
  );
}

function formatContent(content: string): string {
  // Convert markdown-style lists to HTML
  let formatted = content.replace(/\n- ([^\n]+)/g, '<li>$1</li>');
  if (formatted.includes('<li>')) {
    formatted = formatted.replace(/<li>/g, '<ul class="list-disc ml-5 mt-2 space-y-1"><li>');
    formatted = formatted.replace(/<\/li>(?!\s*<li>)/g, '</li></ul>');
  }
  
  // Add spacing between paragraphs
  formatted = formatted.replace(/\n\n/g, '</p><p class="mt-2 text-gray-200">');
  
  // Bold text between ** markers
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<span class="font-medium text-white">$1</span>');
  
  // Wrap in paragraph tags if not already
  if (!formatted.startsWith('<p>')) {
    formatted = `<p class="text-gray-200">${formatted}</p>`;
  }
  
  return formatted;
}
