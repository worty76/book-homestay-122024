import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle } from "lucide-react";
import { RoomFormFields } from "./room-form-fields";
import { FormDataRoom } from "./types";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface AddRoomDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  formData: FormDataRoom;
  handleInputChange: (e: any) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previews: string[];
  handleRemoveImage: (index: number) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export function AddRoomDialog({
  open,
  setOpen,
  onSubmit,
  isSubmitting,
  formData,
  handleInputChange,
  handleImageChange,
  previews,
  handleRemoveImage,
  register,
  errors,
}: AddRoomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Add New Room</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-80px)] px-6 pb-6">
          <RoomFormFields
            formData={formData}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            previews={previews}
            handleRemoveImage={handleRemoveImage}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            register={register}
            errors={errors}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
