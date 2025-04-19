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
        <SelectTrigger className="bg-muted text-white rounded-lg px-3 py-2 w-36 h-auto focus:ring-primary">
          <SelectValue placeholder="Select Season" />
        </SelectTrigger>
        <SelectContent className="bg-muted border-gray-700">
          {seasons.map((season) => (
            <SelectItem 
              key={season} 
              value={season}
              className={`${seasonColors[season as keyof typeof seasonColors]}`}
            >
              {season}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
