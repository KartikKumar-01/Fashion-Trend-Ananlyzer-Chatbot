import { useEffect } from "react";
import { TrendCard } from "./TrendCard";
import { useQuery } from "@tanstack/react-query";
import { Trend } from "@/types";
import { useChat } from "@/hooks/useChat";
import { BarChart2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function TrendsPanel() {
  const { selectedSeason, selectedGender } = useChat();

  const { data: trends, isLoading, error } = useQuery<Trend[]>({
    queryKey: ['/api/trends', selectedSeason, selectedGender],
  });

  if (isLoading) {
    return (
      <div className="hidden lg:flex lg:w-1/3 flex-col h-full bg-background overflow-hidden">
        <div className="bg-gradient-to-r from-purple-900/40 to-background p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold flex items-center">
            <BarChart2Icon className="h-5 w-5 text-primary/80 mr-2" />
            Latest Fashion Trends
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-gradient-to-b from-background to-background/50">
          {[1, 2, 3].map((index) => (
            <div key={index} className="trend-card bg-muted/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-purple-800/20 hover:shadow-purple-900/10 hover:border-purple-800/30 transition-all">
              <Skeleton className="w-full h-48 bg-gray-800/50" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-32 bg-gray-800/50" />
                  <Skeleton className="h-6 w-16 rounded-full bg-gray-800/50" />
                </div>
                <Skeleton className="h-4 w-full mt-1 bg-gray-800/50" />
                <Skeleton className="h-4 w-3/4 mt-1 bg-gray-800/50" />
                <Skeleton className="h-32 w-full mt-4 rounded-lg bg-gray-800/50" />
                <div className="mt-3 flex justify-between items-center">
                  <Skeleton className="h-4 w-24 bg-gray-800/50" />
                  <Skeleton className="h-4 w-20 bg-gray-800/50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !trends) {
    return (
      <div className="hidden lg:flex lg:w-1/3 flex-col h-full bg-background overflow-hidden">
        <div className="bg-gradient-to-r from-purple-900/40 to-background p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold flex items-center">
            <BarChart2Icon className="h-5 w-5 text-primary/80 mr-2" />
            Latest Fashion Trends
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-background/50">
          <div className="text-center p-6 rounded-xl bg-muted/30 backdrop-blur-sm shadow-lg max-w-md">
            <p className="text-gray-300">Failed to load trends. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex lg:w-1/3 flex-col h-full bg-background overflow-hidden">
      <div className="bg-gradient-to-r from-purple-900/40 to-background p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold flex items-center">
          <BarChart2Icon className="h-5 w-5 text-primary/80 mr-2" />
          Latest Fashion Trends
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-gradient-to-b from-background to-background/50">
        {trends.map((trend) => (
          <TrendCard key={trend.id} trend={trend} />
        ))}
      </div>
    </div>
  );
}
