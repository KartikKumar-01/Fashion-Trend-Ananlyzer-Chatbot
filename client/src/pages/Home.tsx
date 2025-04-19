
import { useLocation } from "wouter";
import { Header } from "@/components/layout/Header";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { DiscoverPanel } from "@/components/discover/DiscoverPanel";
import { Button } from "@/components/ui/button";
import { CompassIcon, MessageSquare } from "lucide-react";

export default function Home() {
  const [location, setLocation] = useLocation();
  const view = location === "/" ? "chat" : "discover";

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      <Header />
      
      <div className="flex items-center justify-center gap-4 p-4 bg-muted/50">
        <Button
          variant={view === "chat" ? "default" : "ghost"}
          onClick={() => setLocation("/")}
          className="flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          Chat
        </Button>
        <Button
          variant={view === "discover" ? "default" : "ghost"}
          onClick={() => setLocation("/discover")}
          className="flex items-center gap-2"
        >
          <CompassIcon className="h-4 w-4" />
          Discover
        </Button>
      </div>

      <div className="flex-1 overflow-hidden max-w-screen-2xl mx-auto w-full">
        {view === "chat" ? (
          <ChatPanel />
        ) : (
          <DiscoverPanel />
        )}
      </div>
    </div>
  );
}
