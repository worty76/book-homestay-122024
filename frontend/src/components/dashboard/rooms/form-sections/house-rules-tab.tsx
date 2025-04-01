import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Room } from "../types";
import { memo } from "react";

export interface HouseRulesTabProps {
  formData: Partial<Room> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Room> | null>>;
}

const HouseRulesTab = memo(({ formData, setFormData }: HouseRulesTabProps) => {
  const updateHouseRule = (field: string, value: boolean | string) => {
    setFormData((prev) => {
      if (!prev) return null;

      const houseRules = prev.houseRules || {
        smokingAllowed: false,
        petsAllowed: false,
        partiesAllowed: false,
        checkInTime: "14:00",
        checkOutTime: "12:00",
      };

      return {
        ...prev,
        houseRules: {
          ...houseRules,
          [field]: value,
        },
      };
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center justify-between">
        <Label>Smoking Allowed</Label>
        <Switch
          checked={formData?.houseRules?.smokingAllowed || false}
          onCheckedChange={(checked) =>
            updateHouseRule("smokingAllowed", checked)
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <Label>Pets Allowed</Label>
        <Switch
          checked={formData?.houseRules?.petsAllowed || false}
          onCheckedChange={(checked) => updateHouseRule("petsAllowed", checked)}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label>Parties Allowed</Label>
        <Switch
          checked={formData?.houseRules?.partiesAllowed || false}
          onCheckedChange={(checked) =>
            updateHouseRule("partiesAllowed", checked)
          }
        />
      </div>
      <div className="grid gap-2">
        <Label>Check-in Time</Label>
        <Input
          type="time"
          value={formData?.houseRules?.checkInTime || ""}
          onChange={(e) => updateHouseRule("checkInTime", e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label>Check-out Time</Label>
        <Input
          type="time"
          value={formData?.houseRules?.checkOutTime || ""}
          onChange={(e) => updateHouseRule("checkOutTime", e.target.value)}
        />
      </div>
    </div>
  );
});

HouseRulesTab.displayName = "HouseRulesTab";

export default HouseRulesTab;
