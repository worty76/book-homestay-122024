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
    <Card className="mb-8 bg-[#324b3e]">
      <CardHeader>
        <CardTitle className="text-[#F3ECDC]">Tiện nghi</CardTitle>
        <CardDescription className="text-[#F3ECDC]">Các tiện nghi có sẵn trong phòng</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="room">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#8a9a5b]">
            <TabsTrigger value="room" className="flex items-center gap-1 bg-[#8a9a5b]">
              <Home className="h-4 w-4" />
              <span>Phòng</span>
            </TabsTrigger>
            <TabsTrigger value="bathroom" className="flex items-center gap-1 bg-[#8a9a5b]">
              <Bath className="h-4 w-4" />
              <span>Phòng tắm</span>
            </TabsTrigger>
          </TabsList>
 
          <TabsContent value="room" className="mt-0 bg-[#324b3e]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#8a9a5b] flex-shrink-0 mt-0.5" />
                  <span className="text-white">{amenity}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bathroom" className="mt-0 bg-[#324b3e]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {bathroomAmenities.map((amenity, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#8a9a5b] flex-shrink-0 mt-0.5" />
                  <span className="text-white">{amenity}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
