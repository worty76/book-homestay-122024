"use client";

import { BookingWithDetails } from "@/types/booking";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import {
  createSortableColumn,
  createColumn,
  createActionsColumn,
} from "@/components/ui/data-table/columns";

interface BookingsDataTableProps {
  bookings: BookingWithDetails[];
  onViewDetails: (booking: BookingWithDetails) => void;
}

export function BookingsDataTable({
  bookings,
  onViewDetails,
}: BookingsDataTableProps) {
  const columns = [
    createSortableColumn<BookingWithDetails, any>(
      "user",
      "Guest",
      ({ row }) => (
        <div className="font-medium">{row.original.user?.email || "N/A"}</div>
      )
    ),

    createColumn<BookingWithDetails, any>("room", "Room", ({ row }) => (
      <div>{row.original.room?.name || "N/A"}</div>
    )),

    createSortableColumn<BookingWithDetails, string>(
      "startAt",
      "Check-in",
      ({ getValue }) => {
        const date = getValue();
        return <div>{date ? new Date(date).toLocaleDateString() : "N/A"}</div>;
      }
    ),

    createSortableColumn<BookingWithDetails, string>(
      "endAt",
      "Check-out",
      ({ getValue }) => {
        const date = getValue();
        return <div>{date ? new Date(date).toLocaleDateString() : "N/A"}</div>;
      }
    ),

    createSortableColumn<BookingWithDetails, string>(
      "totalPrice",
      "Total Price",
      ({ getValue }) => <div>${getValue() || "0"}</div>
    ),

    createColumn<BookingWithDetails, string>("status", "Status", ({ row }) => (
      <Badge
        variant={
          row.original.status === "confirmed"
            ? "default"
            : row.original.status === "cancelled"
            ? "destructive"
            : "secondary"
        }
      >
        {row.original.status}
      </Badge>
    )),

    createActionsColumn<BookingWithDetails>((row) => (
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(row)}
          className="flex items-center gap-1"
        >
          <Eye className="h-3.5 w-3.5" />
          View Details
        </Button>
      </div>
    )),
  ];

  return (
    <DataTable
      columns={columns}
      data={bookings}
      searchColumn="user"
      searchPlaceholder="Search bookings..."
    />
  );
}
