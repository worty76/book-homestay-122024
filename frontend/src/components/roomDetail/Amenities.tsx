import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wifi,
  Utensils,
  PawPrint,
  Wind,
  Lock,
  Camera,
  Refrigerator,
  Bike,
} from "lucide-react";

export default function Amenities() {
  const amenities = [
    { icon: Wifi, label: "Wifi" },
    { icon: Utensils, label: "Kitchen" },
    { icon: PawPrint, label: "Pets allowed" },
    { icon: Wind, label: "Central air conditioning" },
    { icon: Lock, label: "Free washer - in building" },
    { icon: Camera, label: "Security cameras on property" },
    { icon: Refrigerator, label: "Refrigerator" },
    { icon: Bike, label: "Bicycles" },
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>What this place offers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <amenity.icon className="h-5 w-5" />
              <span>{amenity.label}</span>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full">
          Show all 37 amenities
        </Button>
      </CardContent>
    </Card>
  );
}
