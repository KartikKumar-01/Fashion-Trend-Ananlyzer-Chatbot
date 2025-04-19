import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";

interface MoodFiltersProps {
  selectedMood: string;
  onSelectMood: (mood: string) => void;
}

const moods = ["All", "Chill", "Bold", "Retro", "Casual", "Elegant"];

export function MoodFilters({ selectedMood, onSelectMood }: MoodFiltersProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs text-gray-400">Mood:</span>
      <ToggleGroup 
        type="single" 
        variant="outline" 
        value={selectedMood}
        onValueChange={(value) => value && onSelectMood(value)}
        className="bg-muted/60 rounded-lg border border-purple-900/20 p-0.5"
      >
        {moods.map((mood) => (
          <ToggleGroupItem 
            key={mood} 
            value={mood}
            size="sm"
            className={`px-2 py-0.5 text-xs rounded data-[state=on]:bg-gradient-to-r data-[state=on]:from-primary/30 data-[state=on]:to-purple-800/30 data-[state=on]:text-white data-[state=on]:shadow-sm data-[state=on]:shadow-purple-900/10`}
          >
            {mood}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}