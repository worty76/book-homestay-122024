"use client";

import { memo, useState } from "react";
import { Bed, Bath, Check, Home } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    const [activeTab, setActiveTab] = useState("room");

    const handleTabChange = (value: string) => {
      setActiveTab(value);
    };

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
          <Tabs
            defaultValue="room"
            onValueChange={handleTabChange}
            value={activeTab}
          >
            <TabsList className="grid w-full grid-cols-2 mb-3 sm:mb-4 bg-[#f8f3e9] border border-[#5a8d69]/20">
              <TabsTrigger
                value="room"
                className="text-xs sm:text-sm py-1.5 sm:py-2 data-[state=active]:bg-white data-[state=active]:text-[#0a3b33] data-[state=active]:shadow-sm"
              >
                <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                <span>Phòng</span>
              </TabsTrigger>
              <TabsTrigger
                value="bathroom"
                className="text-xs sm:text-sm py-1.5 sm:py-2 data-[state=active]:bg-white data-[state=active]:text-[#0a3b33] data-[state=active]:shadow-sm"
              >
                <Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                <span>Phòng tắm</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="room"
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                key="room-amenities"
              >
                {amenities.length > 0 ? (
                  amenities.map((amenity, index) => (
                    <AmenityItem key={`room-${index}`} amenity={amenity} />
                  ))
                ) : (
                  <p className="text-[#0a3b33]/60 text-sm col-span-2 py-2">
                    Không có thông tin tiện nghi
                  </p>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent
              value="bathroom"
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                key="bathroom-amenities"
              >
                {bathroomAmenities.length > 0 ? (
                  bathroomAmenities.map((amenity, index) => (
                    <AmenityItem key={`bathroom-${index}`} amenity={amenity} />
                  ))
                ) : (
                  <p className="text-[#0a3b33]/60 text-sm col-span-2 py-2">
                    Không có thông tin tiện nghi phòng tắm
                  </p>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }
);

RoomAmenities.displayName = "RoomAmenities";
export default RoomAmenities;
