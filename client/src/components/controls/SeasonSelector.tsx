import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Season } from "@/types";
import { useChat } from "@/hooks/useChat";
import { seasonColors } from "@/lib/utils";

export function SeasonSelector() {
  const { selectedSeason, setSelectedSeason } = useChat();
  
  const seasons: Season[] = [
    "All Seasons",
    "Spring",
    "Summer",
    "Fall",
    "Winter"
  ];

  return (
    <div className="relative">
      <Select
        value={selectedSeason}
        onValueChange={(value) => setSelectedSeason(value as Season)}
      >
        <SelectTrigger className="bg-muted/80 text-white rounded-lg px-4 py-1.5 w-40 h-auto focus:ring-primary/50 border border-purple-900/30 hover:bg-muted/90 transition-all shadow-sm">
          <SelectValue placeholder="Select Season" />
        </SelectTrigger>
        <SelectContent className="bg-muted/95 backdrop-blur-md border-purple-900/30 rounded-lg shadow-xl">
          {seasons.map((season) => (
            <SelectItem 
              key={season} 
              value={season}
              className={`${seasonColors[season as keyof typeof seasonColors]} my-0.5 rounded hover:bg-purple-900/20 focus:bg-purple-900/30 transition-colors`}
            >
              {season}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
