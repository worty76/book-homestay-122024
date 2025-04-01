import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Room } from "../types";
import { memo, useMemo } from "react";

export interface AmenitiesTabProps {
  formData: Partial<Room> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Room> | null>>;
}

const AmenitiesTab = memo(({ formData, setFormData }: AmenitiesTabProps) => {
  const amenitiesOptions = useMemo(
    () => [
      "Wifi",
      "Air Conditioning",
      "Heating",
      "Kitchen",
      "TV",
      "Washing Machine",
      "Free Parking",
      "Pool",
      "Hot Tub",
      "Gym",
      "Workspace",
      "Iron",
      "Hair Dryer",
      "First Aid Kit",
    ],
    []
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {amenitiesOptions.map((amenity) => (
        <div key={amenity} className="flex items-center space-x-2">
          <Checkbox
            id={amenity}
            checked={formData?.amenities?.includes(amenity)}
            onCheckedChange={(checked) => {
              const newAmenities = checked
                ? [...(formData?.amenities || []), amenity]
                : formData?.amenities?.filter((a) => a !== amenity) || [];

              setFormData((prev) =>
                prev ? { ...prev, amenities: newAmenities } : null
              );
            }}
          />
          <Label htmlFor={amenity}>{amenity}</Label>
        </div>
      ))}
    </div>
  );
});

AmenitiesTab.displayName = "AmenitiesTab";

export default AmenitiesTab;
