import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Room } from "../types";
import { memo } from "react";

export interface DescriptionTabProps {
  formData: Partial<Room> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Room> | null>>;
}

const DescriptionTab = memo(
  ({ formData, setFormData }: DescriptionTabProps) => {
    return (
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Description</Label>
          <Textarea
            value={formData?.description || ""}
            onChange={(e) =>
              setFormData((prev) =>
                prev ? { ...prev, description: e.target.value } : null
              )
            }
            rows={5}
          />
        </div>
      </div>
    );
  }
);

DescriptionTab.displayName = "DescriptionTab";

export default DescriptionTab;
