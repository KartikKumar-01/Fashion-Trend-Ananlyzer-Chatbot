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
        <div className="bg-muted p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold flex items-center">
            <BarChart2Icon className="h-5 w-5 text-accent mr-2" />
            Latest Fashion Trends
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          {[1, 2, 3].map((index) => (
            <div key={index} className="trend-card bg-muted rounded-xl overflow-hidden shadow-lg border border-gray-700">
              <Skeleton className="w-full h-48" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mt-1" />
                <Skeleton className="h-4 w-3/4 mt-1" />
                <Skeleton className="h-32 w-full mt-4 rounded-lg" />
                <div className="mt-3 flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
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
        <div className="bg-muted p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold flex items-center">
            <BarChart2Icon className="h-5 w-5 text-accent mr-2" />
            Latest Fashion Trends
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">Failed to load trends. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex lg:w-1/3 flex-col h-full bg-background overflow-hidden">
      <div className="bg-muted p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold flex items-center">
          <BarChart2Icon className="h-5 w-5 text-accent mr-2" />
          Latest Fashion Trends
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {trends.map((trend) => (
          <TrendCard key={trend.id} trend={trend} />
        ))}
      </div>
    </div>
  );
}
