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
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookingWithDetails } from "@/types/booking";

interface BookingsTableProps {
  bookings: BookingWithDetails[];
  onViewDetails: (booking: BookingWithDetails) => void;
}

export function BookingsTable({ bookings, onViewDetails }: BookingsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guest</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Check-in</TableHead>
          <TableHead>Check-out</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking._id}>
            <TableCell>{booking.user ?? "N/A"}</TableCell>
            <TableCell>{booking.room ?? "N/A"}</TableCell>
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
                    ? "secondary"
                    : booking.status === "cancelled"
                    ? "destructive"
                    : "default"
                }
              >
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onViewDetails(booking)}>
                    View Details
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
