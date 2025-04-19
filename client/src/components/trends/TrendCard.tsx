import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendGraph } from "./TrendGraph";
import { Trend } from "@/types";
import { statusColors } from "@/lib/utils";

interface TrendCardProps {
  trend: Trend;
}

export function TrendCard({ trend }: TrendCardProps) {
  const { 
    id, title, description, imageUrl, status, 
    dataSeries, labels, weeksActive 
  } = trend;

  return (
    <Card className="trend-card bg-muted/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-purple-800/20 hover:shadow-lg hover:shadow-purple-900/10 hover:border-purple-800/30 transition-all">
      <div className="relative w-full h-48 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
        <img 
          src={imageUrl}
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`${statusColors[status]} text-xs font-semibold px-2 py-1 rounded-full absolute top-3 right-3 z-20 shadow-lg`}>
          {status}
        </span>
      </div>
      <CardContent className="p-5">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium text-white/95">{title}</h3>
          <p className="text-gray-300 text-sm mt-1.5 line-clamp-2">{description}</p>
        </div>
        
        <div className="mt-4 h-32 rounded-lg overflow-hidden bg-gradient-to-r from-gray-900/30 to-black/30 p-2 border border-gray-800/30">
          <TrendGraph 
            data={dataSeries} 
            labels={labels} 
            status={status} 
          />
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">Trending for {weeksActive} weeks</span>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-primary hover:text-white hover:bg-primary/80 text-sm px-3 py-1 rounded-full border border-primary/20"
          >
            Explore
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
