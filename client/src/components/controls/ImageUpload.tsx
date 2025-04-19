import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ImageUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // This would be replaced with actual image upload logic
      // For now, we'll just show a toast after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="bg-muted hover:bg-background text-gray-300 px-3 py-2 h-auto rounded-lg flex items-center gap-2"
        onClick={handleClick}
        disabled={isUploading}
      >
        <ImageIcon className="h-4 w-4" />
        <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </>
  );
}
