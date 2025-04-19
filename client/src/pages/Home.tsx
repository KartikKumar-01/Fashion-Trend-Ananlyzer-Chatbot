import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { DiscoverPanel } from "@/components/discover/DiscoverPanel";
import { MobileTabs } from "@/components/layout/MobileTabs";

export default function Home() {
  const [mobileActiveTab, setMobileActiveTab] = useState<"chat" | "discover">("chat");

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* On mobile, show either chat or discover based on active tab */}
        <div 
          className={`w-full lg:w-2/3 flex flex-col h-full lg:block ${
            mobileActiveTab === "chat" ? "block" : "hidden"
          }`}
        >
          <ChatPanel />
        </div>

        {/* On mobile, show as full width when selected */}
        <div 
          className={`w-full h-full lg:w-1/3 flex-col lg:flex ${
            mobileActiveTab === "discover" ? "flex" : "hidden"
          }`}
        >
          <DiscoverPanel />
        </div>
      </div>

      <MobileTabs onTabChange={setMobileActiveTab} />
    </div>
  );
}
