"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingDetails, BookingWithDetails } from "@/types/booking";

interface BookingDetailsDialogProps {
  selectedBooking: BookingWithDetails | null;
  bookingDetails: BookingDetails | null;
  loadingDetails: boolean;
  loading: string | null;
  onClose: () => void;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
}

export function BookingDetailsDialog({
  selectedBooking,
  bookingDetails,
  loadingDetails,
  loading,
  onClose,
  onConfirm,
  onCancel,
}: BookingDetailsDialogProps) {
  // Add handlers that will close the dialog after the action completes
  const handleConfirm = async (id: string) => {
    await onConfirm(id);
    // Only close if the action completed successfully (loading is null after completion)
    if (!loading) {
      onClose();
    }
  };

  const handleCancel = async (id: string) => {
    await onCancel(id);
    // Only close if the action completed successfully (loading is null after completion)
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog open={!!selectedBooking} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        {loadingDetails ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : !bookingDetails ? (
          <div className="flex items-center justify-center p-8">
            <p className="text-gray-500">No booking details available</p>
          </div>
        ) : (
          <div className="grid gap-6 p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {bookingDetails.room?.name ?? "Untitled Room"}
                </h2>
                <p className="text-gray-500">
                  {bookingDetails.room?.location?.address ?? "No address"},{" "}
                  {bookingDetails.room?.location?.city ?? "No city"}
                </p>
              </div>

              {bookingDetails.status === "pending_confirmation" ? (
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancel(bookingDetails._id)}
                    disabled={loading === bookingDetails._id}
                  >
                    {loading === bookingDetails._id
                      ? "Cancelling..."
                      : "Cancel Booking"}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleConfirm(bookingDetails._id)}
                    disabled={loading === bookingDetails._id}
                  >
                    {loading === bookingDetails._id
                      ? "Confirming..."
                      : "Confirm Booking"}
                  </Button>
                </div>
              ) : (
                <Badge
                  className="text-lg px-4 py-2"
                  variant={
                    bookingDetails.status === "confirmed"
                      ? "secondary"
                      : bookingDetails.status === "cancelled"
                      ? "destructive"
                      : "default"
                  }
                >
                  {bookingDetails.status === "pending_confirmation"
                    ? "PENDING"
                    : bookingDetails.status.toUpperCase()}
                </Badge>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Guest Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="font-medium">
                        {bookingDetails.user?.username ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">
                        {bookingDetails.user?.email ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-medium">
                        {bookingDetails.user?.phoneNumber ?? "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Room Details</h3>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Room Name:</span>
                        <span className="font-medium">
                          {bookingDetails.room?.name ?? "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Category:</span>
                        <span className="font-medium capitalize">
                          {bookingDetails.room?.category ?? "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location:</span>
                        <span className="font-medium text-right">
                          {bookingDetails.room?.location?.address ?? "N/A"},{" "}
                          {bookingDetails.room?.location?.city ?? "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Room Size</p>
                          <p className="font-medium">
                            {bookingDetails.room?.facilities?.roomSize ?? "N/A"}
                            m²
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bedrooms</p>
                          <p className="font-medium">
                            {bookingDetails.room?.bedrooms ?? "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bathrooms</p>
                          <p className="font-medium">
                            {bookingDetails.room?.facilities?.bathrooms ??
                              "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Max Guests</p>
                          <p className="font-medium">
                            {bookingDetails.room?.capacity?.maxGuests ?? "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Booking Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-medium">
                          {bookingDetails.startAt
                            ? new Date(
                                bookingDetails.startAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {bookingDetails.room?.houseRules?.checkInTime ??
                            "N/A"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-medium">
                          {bookingDetails.endAt
                            ? new Date(
                                bookingDetails.endAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {bookingDetails.room?.houseRules?.checkOutTime ??
                            "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Length of stay:</span>
                        <span className="font-medium">
                          {bookingDetails.days} nights
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span className="font-medium">
                          {bookingDetails.guests} persons
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Price Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Daily rate</span>
                      <span>${bookingDetails.room?.dailyRate ?? "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>
                        ${bookingDetails.room?.pricing?.cleaningFee ?? "0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security deposit</span>
                      <span>
                        ${bookingDetails.room?.pricing?.securityDeposit ?? "0"}
                      </span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Price</span>
                        <span>${bookingDetails.totalPrice ?? "0"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Images */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Room Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bookingDetails.room?.image?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Room ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )) ?? <p className="text-gray-500">No images available</p>}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
