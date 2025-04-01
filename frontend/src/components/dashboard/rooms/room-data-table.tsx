"use client";

import { Room } from "./types";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import {
  createSortableColumn,
  createColumn,
  createActionsColumn,
} from "@/components/ui/data-table/columns";

interface RoomDataTableProps {
  rooms: Room[];
  onEditRoom: (room: Room) => void;
  onDeleteRoom: (room: Room) => void;
}

export function RoomDataTable({
  rooms,
  onEditRoom,
  onDeleteRoom,
}: RoomDataTableProps) {
  const columns = [
    createSortableColumn<Room, string>("name", "Name", ({ getValue }) => (
      <div className="font-medium">{getValue()}</div>
    )),

    createColumn<Room, string>("category", "Category", ({ getValue }) => (
      <div className="capitalize">{getValue()}</div>
    )),

    createColumn<Room, number>("floor", "Floor", ({ getValue }) => (
      <div>Floor {getValue()}</div>
    )),

    createSortableColumn<Room, number>(
      "dailyRate",
      "Daily Rate",
      ({ getValue }) => <div>${getValue()}</div>
    ),

    createColumn<Room, any>("capacity", "Capacity", ({ row }) => (
      <div>{row.original.capacity?.maxGuests || 0} guests</div>
    )),

    createColumn<Room, string>("status", "Status", ({ row }) => (
      <Badge
        variant={
          row.original.status === "available"
            ? "outline"
            : row.original.status === "maintenance"
            ? "destructive"
            : "secondary"
        }
      >
        {row.original.status}
      </Badge>
    )),

    createActionsColumn<Room>((row) => (
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEditRoom(row)}
          className="flex items-center gap-1"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDeleteRoom(row)}
          className="flex items-center gap-1"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    )),
  ];

  return (
    <DataTable
      columns={columns}
      data={rooms}
      searchColumn="name"
      searchPlaceholder="Search rooms..."
    />
  );
}
