import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPinIcon } from "lucide-react";

interface RegionSelectorProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

const regions = [
  "Global",
  "New York",
  "Paris",
  "London",
  "Tokyo",
  "Seoul",
  "Milan",
  "Berlin"
];

export function RegionSelector({ selectedRegion, onSelectRegion }: RegionSelectorProps) {
  return (
    <div className="flex items-center">
      <Select
        value={selectedRegion}
        onValueChange={onSelectRegion}
      >
        <SelectTrigger 
          className="bg-muted/80 text-white rounded-lg px-3 py-1 h-auto w-32 focus:ring-primary/50 border border-purple-900/30 hover:bg-muted/90 transition-all shadow-sm text-xs"
        >
          <div className="flex items-center gap-1.5">
            <MapPinIcon className="h-3 w-3 text-primary/80" />
            <SelectValue placeholder="Select Region" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-muted/95 backdrop-blur-md border-purple-900/30 rounded-lg shadow-xl">
          {regions.map((region) => (
            <SelectItem 
              key={region} 
              value={region}
              className="my-0.5 rounded hover:bg-purple-900/20 focus:bg-purple-900/30 transition-colors text-sm"
            >
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}