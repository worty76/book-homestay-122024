import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Room } from "../types";
import { memo } from "react";
import { Trash2, PlusCircle, AlertCircle } from "lucide-react";

export interface FacilitiesTabProps {
  formData: Partial<Room> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Room> | null>>;
}

const FacilitiesTab = memo(({ formData, setFormData }: FacilitiesTabProps) => {
  const updateFacilities = (field: string, value: number) => {
    setFormData((prev) => {
      if (!prev) return null;

      const facilities = prev.facilities || {
        bathrooms: 1,
        roomSize: 0,
        bedsDescription: [],
      };

      return {
        ...prev,
        facilities: {
          ...facilities,
          [field]: value,
        },
      };
    });
  };

  const updateBed = (index: number, field: "type" | "count", value: any) => {
    if (!formData?.facilities?.bedsDescription) return;

    let sanitizedValue = value;
    if (field === "count") {
      const numValue = Number(value);
      sanitizedValue = numValue < 1 ? 1 : numValue;
    }

    const newBeds = [...formData.facilities.bedsDescription];
    newBeds[index] = {
      ...newBeds[index],
      [field]: field === "count" ? Number(sanitizedValue) : sanitizedValue,
    };

    setFormData((prev) => {
      if (!prev) return null;

      const facilities = prev.facilities || {
        bathrooms: 1,
        roomSize: 0,
        bedsDescription: [],
      };

      return {
        ...prev,
        facilities: {
          ...facilities,
          bedsDescription: newBeds,
        },
      };
    });
  };

  const removeBed = (index: number) => {
    if (!formData?.facilities?.bedsDescription) return;

    const newBeds = [...formData.facilities.bedsDescription];
    newBeds.splice(index, 1);

    setFormData((prev) => {
      if (!prev) return null;

      const facilities = prev.facilities || {
        bathrooms: 1,
        roomSize: 0,
        bedsDescription: [],
      };

      return {
        ...prev,
        facilities: {
          ...facilities,
          bedsDescription: newBeds,
        },
      };
    });
  };

  const addBed = () => {
    setFormData((prev) => {
      if (!prev) return null;

      const facilities = prev.facilities || {
        bathrooms: 1,
        roomSize: 0,
        bedsDescription: [],
      };

      const bedsDescription = [
        ...(facilities.bedsDescription || []),
        { type: "Single" as const, count: 1 },
      ];

      return {
        ...prev,
        facilities: {
          ...facilities,
          bedsDescription,
        },
      };
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid gap-2">
        <Label>Number of Bathrooms</Label>
        <Input
          type="number"
          value={formData?.facilities?.bathrooms ?? ""}
          onChange={(e) =>
            updateFacilities("bathrooms", Number(e.target.value))
          }
        />
      </div>
      <div className="grid gap-2">
        <Label>Room Size (m²)</Label>
        <Input
          type="number"
          value={formData?.facilities?.roomSize ?? ""}
          onChange={(e) => updateFacilities("roomSize", Number(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <Label>Number of Bedrooms</Label>
        <Input
          type="number"
          value={formData?.bedrooms ?? ""}
          onChange={(e) =>
            setFormData((prev) =>
              prev ? { ...prev, bedrooms: Number(e.target.value) } : null
            )
          }
        />
      </div>
      <div className="col-span-2">
        <Label className="mb-2 block">Beds</Label>
        {!formData?.facilities?.bedsDescription?.length && (
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <AlertCircle size={16} />
            <span className="text-sm">
              No beds added yet. Add a bed to continue.
            </span>
          </div>
        )}
        {formData?.facilities?.bedsDescription?.map((bed, index) => (
          <div key={index} className="flex gap-2 mb-2 items-center">
            <Select
              value={bed.type}
              onValueChange={(
                value: "Single" | "Double" | "Queen" | "King"
              ) => {
                updateBed(index, "type", value);
              }}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Bed type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Double">Double</SelectItem>
                <SelectItem value="Queen">Queen</SelectItem>
                <SelectItem value="King">King</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Count"
              value={bed.count}
              min="1"
              onChange={(e) => {
                updateBed(index, "count", e.target.value);
              }}
              onBlur={(e) => {
                const value = Number(e.target.value);
                if (value < 1) {
                  updateBed(index, "count", 1);
                }
              }}
              className="w-24"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeBed(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-100"
              aria-label="Remove bed"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addBed}
          className="mt-2 flex items-center gap-1"
        >
          <PlusCircle size={16} />
          Add Bed
        </Button>
      </div>
    </div>
  );
});

FacilitiesTab.displayName = "FacilitiesTab";

export default FacilitiesTab;
