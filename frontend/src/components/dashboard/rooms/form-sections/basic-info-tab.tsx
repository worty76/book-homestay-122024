import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Room } from "../types";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicInfoSchema, BasicInfoFormValues } from "@/schema/room.schema";

export interface BasicInfoTabProps {
  formData: Partial<Room> | null;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Room> | null>>;
}

const BasicInfoTab = memo(({ formData, setFormData }: BasicInfoTabProps) => {
  const form = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: formData?.name || "",
    },
  });

  useEffect(() => {
    if (formData) {
      form.reset({
        name: formData.name || "",
        category: formData.category || "",
        floor: formData.floor || 1,
        status: formData.status || "available",
      });
    }
  }, [formData, form]);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("name", value);
    setFormData((prev) => (prev ? { ...prev, name: value } : null));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Room Name</Label>
        <Input
          id="name"
          value={form.watch("name")}
          onChange={onNameChange}
          className={form.formState.errors.name ? "border-red-500" : ""}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
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
          onValueChange={(
            value: "available" | "booked" | "maintenance" | "inactive"
          ) =>
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
  );
});

BasicInfoTab.displayName = "BasicInfoTab";

export default BasicInfoTab;
