"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { BookingWithDetails } from "@/types/booking";

interface BookingsTableProps {
  bookings: BookingWithDetails[];
  onViewDetails: (booking: BookingWithDetails) => void;
  onConfirm?: (id: string) => void;
  onCancel?: (id: string) => void;
  loading?: string | null;
  isLoading?: boolean;
}

export function BookingsTable({
  bookings,
  onViewDetails,
  loading,
  isLoading = false,
}: BookingsTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-lg">
        <div className="text-center text-muted-foreground">
          No bookings found
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
              <TableHead>Guest</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {booking.user.name || booking.user.email || "N/A"}
                </TableCell>
                <TableCell>{booking.room.name || "N/A"}</TableCell>
                <TableCell>
                  {booking.startAt
                    ? new Date(booking.startAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {booking.endAt
                    ? new Date(booking.endAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>${booking.totalPrice ?? "0"}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "cancelled"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {booking.status === "pending_confirmation"
                      ? "pending"
                      : booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(booking)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Details
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
