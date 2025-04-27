"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { format, differenceInDays, addDays } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Users,
  AlertCircle,
  CreditCard,
  Wallet,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { createVnpayPayment } from "@/services/paymentService";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ReactNode } from "react";
import { BookingFormRoom } from "@/types/room";
import { formatCurrency } from "@/utils/roomUtils";
import { useTranslation } from "@/hooks/useTranslation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface BookingModalProps {
  room: BookingFormRoom;
  dateRange: DateRange;
  numberOfNights: number;
  totalPrice: number;
  guests: number;
  trigger: ReactNode;
}

interface BookingFormData {
  specialRequests: string;
}

type PaymentMethod = "CASH" | "VNPAY";

const getCookieToken = () => {
  try {
    const cookieData = Cookies.get("auth-storage");
    if (cookieData) {
      const parsedData = JSON.parse(decodeURIComponent(cookieData));
      return parsedData?.state?.token || null;
    }
    return null;
  } catch (error) {
    console.error("Error parsing auth cookie:", error);
    return null;
  }
};

const DateRangeSelector = ({
  dateRange,
  setDateRange,
  calendarOpen,
  setCalendarOpen,
}: {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  calendarOpen: boolean;
  setCalendarOpen: (open: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-sm sm:text-base">
          {t("rooms.bookingModal.checkIn")}{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal mt-1 text-sm sm:text-base",
                !dateRange.from ? "border-amber-300" : ""
              )}
            >
              <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {dateRange.from ? (
                format(dateRange.from, "MM/dd/yyyy", { locale: enUS })
              ) : (
                <span>{t("rooms.bookingModal.chooseDate")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={dateRange.from || new Date()}
              selected={dateRange.from}
              onSelect={(date) => {
                if (date) {
                  setDateRange({
                    from: date,
                    to:
                      dateRange.to && date < dateRange.to
                        ? dateRange.to
                        : undefined,
                  });
                  setCheckInOpen(false);
                  if (!dateRange.to) {
                    setCheckOutOpen(true);
                  }
                }
              }}
              locale={enUS}
              disabled={(date: Date) => date < new Date()}
              className="rounded-md border"
              showOutsideDays={false}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label className="text-sm sm:text-base">
          {t("rooms.bookingModal.checkOut")}{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal mt-1 text-sm sm:text-base",
                !dateRange.to ? "border-amber-300" : ""
              )}
            >
              <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {dateRange.to ? (
                format(dateRange.to, "MM/dd/yyyy", { locale: enUS })
              ) : (
                <span>{t("rooms.bookingModal.chooseCheckout")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={dateRange.from || new Date()}
              selected={dateRange.to}
              onSelect={(date) => {
                if (date && dateRange.from) {
                  if (date <= dateRange.from) {
                    toast.error(t("rooms.bookingModal.minStay"));
                    return;
                  }
                  setDateRange({ ...dateRange, to: date });
                  setCheckOutOpen(false);
                }
              }}
              locale={enUS}
              disabled={(date: Date) =>
                date < new Date() ||
                (dateRange.from ? date <= dateRange.from : false)
              }
              className="rounded-md border"
              showOutsideDays={false}
            />
          </PopoverContent>
        </Popover>
      </div>

      {dateRange.from && dateRange.to && (
        <div className="text-center text-sm text-muted-foreground">
          {differenceInDays(dateRange.to, dateRange.from)}{" "}
          {differenceInDays(dateRange.to, dateRange.from) === 1
            ? t("rooms.bookingForm.night")
            : t("common.dates.night", {
                count: differenceInDays(dateRange.to, dateRange.from),
              })}
        </div>
      )}
    </div>
  );
};

const GuestSelector = ({
  guests,
  setGuests,
  maxCapacity,
}: {
  guests: string;
  setGuests: (guests: string) => void;
  maxCapacity: number;
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Label className="text-sm sm:text-base">
        {t("rooms.bookingForm.guestCount")}{" "}
        <span className="text-red-500">*</span>
      </Label>
      <Select value={guests} onValueChange={setGuests}>
        <SelectTrigger className="w-full mt-1 text-sm sm:text-base">
          <div className="flex items-center">
            <Users className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <SelectValue placeholder={t("rooms.bookingForm.guestCount")} />
          </div>
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num}{" "}
              {num === 1
                ? t("rooms.bookingForm.guest")
                : t("rooms.bookingForm.guests")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const PaymentMethodSelector = ({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Label className="text-sm sm:text-base mb-2 block">
        {t("rooms.bookingModal.paymentMethod")}{" "}
        <span className="text-red-500">*</span>
      </Label>
      <RadioGroup
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
          <RadioGroupItem value="CASH" id="cash" />
          <Label
            htmlFor="cash"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Wallet className="h-4 w-4" />
            <div>
              <p className="font-medium">
                {t("rooms.bookingModal.payAtCheckIn")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("rooms.bookingModal.payAtCheckInDesc")}
              </p>
            </div>
          </Label>
        </div>

        {/* <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
          <RadioGroupItem value="VNPAY" id="vnpay" />
          <Label
            htmlFor="vnpay"
            className="flex items-center gap-2 cursor-pointer"
          >
            <CreditCard className="h-4 w-4" />
            <div>
              <p className="font-medium">{t("rooms.bookingModal.payViaVnpay")}</p>
              <p className="text-sm text-muted-foreground">
                {t("rooms.bookingModal.vnpayDesc")}
              </p>
            </div>
          </Label>
        </div> */}
      </RadioGroup>
    </div>
  );
};

const RoomDetails = ({ room }: { room: BookingFormRoom }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
      <div className="bg-primary/10 text-primary p-1.5 sm:p-2 rounded-md">
        <Users className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div>
        <h4 className="font-medium text-sm sm:text-base">{room.name}</h4>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {room.type === "Twin"
            ? t("rooms.bookingModal.roomType.twin")
            : room.type === "Double"
            ? t("rooms.bookingModal.roomType.double")
            : t("rooms.bookingModal.roomType.shared")}
          {" · "}
          {room.maxCapacity} {t("rooms.bookingModal.roomType.people")}
        </p>
      </div>
    </div>
  );
};

const PriceSummary = ({
  roomPrice,
  nights,
  cleaningFee,
  grandTotal,
  paymentMethod,
}: {
  roomPrice: number;
  nights: number;
  cleaningFee: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
}) => {
  const { t, language } = useTranslation();

  return (
    <>
      <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base">
        <div className="flex justify-between">
          <span>
            {formatCurrency(roomPrice, language)} x {nights}{" "}
            {nights === 1
              ? t("rooms.bookingForm.night")
              : t("common.dates.night")}
          </span>
          <span>{formatCurrency(roomPrice * nights, language)}</span>
        </div>

        <div className="flex justify-between">
          <span>{t("rooms.bookingForm.cleaningFee")}</span>
          <span>{formatCurrency(cleaningFee, language)}</span>
        </div>

        <Separator className="my-3 sm:my-4" />

        <div className="flex justify-between font-medium text-base sm:text-lg">
          <span>{t("rooms.bookingForm.total")}</span>
          <span>{formatCurrency(grandTotal, language)}</span>
        </div>
      </div>

      <div className="mt-3 border-t pt-3">
        <div className="flex justify-between text-sm">
          <span>{t("rooms.bookingModal.paymentSummary.paymentMethod")}</span>
          <span className="font-medium">
            {paymentMethod === "CASH"
              ? t("rooms.bookingModal.paymentSummary.payAtCheckIn")
              : "VNPAY"}
          </span>
        </div>
      </div>
    </>
  );
};

export default function BookingModal({
  room,
  dateRange: initialDateRange,
  numberOfNights: initialNumberOfNights,
  totalPrice: initialTotalPrice,
  guests: initialGuests,
  trigger,
}: BookingModalProps) {
  const { t, language } = useTranslation();
  const authState = useAuthStore();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    specialRequests: "",
  });
  const [dateRange, setDateRange] = useState<DateRange>(initialDateRange);
  const [numberOfNights, setNumberOfNights] = useState(initialNumberOfNights);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [guests, setGuests] = useState(initialGuests.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const fees = useMemo(() => {
    const cleaningFee = room?.pricing?.cleaningFee || 0;
    const grandTotal = totalPrice + cleaningFee;

    return { cleaningFee, grandTotal };
  }, [room?.pricing?.cleaningFee, totalPrice]);

  useEffect(() => {
    if (open) {
      setDateRange(initialDateRange);

      if (initialDateRange.from && initialDateRange.to) {
        const nights = differenceInDays(
          initialDateRange.to,
          initialDateRange.from
        );
        if (nights > 0) {
          setNumberOfNights(nights);
          setTotalPrice(nights * (room?.pricing?.basePrice || 0));
        } else {
          setNumberOfNights(1);
          setTotalPrice(room?.pricing?.basePrice || 0);
        }
      }
    }
  }, [open, initialDateRange, room?.pricing?.basePrice]);

  // Re-sync whenever initialDateRange changes while modal is open
  useEffect(() => {
    if (open && initialDateRange.to && initialDateRange.from) {
      setDateRange(initialDateRange);
    }
  }, [initialDateRange, open]);

  // Calculate number of nights and total price when date range changes
  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const nights = differenceInDays(dateRange.to, dateRange.from);
      if (nights > 0) {
        setNumberOfNights(nights);
        setTotalPrice(nights * (room?.pricing?.basePrice || 0));
      } else if (nights === 0) {
        // Handle same day bookings with minimum 1 night charge
        setNumberOfNights(1);
        setTotalPrice(room?.pricing?.basePrice || 0);
      }
    }
  }, [dateRange, room?.pricing?.basePrice]);

  // Form handlers
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const validateForm = useCallback(() => {
    const newErrors: string[] = [];

    if (!dateRange.to) {
      newErrors.push("Please choose check-out date");
    } else if (
      dateRange.from &&
      dateRange.to &&
      differenceInDays(dateRange.to, dateRange.from) < 1
    ) {
      newErrors.push("Minimum stay must be 1 night");
    }

    if (!authState.isAuthenticated) {
      newErrors.push("Please log in to book a room");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [dateRange, authState.isAuthenticated]);

  // Booking submission handler
  const handleBooking = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      if (!dateRange.to) {
        toast.error("Please choose check-out date");
        return;
      }

      if (
        dateRange.from &&
        dateRange.to &&
        differenceInDays(dateRange.to, dateRange.from) < 1
      ) {
        toast.error("Invalid stay duration", {
          description: "Minimum stay must be 1 night",
        });
        return;
      }

      if (!authState.isAuthenticated) {
        toast.error("Please log in", {
          description: "You need to log in to book a room",
        });
        return;
      }

      const cookieToken = getCookieToken();
      const tokenToUse = authState.token || cookieToken;

      if (!tokenToUse) {
        toast.error("Invalid login session", {
          description: "Please log in again to continue",
        });
        return;
      }

      setIsSubmitting(true);

      try {
        // Ensure date values exist before proceeding
        if (!dateRange.from || !dateRange.to) {
          throw new Error("Date range is incomplete");
        }

        const bookingData = {
          startAt: dateRange.from.toISOString(),
          endAt: dateRange.to.toISOString(),
          guests: parseInt(guests),
          rental: {
            _id: room.id,
          },
          specialRequests: formData.specialRequests,
          paymentMethod: paymentMethod,
          paymentStatus:
            paymentMethod === "CASH" ? "PENDING" : "AWAITING_PAYMENT",
        };

        const bookingResponse = await axios.post(
          `${API_URL}/api/v1/booking/init`,
          bookingData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenToUse}`,
            },
          }
        );

        // Extract booking ID
        let bookingId = null;
        if (bookingResponse.data?.desc?.bookingId) {
          bookingId = bookingResponse.data.desc.bookingId;
        } else if (bookingResponse.data?.desc?._id) {
          bookingId = bookingResponse.data.desc._id;
        } else if (bookingResponse.data?.desc?.id) {
          bookingId = bookingResponse.data.desc.id;
        } else if (bookingResponse.data?._id) {
          bookingId = bookingResponse.data._id;
        } else if (typeof bookingResponse.data?.desc === "string") {
          bookingId = bookingResponse.data.desc;
        }

        if (!bookingId) {
          throw new Error("Could not retrieve booking ID from response");
        }

        // Handle payment method
        if (paymentMethod === "CASH") {
          toast.success("Booking successful!", {
            description: "You will pay at check-in.",
          });

          setFormData({ specialRequests: "" });
          setOpen(false);
          return;
        }

        if (paymentMethod === "VNPAY") {
          setProcessingPayment(true);

          try {
            sessionStorage.setItem("vnpay_booking_id", bookingId);
            const paymentResponse = await createVnpayPayment(
              bookingId,
              fees.grandTotal,
              tokenToUse
            );

            const paymentUrl = paymentResponse.data?.paymentUrl;
            if (!paymentUrl) {
              throw new Error("No payment URL received from server");
            }

            window.location.href = paymentUrl;
            return;
          } catch (paymentError: any) {
            try {
              await axios.post(
                `${API_URL}/api/v1/booking/${bookingId}/cancel`,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenToUse}`,
                  },
                }
              );
            } catch (cancelError) {
              console.error("Failed to cancel booking:", cancelError);
            }

            toast.error("Could not create payment transaction", {
              description: paymentError.message || "Please try again later.",
            });
          } finally {
            setProcessingPayment(false);
          }
        }
      } catch (error: any) {
        if (error.response?.data?.errors) {
          const apiErrors = error.response.data.errors;
          apiErrors.forEach((err: any) => {
            toast.error(err.title, {
              description: err.desc,
            });
          });
        } else {
          toast.error("Booking failed", {
            description: "An error occurred, please try again later.",
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      validateForm,
      dateRange,
      authState.isAuthenticated,
      authState.token,
      guests,
      room.id,
      formData.specialRequests,
      paymentMethod,
      fees.grandTotal,
    ]
  );

  // Modal content rendering
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-1">
            {t("rooms.bookingForm.bookRoom")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-[95vw] p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="mb-2 sm:mb-4">
          <DialogTitle className="text-lg sm:text-xl">
            {t("rooms.bookingModal.title", { roomName: room.name })}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {t("rooms.bookingModal.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">
              {t("rooms.bookingModal.roomDetails")}
            </h3>
            <form onSubmit={handleBooking} className="space-y-3 sm:space-y-4">
              <DateRangeSelector
                dateRange={dateRange}
                setDateRange={setDateRange}
                calendarOpen={calendarOpen}
                setCalendarOpen={setCalendarOpen}
              />

              <GuestSelector
                guests={guests}
                setGuests={setGuests}
                maxCapacity={room.maxCapacity}
              />

              <div>
                <Label
                  htmlFor="specialRequests"
                  className="text-sm sm:text-base"
                >
                  {t("rooms.bookingModal.specialRequests")}
                </Label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  placeholder={t(
                    "rooms.bookingModal.specialRequestsPlaceholder"
                  )}
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full min-h-[60px] sm:min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                />
              </div>

              <PaymentMethodSelector
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </form>
          </div>

          {/* Right column - Payment summary */}
          <div className="bg-muted/30 p-4 sm:p-6 rounded-lg mt-4 lg:mt-0">
            <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-4">
              {t("rooms.bookingModal.paymentDetails")}
            </h3>

            <RoomDetails room={room} />

            <Separator className="my-3 sm:my-4" />

            <PriceSummary
              roomPrice={room?.pricing?.basePrice || 0}
              nights={numberOfNights}
              cleaningFee={fees.cleaningFee}
              grandTotal={fees.grandTotal}
              paymentMethod={paymentMethod}
            />

            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">
              <p>{t("rooms.bookingModal.paymentSummary.paymentNotice")}</p>
              <p className="mt-1">
                {t("rooms.bookingModal.paymentSummary.depositNotice")}
              </p>
            </div>

            {/* Authentication warning */}
            {!authState.isAuthenticated && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-600 font-medium text-sm">
                  {t("rooms.bookingModal.errors.loginRequired")}
                </p>
              </div>
            )}

            {/* Error display */}
            {errors.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 font-medium text-sm">
                  {t("rooms.bookingModal.errors.checkErrors")}
                </p>
                <ul className="list-disc ml-5 mt-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-red-600 text-xs">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-0 gap-2 sm:gap-4 mt-4 sm:mt-6">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => setOpen(false)}
            disabled={isSubmitting || processingPayment}
          >
            {t("rooms.bookingModal.buttons.cancel")}
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            onClick={handleBooking}
            disabled={
              isSubmitting ||
              !authState.isAuthenticated ||
              processingPayment ||
              !dateRange.to ||
              (dateRange.from &&
                dateRange.to &&
                differenceInDays(dateRange.to, dateRange.from) < 1)
            }
          >
            {isSubmitting || processingPayment
              ? t("rooms.bookingModal.buttons.processing")
              : paymentMethod === "VNPAY"
              ? t("rooms.bookingModal.buttons.payViaVnpay")
              : t("rooms.bookingModal.buttons.confirmBooking")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
