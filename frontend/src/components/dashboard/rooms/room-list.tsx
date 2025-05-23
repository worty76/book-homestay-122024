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
import { Badge } from "@/components/ui/badge";

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
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
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

  if (rooms.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-lg">
        <div className="text-center text-muted-foreground">
          No rooms found. Add your first room!
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Floor</TableHead>
              <TableHead>Daily Rate</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room._id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{room.name}</TableCell>
                <TableCell className="capitalize">{room.category}</TableCell>
                <TableCell>Floor {room.floor}</TableCell>
                <TableCell>${room.dailyRate}</TableCell>
                <TableCell>{room.capacity?.maxGuests} guests</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      room.status === "available" ? "outline" : "secondary"
                    }
                  >
                    {room.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditRoom(room)}
                      className="flex items-center gap-1"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteRoom(room)}
                      className="flex items-center gap-1"
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
      </div>
    </div>
  );
}
