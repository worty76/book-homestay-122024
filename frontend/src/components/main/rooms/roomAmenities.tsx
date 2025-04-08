"use client";

import { memo } from "react";
import { Check, Home, Bath } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface RoomAmenitiesProps {
  amenities: string[];
  bathroomAmenities: string[];
}

// Memoized amenity item to prevent re-renders
const AmenityItem = memo(({ amenity }: { amenity: string }) => (
  <motion.div
    className="flex items-start gap-1.5 sm:gap-2"
    initial={{ opacity: 0, x: -5 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2 }}
  >
    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-[#5a8d69] flex-shrink-0 mt-0.5" />
    <span className="text-[#0a3b33] text-sm sm:text-base">{amenity}</span>
  </motion.div>
));

AmenityItem.displayName = "AmenityItem";

const RoomAmenities = memo(
  ({ amenities, bathroomAmenities }: RoomAmenitiesProps) => {
    return (
      <Card className="mb-6 sm:mb-8">
        <CardHeader className="pb-2 px-3 sm:px-6 pt-4 sm:pt-6">
          <motion.div
            className="flex items-center mb-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-0.5 w-4 sm:w-5 bg-[#9C6B4A] mr-2"></div>
            <CardTitle className="text-xl sm:text-2xl text-[#0a3b33] font-bold">
              Tiện nghi
            </CardTitle>
          </motion.div>
          <CardDescription className="text-[#0a3b33]/70 text-sm sm:text-base">
            Các tiện nghi có sẵn trong phòng
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          {amenities.length > 0 || bathroomAmenities.length > 0 ? (
            <div className="space-y-4">
              {amenities.length > 0 && (
                <div>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {amenities.map((amenity, index) => (
                      <AmenityItem key={`room-${index}`} amenity={amenity} />
                    ))}
                  </motion.div>
                </div>
              )}

              {bathroomAmenities.length > 0 && (
                <div>
                  <div className="flex items-center mb-2">
                    <Bath className="h-4 w-4 sm:h-5 sm:w-5 text-[#5a8d69] mr-2" />
                    <h3 className="font-medium text-[#0a3b33]">Phòng tắm</h3>
                  </div>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {bathroomAmenities.map((amenity, index) => (
                      <AmenityItem
                        key={`bathroom-${index}`}
                        amenity={amenity}
                      />
                    ))}
                  </motion.div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-[#0a3b33]/60 text-sm py-2">
              Không có thông tin tiện nghi
            </p>
          )}
        </CardContent>
      </Card>
    );
  }
);

RoomAmenities.displayName = "RoomAmenities";
export default RoomAmenities;
