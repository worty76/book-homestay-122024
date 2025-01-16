import Amenities from "@/components/roomDetail/Amenities";
import BookingCard from "@/components/roomDetail/BookingCard";
import HouseRules from "@/components/roomDetail/HouseRules";
import PropertyDetails from "@/components/roomDetail/PropertyDetails";
import PropertyGallery from "@/components/roomDetail/PropertyGallery";
import PropertyHeader from "@/components/roomDetail/PropertyHeader";
import SleepingArrangements from "@/components/roomDetail/SleepingArrangements";
import { Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="px-6 py-6">
      <PropertyHeader />
      <PropertyGallery />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <PropertyDetails />
          <SleepingArrangements />
          <Amenities />
          <Calendar />
          <HouseRules />
        </div>
        <div>
          <BookingCard />
        </div>
      </div>
    </div>
  );
}
