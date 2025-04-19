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
    <Card className="trend-card bg-muted rounded-xl overflow-hidden shadow-lg border border-gray-700">
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={imageUrl}
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <span className={`${statusColors[status]} text-xs font-semibold px-2 py-1 rounded-full`}>
            {status}
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1">{description}</p>
        
        <div className="mt-4 h-32 rounded-lg overflow-hidden">
          <TrendGraph 
            data={dataSeries} 
            labels={labels} 
            status={status} 
          />
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-gray-500">Trending for {weeksActive} weeks</span>
          <Button variant="link" className="text-primary hover:text-primary/80 text-sm p-0">
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
