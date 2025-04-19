import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/useChat";
import { Gender } from "@/types";

export function GenderToggle() {
  const { selectedGender, setSelectedGender } = useChat();

  const handleGenderChange = (gender: Gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className="flex items-center bg-muted/80 rounded-lg overflow-hidden border border-purple-900/30 shadow-sm">
      <Button
        type="button"
        variant="ghost"
        className={`px-3 py-1.5 h-auto rounded-l-lg transition-all ${
          selectedGender === "Male" 
            ? "bg-gradient-to-r from-primary to-purple-800 text-white font-medium shadow-sm shadow-primary/20" 
            : "text-gray-300 hover:bg-muted/90"
        }`}
        onClick={() => handleGenderChange("Male")}
      >
        Male
      </Button>
      <Button
        type="button"
        variant="ghost"
        className={`px-3 py-1.5 h-auto transition-all ${
          selectedGender === "Female" 
            ? "bg-gradient-to-r from-primary to-purple-800 text-white font-medium shadow-sm shadow-primary/20" 
            : "text-gray-300 hover:bg-muted/90"
        }`}
        onClick={() => handleGenderChange("Female")}
      >
        Female
      </Button>
      <Button
        type="button"
        variant="ghost"
        className={`px-3 py-1.5 h-auto rounded-r-lg transition-all ${
          selectedGender === "Unisex" 
            ? "bg-gradient-to-r from-primary to-purple-800 text-white font-medium shadow-sm shadow-primary/20" 
            : "text-gray-300 hover:bg-muted/90"
        }`}
        onClick={() => handleGenderChange("Unisex")}
      >
        Unisex
      </Button>
    </div>
  );
}
