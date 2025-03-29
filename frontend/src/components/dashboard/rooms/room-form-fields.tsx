import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, Upload, X } from "lucide-react";
import { FormDataRoom } from "./types";

interface RoomFormFieldsProps {
  formData: FormDataRoom;
  handleInputChange: (e: any) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previews: string[]; // Changed from single preview to multiple
  handleRemoveImage: (index: number) => void; // Added function to remove an image
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export function RoomFormFields({
  formData,
  handleInputChange,
  handleImageChange,
  previews,
  handleRemoveImage,
  onSubmit,
  isSubmitting,
}: RoomFormFieldsProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label>Room Images</Label>
        <div className="flex flex-col items-center gap-4">
          {/* Show image previews if they exist */}
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-2 w-full">
              {previews.map((preview, index) => (
                <div key={index} className="relative h-32 w-32">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="h-32 w-32 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Image upload area */}
          <div className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed">
            <div className="flex flex-col items-center gap-2">
              <ImagePlus className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-500">
                Drop your images here or click to upload
              </span>
            </div>
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
            multiple // Allow multiple file selection
          />
          <Label
            htmlFor="image-upload"
            className="flex cursor-pointer items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Choose Images
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Room Title</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter room title"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) =>
              handleInputChange({ target: { name: "category", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="room">Room</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="floor">Floor</Label>
          <Select
            onValueChange={(value) =>
              handleInputChange({ target: { name: "floor", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Floor 1</SelectItem>
              <SelectItem value="2">Floor 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="basePrice">Base Price</Label>
          <Input
            id="basePrice"
            name="basePrice"
            type="number"
            value={formData.basePrice}
            onChange={handleInputChange}
            placeholder="Enter base price"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cleaningFee">Cleaning Fee</Label>
          <Input
            id="cleaningFee"
            name="cleaningFee"
            type="number"
            value={formData.cleaningFee}
            onChange={handleInputChange}
            placeholder="Enter cleaning fee"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleInputChange}
            placeholder="Number of bathrooms"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="roomSize">Room Size (m²)</Label>
          <Input
            id="roomSize"
            name="roomSize"
            type="number"
            value={formData.roomSize}
            onChange={handleInputChange}
            placeholder="Enter room size"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select
            onValueChange={(value) =>
              handleInputChange({ target: { name: "status", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dailyRate">Daily Rate ($)</Label>
          <Input
            id="dailyRate"
            name="dailyRate"
            type="number"
            value={formData.dailyRate}
            onChange={handleInputChange}
            placeholder="Enter daily rate"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="maxGuests">Maximum Guests</Label>
          <Input
            id="maxGuests"
            name="maxGuests"
            type="number"
            value={formData.maxGuests}
            onChange={handleInputChange}
            placeholder="Enter maximum guests"
          />
        </div>
      </div>

      <Button
        type="button"
        className="mt-4"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Adding Room...
          </>
        ) : (
          "Add Room"
        )}
      </Button>
    </div>
  );
}
