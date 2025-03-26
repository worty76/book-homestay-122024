"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { RoomList } from "@/components/dashboard/rooms/room-list";
import { AddRoomDialog } from "@/components/dashboard/rooms/add-room-dialog";
import { EditRoomDialog } from "@/components/dashboard/rooms/edit-room-dialog";
import { Room, FormDataRoom } from "@/components/dashboard/rooms/types";
import { toast } from "@/hooks/use-toast";

export default function RoomsPage() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataRoom>({
    name: "",
    category: "",
    city: "",
    address: "",
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

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/room");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data: Room[] = await response.json();
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
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log(formData);
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (image) {
        formDataToSend.append("files", image);
      }

      const response = await fetch(
        "http://localhost:3000/api/v1/room/add-room",
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
        "http://localhost:3000/api/v1/room"
      ).then((res) => res.json());
      setRooms(updatedRooms);
      toast({
        title: "Room created",
        description: "The room has been created successfully.",
        variant: "default",
      });
      setIsSubmitting(false);
      setOpen(false);
    } catch (error) {
      console.error("Error creating room:", error);
      toast({
        title: "Error",
        description: "Failed to create room. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setEditDialogOpen(true);
  };

  const handleSaveRoom = async (updatedRoom: Room, files?: FileList) => {
    try {
      const formData = new FormData();
      formData.append("roomData", JSON.stringify(updatedRoom));

      if (files) {
        Array.from(files).forEach((file) => {
          formData.append("files", file);
        });
      }

      const response = await fetch(
        `http://localhost:3000/api/v1/room/update-room/${updatedRoom._id}`,
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
        "http://localhost:3000/api/v1/room"
      ).then((res) => res.json());
      setRooms(updatedRooms);

      // Show success toast and close dialog
      toast({
        title: "Room updated",
        description: "The room has been updated successfully.",
        variant: "default",
      });
      setEditDialogOpen(false); // Close the dialog after successful update
    } catch (error) {
      console.error("Error updating room:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update room",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Rooms</h1>
        <AddRoomDialog
          open={open}
          setOpen={setOpen}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          formData={formData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          preview={preview}
        />
      </div>
      <RoomList
        rooms={rooms}
        isLoading={isLoading}
        error={error}
        onEditRoom={handleEditRoom}
      />
      <EditRoomDialog
        room={selectedRoom}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveRoom}
      />
    </main>
  );
}
