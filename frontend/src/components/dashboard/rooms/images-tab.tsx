import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Room } from "./types";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ImagesTabProps {
  formData: Partial<Room> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Room> | null>>;
  setNewImages: React.Dispatch<React.SetStateAction<FileList | null>>;
}

const ImagesTab = ({ formData, setFormData, setNewImages }: ImagesTabProps) => {
  // Track new images separately from existing ones
  const [localImages, setLocalImages] = useState<File[]>([]);
  const [localPreviews, setLocalPreviews] = useState<string[]>([]);

  // Clean up previews when component unmounts or formData changes
  useEffect(() => {
    return () => {
      // Cleanup preview URLs to prevent memory leaks
      localPreviews.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [localPreviews]);

  // Reset local state when editing a different room
  useEffect(() => {
    // Clear local images and previews when room changes
    setLocalImages([]);
    setLocalPreviews([]);
  }, [formData?._id]);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Convert FileList to array
      const newFiles = Array.from(files);

      // Create preview URLs
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      // Update local state
      setLocalImages((prev) => [...prev, ...newFiles]);
      setLocalPreviews((prev) => [...prev, ...newPreviews]);

      // Create a new FileList-like object for all selected files
      const dataTransfer = new DataTransfer();
      [...localImages, ...newFiles].forEach((file) => {
        dataTransfer.items.add(file);
      });

      // Pass all files to parent component
      setNewImages(dataTransfer.files);
    }
  };

  // Remove a local (newly added) image
  const handleRemoveLocalImage = (index: number) => {
    // Get the URL to revoke
    const urlToRevoke = localPreviews[index];
    URL.revokeObjectURL(urlToRevoke);

    // Remove from arrays
    const newLocalImages = [...localImages];
    newLocalImages.splice(index, 1);
    setLocalImages(newLocalImages);

    const newLocalPreviews = [...localPreviews];
    newLocalPreviews.splice(index, 1);
    setLocalPreviews(newLocalPreviews);

    // Update FileList for parent component
    if (newLocalImages.length > 0) {
      const dataTransfer = new DataTransfer();
      newLocalImages.forEach((file) => {
        dataTransfer.items.add(file);
      });
      setNewImages(dataTransfer.files);
    } else {
      setNewImages(null);
    }
  };

  // Remove an existing image
  const handleRemoveExistingImage = (imageUrl: string) => {
    if (formData && formData.image) {
      // Filter out the removed image URL
      const updatedUrls = formData.image.filter((url) => url !== imageUrl);

      // Update formData
      setFormData({
        ...formData,
        image: updatedUrls,
      });
    }
  };

  return (
    <div className="grid gap-4">
      {formData?.image && formData.image.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Current Images</h3>
          <div className="flex flex-wrap gap-4">
            {formData.image.map((url, index) => (
              <div key={`existing-${index}`} className="relative">
                <img
                  src={url}
                  alt={`Room ${index + 1}`}
                  className="h-24 w-24 object-cover rounded-md border border-gray-200"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load image: ${url}`);
                    e.currentTarget.src =
                      "https://placehold.co/100x100?text=Error";
                  }}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                  onClick={() => handleRemoveExistingImage(url)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display newly added images */}
      {localPreviews.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">New Images</h3>
          <div className="flex flex-wrap gap-4">
            {localPreviews.map((url, index) => (
              <div key={`new-${index}`} className="relative">
                <img
                  src={url}
                  alt={`New ${index + 1}`}
                  className="h-24 w-24 object-cover rounded-md border border-gray-200"
                  loading="lazy"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                  onClick={() => handleRemoveLocalImage(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image upload control */}
      <div className="grid gap-2">
        <Label>Add Images</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <p className="text-sm text-muted-foreground">
          Upload multiple images. Supported formats: JPG, PNG, WebP
        </p>
      </div>

      {/* Debug information */}
      <div className="mt-4 p-2 bg-gray-50 rounded-md text-xs text-gray-500">
        <p>Debug Info:</p>
        <p>Existing images: {formData?.imageUrls?.length || 0}</p>
        <p>New images: {localImages.length}</p>
        <p>Room ID: {formData?._id}</p>
      </div>
    </div>
  );
};

export default ImagesTab;
