import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/useChat";
import { Gender } from "@/types";

export function GenderToggle() {
  const { selectedGender, setSelectedGender } = useChat();

  const handleGenderChange = (gender: Gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className="flex items-center bg-muted rounded-lg">
      <Button
        type="button"
        variant={selectedGender === "Male" ? "default" : "ghost"}
        className={`px-3 py-2 h-auto rounded-l-lg ${selectedGender === "Male" ? "bg-primary text-white" : "text-gray-300 hover:bg-muted"}`}
        onClick={() => handleGenderChange("Male")}
      >
        Male
      </Button>
      <Button
        type="button"
        variant={selectedGender === "Female" ? "default" : "ghost"}
        className={`px-3 py-2 h-auto ${selectedGender === "Female" ? "bg-primary text-white" : "text-gray-300 hover:bg-muted"}`}
        onClick={() => handleGenderChange("Female")}
      >
        Female
      </Button>
      <Button
        type="button"
        variant={selectedGender === "Unisex" ? "default" : "ghost"}
        className={`px-3 py-2 h-auto rounded-r-lg ${selectedGender === "Unisex" ? "bg-primary text-white" : "text-gray-300 hover:bg-muted"}`}
        onClick={() => handleGenderChange("Unisex")}
      >
        Unisex
      </Button>
    </div>
  );
}
