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
        <CardTitle>Tiện nghi</CardTitle>
        <CardDescription>Các tiện nghi có sẵn trong phòng</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="room">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="room" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Phòng</span>
            </TabsTrigger>
            <TabsTrigger value="bathroom" className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>Phòng tắm</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="room" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bathroom" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              {bathroomAmenities.map((amenity, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
