"use client";

import { Bed, Bath, Check, Home } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RoomAmenitiesProps {
  amenities: string[];
  bathroomAmenities: string[];
}

export default function RoomAmenities({
  amenities,
  bathroomAmenities,
}: RoomAmenitiesProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center mb-1">
          <div className="h-0.5 w-5 bg-[#9C6B4A] mr-2"></div>
          <CardTitle className="text-2xl text-[#0a3b33] font-bold">
            Tiện nghi
          </CardTitle>
        </div>
        <CardDescription className="text-[#0a3b33]/70">
          Các tiện nghi có sẵn trong phòng
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="room">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#f8f3e9] border border-[#5a8d69]/20">
            <TabsTrigger
              value="room"
              className="data-[state=active]:bg-white data-[state=active]:text-[#0a3b33] data-[state=active]:shadow-sm"
            >
              <Home className="h-4 w-4 mr-1" />
              <span>Phòng</span>
            </TabsTrigger>
            <TabsTrigger
              value="bathroom"
              className="data-[state=active]:bg-white data-[state=active]:text-[#0a3b33] data-[state=active]:shadow-sm"
            >
              <Bath className="h-4 w-4 mr-1" />
              <span>Phòng tắm</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="room" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#5a8d69] flex-shrink-0 mt-0.5" />
                  <span className="text-[#0a3b33]">{amenity}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bathroom" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {bathroomAmenities.map((amenity, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#5a8d69] flex-shrink-0 mt-0.5" />
                  <span className="text-[#0a3b33]">{amenity}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
