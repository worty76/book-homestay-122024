import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Room } from "./types";
import { useState, useEffect, memo, Suspense, lazy } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roomSchema, RoomFormValues } from "@/schema/room.schema";
import BasicInfoTab from "./form-sections/basic-info-tab";
import DescriptionTab from "./form-sections/description-tab";
import PricingTab from "./form-sections/pricing-tab";
import AmenitiesTab from "./form-sections/amenities-tab";
import FacilitiesTab from "./form-sections/facilities-tab";
import HouseRulesTab from "./form-sections/house-rules-tab";

const ImagesTab = lazy(() => import("./images-tab"));

interface EditRoomDialogProps {
  room: Room | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedRoom: Room, files?: FileList) => Promise<void>;
}

export const EditRoomDialog = memo(function EditRoomDialog({
  room,
  open,
  onOpenChange,
  onSave,
}: EditRoomDialogProps) {
  const [formData, setFormData] = useState<Partial<Room> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImages, setNewImages] = useState<FileList | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  // Main form validation
  const { formState } = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: formData?.name || "",
      category: formData?.category || "",
      floor: formData?.floor || 1,
      status: formData?.status || "available",
      // Additional fields would be initialized here if needed
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (room) {
      setFormData(room);
      setNewImages(null);
      setNameError(null);
    }
  }, [room]);

  const handleSubmit = async () => {
    if (!formData) return;

    if (!formData.name || formData.name.trim() === "") {
      setNameError("Room name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData as Room, newImages || undefined);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving room:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <DescriptionTab formData={formData} setFormData={setFormData} />
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
            <PricingTab formData={formData} setFormData={setFormData} />
          </TabsContent>

          <TabsContent value="amenities" className="space-y-4">
            <AmenitiesTab formData={formData} setFormData={setFormData} />
          </TabsContent>

          <TabsContent value="facilities" className="space-y-4">
            <FacilitiesTab formData={formData} setFormData={setFormData} />
          </TabsContent>

          <TabsContent value="rules" className="space-y-4">
            <HouseRulesTab formData={formData} setFormData={setFormData} />
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
