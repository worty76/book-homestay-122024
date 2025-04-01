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

    const newBeds = [...formData.facilities.bedsDescription];
    newBeds[index] = {
      ...newBeds[index],
      [field]: field === "count" ? Number(value) : value,
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
        {formData?.facilities?.bedsDescription?.map((bed, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <Select
              value={bed.type}
              onValueChange={(
                value: "Single" | "Double" | "Queen" | "King"
              ) => {
                updateBed(index, "type", value);
              }}
            >
              <SelectTrigger>
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
              onChange={(e) => {
                updateBed(index, "count", e.target.value);
              }}
            />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addBed}>
          Add Bed
        </Button>
      </div>
    </div>
  );
});

FacilitiesTab.displayName = "FacilitiesTab";

export default FacilitiesTab;
