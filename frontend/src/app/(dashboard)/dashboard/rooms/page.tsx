"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { RoomDataTable } from "@/components/dashboard/rooms/room-data-table";
import { AddRoomDialog } from "@/components/dashboard/rooms/add-room-dialog";
import { EditRoomDialog } from "@/components/dashboard/rooms/edit-room-dialog";
import { Room, FormDataRoom } from "@/components/dashboard/rooms/types";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const roomSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  category: z.string().min(1, "Category is required"),
  floor: z.string().min(1, "Floor is required"),
  basePrice: z.string().min(1, "Base price is required"),
  cleaningFee: z.string().min(1, "Cleaning fee is required"),
  bathrooms: z.string().min(1, "Number of bathrooms is required"),
  roomSize: z.string().min(1, "Room size is required"),
  status: z.string().min(1, "Status is required"),
  dailyRate: z.string().min(1, "Daily rate is required"),
  maxGuests: z.string().min(1, "Maximum guests is required"),
});

type RoomFormValues = z.infer<typeof roomSchema>;

export default function RoomsPage() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: "",
      category: "",
      floor: "",
      basePrice: "",
      cleaningFee: "",
      bathrooms: "",
      roomSize: "",
      status: "",
      dailyRate: "",
      maxGuests: "",
    },
  });

  const [formData, setFormData] = useState<FormDataRoom>({
    name: "",
    category: "",
    floor: "",
    basePrice: "",
    cleaningFee: "",
    bathrooms: "",
    roomSize: "",
    status: "",
    dailyRate: "",
    maxGuests: "",
  });
  const token = useAuthStore((state) => state.token);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/room`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data: Room[] = await response.json();

        console.log("Fetched rooms:", data);
        console.log("Example room image URLs:", data[0]?.image);

        setRooms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch rooms");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      setImages(filesArray);

      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    // Update form data for backward compatibility
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update React Hook Form state
    setValue(name as keyof RoomFormValues, value, {
      shouldValidate: true,
    });
  };

  const onSubmitForm = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      console.log(data);
      const formDataToSend = new FormData();

      // Use validated data from React Hook Form
      Object.entries(data).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (images.length > 0) {
        images.forEach((image) => {
          formDataToSend.append("files", image);
        });
      } else {
        toast.error("Please upload at least one image", {
          description: "Room requires at least one image",
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/room/add-room`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const updatedRooms = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/room`
      ).then((res) => res.json());
      setRooms(updatedRooms);
      toast.success("Room created", {
        description: "The room has been created successfully.",
      });
      reset(); // Reset form after successful submission
      setImages([]);
      setPreviews([]);
      setIsSubmitting(false);
      setOpen(false);
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room. Please try again.", {
        description: "Failed to create room. Please try again.",
      });
      setIsSubmitting(false);
    }
  });

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(null);
    setTimeout(() => {
      setSelectedRoom(room);
      setEditDialogOpen(true);
    }, 0);
  };

  const handleSaveRoom = async (updatedRoom: Room, files?: FileList) => {
    try {
      const formData = new FormData();
      formData.append("roomData", JSON.stringify(updatedRoom));

      if (files && files.length > 0) {
        console.log(`Uploading ${files.length} new images`);

        Array.from(files).forEach((file, index) => {
          formData.append("files", file);
          console.log(`Added file: ${file.name}`);
        });
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/room/update-room/${updatedRoom._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update room");
      }

      // Refresh room list
      const updatedRooms = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/room`
      ).then((res) => res.json());
      setRooms(updatedRooms);

      // Show success toast and close dialog
      toast.success("Room updated", {
        description: "The room has been updated successfully.",
      });
      setEditDialogOpen(false); // Close the dialog after successful update
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Failed to update room. Please try again.", {
        description:
          error instanceof Error ? error.message : "Failed to update room",
      });
    }
  };

  const handleDeleteRoom = (room: Room) => {
    setRoomToDelete(room);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!roomToDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/room/delete-room/${roomToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete room");
      }

      // Update rooms list
      const updatedRooms = rooms.filter(
        (room) => room._id !== roomToDelete._id
      );
      setRooms(updatedRooms);

      toast.success("Room deleted", {
        description: "The room has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room. Please try again.", {
        description: "Failed to delete room. Please try again.",
      });
    } finally {
      setDeleteDialogOpen(false);
      setRoomToDelete(null);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Rooms</h1>
        <AddRoomDialog
          open={open}
          setOpen={setOpen}
          onSubmit={onSubmitForm}
          isSubmitting={isSubmitting}
          formData={formData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          previews={previews}
          handleRemoveImage={handleRemoveImage}
          register={register}
          errors={errors}
        />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center text-red-500">{error}</div>
        </div>
      ) : rooms.length === 0 ? (
        <div className="flex items-center justify-center p-8 border rounded-lg">
          <div className="text-center text-muted-foreground">
            No rooms found. Add your first room!
          </div>
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden">
          <RoomDataTable
            rooms={rooms}
            onEditRoom={handleEditRoom}
            onDeleteRoom={handleDeleteRoom}
          />
        </div>
      )}
      <EditRoomDialog
        room={selectedRoom}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveRoom}
      />
      {/* Add Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete this room? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setRoomToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
