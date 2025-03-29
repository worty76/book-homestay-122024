import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Room } from "./types";
import { useState, useEffect, memo, useMemo, Suspense, lazy } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { debounce } from "lodash";

interface EditRoomDialogProps {
  room: Room | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedRoom: Room, files?: FileList) => Promise<void>;
}

interface BasicInfoTabProps {
  formData: Partial<Room> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Room> | null>>;
}

// Move BasicInfoTab outside of EditRoomDialog component
const BasicInfoTab = memo(
  ({ formData, setFormData }: BasicInfoTabProps) => (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid gap-2">
        <Label>Room Name</Label>
        <Input
          value={formData?.name || ""}
          onChange={(e) => {
            setFormData((prev) =>
              prev ? { ...prev, name: e.target.value } : null
            );
          }}
        />
      </div>
      <div className="grid gap-2">
        <Label>Category</Label>
        <Select
          value={formData?.category || ""}
          onValueChange={(value) =>
            setFormData((prev) => (prev ? { ...prev, category: value } : null))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="deluxe">Deluxe</SelectItem>
            <SelectItem value="twin">Twin</SelectItem>
            <SelectItem value="double">Double</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Floor</Label>
        <Select
          value={String(formData?.floor || "")}
          onValueChange={(value) =>
            setFormData((prev) =>
              prev ? { ...prev, floor: Number(value) } : null
            )
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
        <Label>Status</Label>
        <Select
          value={formData?.status || ""}
          onValueChange={(value) =>
            setFormData((prev) => (prev ? { ...prev, status: value } : null))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  (prevProps, nextProps) => {
    // Custom comparison for memo
    return (
      JSON.stringify(prevProps.formData) === JSON.stringify(nextProps.formData)
    );
  }
);

// Memoize the component
export const EditRoomDialog = memo(function EditRoomDialog({
  room,
  open,
  onOpenChange,
  onSave,
}: EditRoomDialogProps) {
  const [formData, setFormData] = useState<Partial<Room> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImages, setNewImages] = useState<FileList | null>(null);

  useEffect(() => {
    if (room) {
      setFormData(room);
    }
  }, [room]);

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

  const handleSubmit = async () => {
    if (!formData) return;
    setIsSubmitting(true);
    try {
      await onSave(formData as Room, newImages);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ImagesTab = lazy(() => import("./images-tab"));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Room</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="rules">House Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicInfoTab formData={formData} setFormData={setFormData} />
          </TabsContent>

          <TabsContent value="description" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={formData?.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={5}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images">
            <Suspense fallback={<div>Loading...</div>}>
              <ImagesTab
                formData={formData}
                setFormData={setFormData}
                setNewImages={setNewImages}
              />
            </Suspense>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Base Price</Label>
                <Input
                  type="number"
                  value={formData?.pricing?.basePrice ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: {
                        ...formData?.pricing,
                        basePrice: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Cleaning Fee</Label>
                <Input
                  type="number"
                  value={formData?.pricing?.cleaningFee ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: {
                        ...formData?.pricing,
                        cleaningFee: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Security Deposit</Label>
                <Input
                  type="number"
                  value={formData?.pricing?.securityDeposit ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: {
                        ...formData?.pricing,
                        securityDeposit: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Weekend Rate</Label>
                <Input
                  type="number"
                  value={formData?.pricing?.weekendRate ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: {
                        ...formData?.pricing,
                        weekendRate: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Weekly Discount (%)</Label>
                <Input
                  type="number"
                  value={formData?.pricing?.weeklyDiscount ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: {
                        ...formData?.pricing,
                        weeklyDiscount: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Monthly Discount (%)</Label>
                <Input
                  type="number"
                  value={formData?.pricing?.monthlyDiscount ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricing: {
                        ...formData?.pricing,
                        monthlyDiscount: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="amenities" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {amenitiesOptions.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={formData?.amenities?.includes(amenity)}
                    onCheckedChange={(checked) => {
                      const newAmenities = checked
                        ? [...(formData?.amenities || []), amenity]
                        : formData?.amenities?.filter((a) => a !== amenity) ||
                          [];
                      setFormData({ ...formData, amenities: newAmenities });
                    }}
                  />
                  <Label htmlFor={amenity}>{amenity}</Label>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Number of Bathrooms</Label>
                <Input
                  type="number"
                  value={formData?.facilities?.bathrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      facilities: {
                        ...formData?.facilities,
                        bathrooms: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Room Size (m²)</Label>
                <Input
                  type="number"
                  value={formData?.facilities?.roomSize}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      facilities: {
                        ...formData?.facilities,
                        roomSize: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Number of Bedrooms</Label>
                <Input
                  type="number"
                  value={formData?.bedrooms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bedrooms: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label className="mb-2 block">Beds</Label>
                {formData?.facilities?.bedsDescription?.map((bed, index) => (
                  <div key={index} className="flex gap-4 mb-2">
                    <Select
                      value={bed.type}
                      onValueChange={(value) => {
                        const newBeds = [
                          ...(formData?.facilities?.bedsDescription || []),
                        ];
                        newBeds[index] = { ...newBeds[index], type: value };
                        setFormData({
                          ...formData,
                          facilities: {
                            ...formData?.facilities,
                            bedsDescription: newBeds,
                          },
                        });
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
                        const newBeds = [
                          ...(formData?.facilities?.bedsDescription || []),
                        ];
                        newBeds[index] = {
                          ...newBeds[index],
                          count: Number(e.target.value),
                        };
                        setFormData({
                          ...formData,
                          facilities: {
                            ...formData?.facilities,
                            bedsDescription: newBeds,
                          },
                        });
                      }}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newBeds = [
                      ...(formData?.facilities?.bedsDescription || []),
                    ];
                    newBeds.push({ type: "Single", count: 1 });
                    setFormData({
                      ...formData,
                      facilities: {
                        ...formData?.facilities,
                        bedsDescription: newBeds,
                      },
                    });
                  }}
                >
                  Add Bed
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rules" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label>Smoking Allowed</Label>
                <Switch
                  checked={formData?.houseRules?.smokingAllowed}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      houseRules: {
                        ...formData?.houseRules,
                        smokingAllowed: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Pets Allowed</Label>
                <Switch
                  checked={formData?.houseRules?.petsAllowed}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      houseRules: {
                        ...formData?.houseRules,
                        petsAllowed: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Parties Allowed</Label>
                <Switch
                  checked={formData?.houseRules?.partiesAllowed}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      houseRules: {
                        ...formData?.houseRules,
                        partiesAllowed: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Check-in Time</Label>
                <Input
                  type="time"
                  value={formData?.houseRules?.checkInTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      houseRules: {
                        ...formData?.houseRules,
                        checkInTime: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Check-out Time</Label>
                <Input
                  type="time"
                  value={formData?.houseRules?.checkOutTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      houseRules: {
                        ...formData?.houseRules,
                        checkOutTime: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});
