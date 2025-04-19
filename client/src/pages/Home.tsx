
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { DiscoverPanel } from "@/components/discover/DiscoverPanel";
import { GenderToggle } from "@/components/controls/GenderToggle";
import { Button } from "@/components/ui/button";
import { CompassIcon } from "lucide-react";

export default function Home() {
  const [activeView, setActiveView] = useState<"chat" | "discover">("chat");

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      <Header />
      
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className={`w-full lg:w-2/3 flex-col ${activeView === "chat" ? "flex" : "hidden lg:flex"}`}>
          <div className="flex items-center justify-between p-4 bg-muted/50">
            <GenderToggle />
            <Button
              variant="ghost"
              className="lg:hidden bg-muted/80 hover:bg-primary/20"
              onClick={() => setActiveView("discover")}
            >
              <CompassIcon className="h-4 w-4 mr-2" />
              Discover
            </Button>
          </div>
          <ChatPanel />
        </div>

        <div className={`w-full lg:w-1/3 flex-col ${activeView === "discover" ? "flex" : "hidden lg:flex"}`}>
          <div className="lg:hidden flex items-center p-4 bg-muted/50">
            <Button
              variant="ghost"
              className="bg-muted/80 hover:bg-primary/20"
              onClick={() => setActiveView("chat")}
            >
              Back to Chat
            </Button>
          </div>
          <DiscoverPanel />
        </div>
      </div>
    </div>
  );
}
