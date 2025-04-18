"use client";

import { memo } from "react";
import {
  SquareUser,
  Maximize,
  Building2,
  Users,
  Mountain,
  Bed,
  Clock,
  Ban,
  Home,
  Bath,
  MapPin,
  Waves,
  Star,
  Wifi,
  CircleDollarSign,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RoomDetailDisplay } from "@/types/room";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

interface RoomDetailsProps {
  room: RoomDetailDisplay;
}

// Memoized DetailItem component for better performance
const DetailItem = memo(({ icon, label, value }: DetailItemProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="rounded-full bg-[#5a8d69]/10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
        {icon}
      </div>
      <p className="text-[#0a3b33]/70 text-xs sm:text-sm">{label}</p>
      <p className="text-[#0a3b33] text-sm sm:text-base font-medium">{value}</p>
    </div>
  );
});

DetailItem.displayName = "DetailItem";

// Main component with animation and improved responsiveness
const RoomDetails = memo(({ room }: RoomDetailsProps) => {
  const { t } = useTranslation();

  return (
    <Card className="mb-6 sm:mb-8 border-0">
      <CardHeader className="pb-2 px-3 sm:px-6 pt-4 sm:pt-6">
        <motion.div
          className="flex items-center mb-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-0.5 w-4 sm:w-5 bg-[#9C6B4A] mr-2"></div>
          <CardTitle className="text-xl sm:text-2xl text-[#0a3b33] font-bold">
            {t("rooms.roomDetails.title")}
          </CardTitle>
        </motion.div>
        <CardDescription className="text-[#0a3b33]/70 text-sm sm:text-base">
          {t("rooms.roomDetails.subtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <DetailItem
            icon={
              <SquareUser className="h-4 w-4 sm:h-5 sm:w-5 text-[#5a8d69]" />
            }
            label={t("rooms.roomDetails.roomType")}
            value={
              room.category === "room"
                ? t("rooms.roomDetails.standardRoom")
                : room.category === "double"
                ? t("rooms.roomDetails.doubleRoom")
                : room.category
            }
          />

          <DetailItem
            icon={<Maximize className="h-4 w-4 sm:h-5 sm:w-5 text-[#5a8d69]" />}
            label={t("rooms.roomDetails.area")}
            value={`${room.size} m²`}
          />

          <DetailItem
            icon={
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#5a8d69]" />
            }
            label={t("rooms.roomDetails.floor")}
            value={t("rooms.roomDetails.floorNumber", { floor: room.floor })}
          />

          <DetailItem
            icon={<Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#5a8d69]" />}
            label={t("rooms.roomDetails.capacity")}
            value={t("rooms.roomDetails.capacityValue", {
              capacity: room.maxCapacity,
            })}
          />
        </div>

        <motion.div
          className="bg-[#f8f3e9] p-3 sm:p-5 rounded-lg mb-4 sm:mb-6 border border-[#5a8d69]/10 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
            <Bed className="h-4 w-4 sm:h-5 sm:w-5 text-[#9C6B4A]" />
            <span className="text-[#0a3b33]">
              {t("rooms.roomDetails.bedInfo")}
            </span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
            <div className="bg-white p-2 sm:p-3 rounded-lg text-center border border-[#5a8d69]/10 shadow-sm">
              <span className="block text-base sm:text-lg font-medium text-[#0a3b33]">
                {room.bathrooms}
              </span>
              <span className="text-[#0a3b33]/70 text-xs sm:text-sm">
                {t("rooms.roomDetails.bathroom")}
              </span>
            </div>
            {room.bedrooms && (
              <div className="bg-white p-2 sm:p-3 rounded-lg text-center border border-[#5a8d69]/10 shadow-sm">
                <span className="block text-base sm:text-lg font-medium text-[#0a3b33]">
                  {room.bedrooms}
                </span>
                <span className="text-[#0a3b33]/70 text-xs sm:text-sm">
                  {t("rooms.roomDetails.bedroom")}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#9C6B4A]" />
            <span className="text-[#0a3b33]">
              {t("rooms.roomDetails.checkInOutTime")}
            </span>
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-[#f8f3e9] p-3 sm:p-4 rounded-lg border border-[#5a8d69]/10 shadow-sm">
              <p className="text-[#0a3b33]/70 text-xs sm:text-sm">
                {t("rooms.roomDetails.checkIn")}
              </p>
              <p className="text-[#0a3b33] font-medium text-sm sm:text-base">
                {t("rooms.roomDetails.from", { time: room.checkInTime })}
              </p>
            </div>
            <div className="bg-[#f8f3e9] p-3 sm:p-4 rounded-lg border border-[#5a8d69]/10 shadow-sm">
              <p className="text-[#0a3b33]/70 text-xs sm:text-sm">
                {t("rooms.roomDetails.checkOut")}
              </p>
              <p className="text-[#0a3b33] font-medium text-sm sm:text-base">
                {t("rooms.roomDetails.before", { time: room.checkOutTime })}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
            <Wifi className="h-4 w-4 sm:h-5 sm:w-5 text-[#9C6B4A]" />
            <span className="text-[#0a3b33]">
              {t("rooms.roomDetails.keyAmenities")}
            </span>
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {room.amenities.slice(0, 6).map((amenity, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 bg-white text-[#0a3b33] border border-[#5a8d69]/30 font-medium"
              >
                {amenity}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
            <Ban className="h-4 w-4 sm:h-5 sm:w-5 text-[#9C6B4A]" />
            <span className="text-[#0a3b33]">
              {t("rooms.roomDetails.rules")}
            </span>
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Badge
              className={`text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 font-medium ${
                room.houseRules?.smokingAllowed
                  ? "bg-[#5a8d69]/10 text-[#5a8d69] hover:bg-[#5a8d69]/20"
                  : "bg-[#9C6B4A]/10 text-[#9C6B4A] hover:bg-[#9C6B4A]/20"
              }`}
            >
              {room.houseRules?.smokingAllowed
                ? t("rooms.roomDetails.smokingAllowed")
                : t("rooms.roomDetails.noSmoking")}
            </Badge>
            <Badge
              className={`text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 font-medium ${
                room.houseRules?.petsAllowed
                  ? "bg-[#5a8d69]/10 text-[#5a8d69] hover:bg-[#5a8d69]/20"
                  : "bg-[#9C6B4A]/10 text-[#9C6B4A] hover:bg-[#9C6B4A]/20"
              }`}
            >
              {room.houseRules?.petsAllowed
                ? t("rooms.roomDetails.petsAllowed")
                : t("rooms.roomDetails.noPets")}
            </Badge>
            <Badge
              className={`text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 font-medium ${
                room.houseRules?.partiesAllowed
                  ? "bg-[#5a8d69]/10 text-[#5a8d69] hover:bg-[#5a8d69]/20"
                  : "bg-[#9C6B4A]/10 text-[#9C6B4A] hover:bg-[#9C6B4A]/20"
              }`}
            >
              {room.houseRules?.partiesAllowed
                ? t("rooms.roomDetails.partiesAllowed")
                : t("rooms.roomDetails.noParties")}
            </Badge>
          </div>
        </motion.div>

        <Separator className="my-4 sm:my-6 bg-[#5a8d69]/30" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
            <Mountain className="h-4 w-4 sm:h-5 sm:w-5 text-[#9C6B4A]" />
            <span className="text-[#0a3b33]">
              {t("rooms.roomDetails.designConcept")}
            </span>
          </h3>

          <p className="mb-4 text-[#0a3b33]/80 leading-relaxed text-sm sm:text-base">
            {room.description}
          </p>
        </motion.div>

        {room.pricing && (
          <motion.div
            className="bg-[#f8f3e9] p-3 sm:p-5 rounded-lg mt-4 sm:mt-6 border border-[#5a8d69]/10 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
              <CircleDollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-[#9C6B4A]" />
              <span className="text-[#0a3b33]">
                {t("rooms.roomDetails.priceDetails")}
              </span>
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-white p-2 sm:p-3 rounded-lg text-center border border-[#5a8d69]/10 shadow-sm">
                <span className="block text-xs sm:text-sm text-[#0a3b33]/70">
                  {t("rooms.roomDetails.basePrice")}
                </span>
                <span className="text-[#0a3b33] font-medium text-sm sm:text-base">
                  {formatPrice(room.pricing.basePrice)}
                </span>
              </div>
              <div className="bg-white p-2 sm:p-3 rounded-lg text-center border border-[#5a8d69]/10 shadow-sm">
                <span className="block text-xs sm:text-sm text-[#0a3b33]/70">
                  {t("rooms.roomDetails.cleaningFee")}
                </span>
                <span className="text-[#0a3b33] font-medium text-sm sm:text-base">
                  {formatPrice(room.pricing.cleaningFee)}
                </span>
              </div>
              <div className="bg-white p-2 sm:p-3 rounded-lg text-center border border-[#5a8d69]/10 shadow-sm">
                <span className="block text-xs sm:text-sm text-[#0a3b33]/70">
                  {t("rooms.roomDetails.deposit")}
                </span>
                <span className="text-[#0a3b33] font-medium text-sm sm:text-base">
                  {formatPrice(room.pricing.securityDeposit)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
});

RoomDetails.displayName = "RoomDetails";
export default RoomDetails;

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}
