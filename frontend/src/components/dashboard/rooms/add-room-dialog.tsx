import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { RoomFormFields } from "./room-form-fields";
import { FormDataRoom } from "./types";

interface AddRoomDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  formData: FormDataRoom;
  handleInputChange: (e: any) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
}

export function AddRoomDialog({
  open,
  setOpen,
  onSubmit,
  isSubmitting,
  formData,
  handleInputChange,
  handleImageChange,
  preview,
}: AddRoomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
        </DialogHeader>
        <RoomFormFields
          formData={formData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          preview={preview}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
