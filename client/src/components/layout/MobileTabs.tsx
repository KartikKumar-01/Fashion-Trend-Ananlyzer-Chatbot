import { useState } from "react";
import { MessageSquare, CompassIcon } from "lucide-react";

interface MobileTabsProps {
  onTabChange: (tab: "chat" | "discover") => void;
}

export function MobileTabs({ onTabChange }: MobileTabsProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "discover">("chat");

  const handleTabChange = (tab: "chat" | "discover") => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="lg:hidden border-t border-gray-700 bg-gradient-to-r from-background to-muted flex">
      <button
        className={`flex-1 py-3 font-medium flex items-center justify-center ${
          activeTab === "chat" 
            ? "text-white bg-gradient-to-b from-primary/10 to-transparent" 
            : "text-gray-400"
        }`}
        onClick={() => handleTabChange("chat")}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Chat
      </button>
      <button
        className={`flex-1 py-3 font-medium flex items-center justify-center ${
          activeTab === "discover" 
            ? "text-white bg-gradient-to-b from-primary/10 to-transparent" 
            : "text-gray-400"
        }`}
        onClick={() => handleTabChange("discover")}
      >
        <CompassIcon className="h-4 w-4 mr-2" />
        Discover
      </button>
    </div>
  );
}
