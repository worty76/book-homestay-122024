import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Room } from "../types";
import { memo } from "react";

export interface PricingTabProps {
  formData: Partial<Room> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Room> | null>>;
}

const PricingTab = memo(({ formData, setFormData }: PricingTabProps) => {
  const updatePricing = (field: string, value: number) => {
    setFormData((prev) => {
      if (!prev) return null;

      const pricing = prev.pricing || {
        basePrice: 0,
        cleaningFee: 0,
        securityDeposit: 0,
      };

      return {
        ...prev,
        pricing: {
          ...pricing,
          [field]: value,
        },
      };
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid gap-2">
        <Label>Base Price</Label>
        <Input
          type="number"
          value={formData?.pricing?.basePrice ?? ""}
          onChange={(e) => updatePricing("basePrice", Number(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <Label>Cleaning Fee</Label>
        <Input
          type="number"
          value={formData?.pricing?.cleaningFee ?? ""}
          onChange={(e) => updatePricing("cleaningFee", Number(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <Label>Security Deposit</Label>
        <Input
          type="number"
          value={formData?.pricing?.securityDeposit ?? ""}
          onChange={(e) =>
            updatePricing("securityDeposit", Number(e.target.value))
          }
        />
      </div>
      <div className="grid gap-2">
        <Label>Weekend Rate</Label>
        <Input
          type="number"
          value={formData?.pricing?.weekendRate ?? ""}
          onChange={(e) => updatePricing("weekendRate", Number(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <Label>Weekly Discount (%)</Label>
        <Input
          type="number"
          value={formData?.pricing?.weeklyDiscount ?? ""}
          onChange={(e) =>
            updatePricing("weeklyDiscount", Number(e.target.value))
          }
        />
      </div>
      <div className="grid gap-2">
        <Label>Monthly Discount (%)</Label>
        <Input
          type="number"
          value={formData?.pricing?.monthlyDiscount ?? ""}
          onChange={(e) =>
            updatePricing("monthlyDiscount", Number(e.target.value))
          }
        />
      </div>
    </div>
  );
});

PricingTab.displayName = "PricingTab";

export default PricingTab;
