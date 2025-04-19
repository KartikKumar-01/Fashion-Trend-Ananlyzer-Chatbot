import { useState } from "react";
import { MessageSquare, BarChart2 } from "lucide-react";

interface MobileTabsProps {
  onTabChange: (tab: "chat" | "trends") => void;
}

export function MobileTabs({ onTabChange }: MobileTabsProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "trends">("chat");

  const handleTabChange = (tab: "chat" | "trends") => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="lg:hidden border-t border-gray-700 bg-muted flex">
      <button
        className={`flex-1 py-3 font-medium flex items-center justify-center ${
          activeTab === "chat" ? "text-white" : "text-gray-400"
        }`}
        onClick={() => handleTabChange("chat")}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Chat
      </button>
      <button
        className={`flex-1 py-3 font-medium flex items-center justify-center ${
          activeTab === "trends" ? "text-white" : "text-gray-400"
        }`}
        onClick={() => handleTabChange("trends")}
      >
        <BarChart2 className="h-4 w-4 mr-2" />
        Trends
      </button>
    </div>
  );
}
