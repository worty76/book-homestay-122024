import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Room } from "./types";
import { Pencil, Trash2 } from "lucide-react";

interface RoomListProps {
  rooms: Room[];
  isLoading: boolean;
  error: string | null;
  onEditRoom: (room: Room) => void;
  onDeleteRoom: (room: Room) => void;
}

export function RoomList({
  rooms,
  isLoading,
  error,
  onEditRoom,
  onDeleteRoom,
}: RoomListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">Loading rooms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Daily Rate</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map((room) => (
          <TableRow key={room._id}>
            <TableCell>{room.name}</TableCell>
            <TableCell className="capitalize">{room.category}</TableCell>
            <TableCell>
              {room.location.city} {room.location.country}
            </TableCell>
            <TableCell>${room.dailyRate}</TableCell>
            <TableCell>{room.capacity?.maxGuests} guests</TableCell>
            <TableCell className="capitalize">{room.status}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditRoom(room)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteRoom(room)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
