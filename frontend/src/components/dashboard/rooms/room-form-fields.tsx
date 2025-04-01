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
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface RoomFormFieldsProps {
  formData: FormDataRoom;
  handleInputChange: (e: any) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previews: string[]; // Changed from single preview to multiple
  handleRemoveImage: (index: number) => void; // Added function to remove an image
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export function RoomFormFields({
  formData,
  handleInputChange,
  handleImageChange,
  previews,
  handleRemoveImage,
  onSubmit,
  isSubmitting,
  register,
  errors,
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
          {previews.length === 0 && (
            <p className="text-sm text-red-500">
              Please upload at least one image
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Room Name</Label>
          <Input
            id="name"
            {...register("name")}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter room title"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message as string}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            value={formData.category}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "category", value } })
            }
          >
            <SelectTrigger className={errors.category ? "border-red-500" : ""}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="twin">Twin</SelectItem>
              <SelectItem value="double">Double</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" {...register("category")} />
          {errors.category && (
            <p className="text-sm text-red-500">
              {errors.category.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="floor">Floor</Label>
          <Input
            id="floor"
            {...register("floor")}
            name="floor"
            value={formData.floor}
            onChange={handleInputChange}
            className={errors.floor ? "border-red-500" : ""}
          />
          {errors.floor && (
            <p className="text-sm text-red-500">
              {errors.floor.message as string}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "status", value } })
            }
          >
            <SelectTrigger className={errors.status ? "border-red-500" : ""}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" {...register("status")} />
          {errors.status && (
            <p className="text-sm text-red-500">
              {errors.status.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="basePrice">Base Price</Label>
          <Input
            id="basePrice"
            {...register("basePrice")}
            name="basePrice"
            type="number"
            value={formData.basePrice}
            onChange={handleInputChange}
            className={errors.basePrice ? "border-red-500" : ""}
          />
          {errors.basePrice && (
            <p className="text-sm text-red-500">
              {errors.basePrice.message as string}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cleaningFee">Cleaning Fee</Label>
          <Input
            id="cleaningFee"
            {...register("cleaningFee")}
            name="cleaningFee"
            type="number"
            value={formData.cleaningFee}
            onChange={handleInputChange}
            className={errors.cleaningFee ? "border-red-500" : ""}
          />
          {errors.cleaningFee && (
            <p className="text-sm text-red-500">
              {errors.cleaningFee.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="bathrooms">Number of Bathrooms</Label>
          <Input
            id="bathrooms"
            {...register("bathrooms")}
            name="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={handleInputChange}
            className={errors.bathrooms ? "border-red-500" : ""}
          />
          {errors.bathrooms && (
            <p className="text-sm text-red-500">
              {errors.bathrooms.message as string}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="roomSize">Room Size (m²)</Label>
          <Input
            id="roomSize"
            {...register("roomSize")}
            name="roomSize"
            type="number"
            value={formData.roomSize}
            onChange={handleInputChange}
            className={errors.roomSize ? "border-red-500" : ""}
          />
          {errors.roomSize && (
            <p className="text-sm text-red-500">
              {errors.roomSize.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="dailyRate">Daily Rate</Label>
          <Input
            id="dailyRate"
            {...register("dailyRate")}
            name="dailyRate"
            type="number"
            value={formData.dailyRate}
            onChange={handleInputChange}
            className={errors.dailyRate ? "border-red-500" : ""}
          />
          {errors.dailyRate && (
            <p className="text-sm text-red-500">
              {errors.dailyRate.message as string}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="maxGuests">Max Guests</Label>
          <Input
            id="maxGuests"
            {...register("maxGuests")}
            name="maxGuests"
            type="number"
            value={formData.maxGuests}
            onChange={handleInputChange}
            className={errors.maxGuests ? "border-red-500" : ""}
          />
          {errors.maxGuests && (
            <p className="text-sm text-red-500">
              {errors.maxGuests.message as string}
            </p>
          )}
        </div>
      </div>

      <Button
        type="button"
        className="mt-6 mb-4"
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
