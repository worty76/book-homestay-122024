
import { Calendar } from "@/components/ui/calendar";
import Amenities from "./Amenities";
import PropertyDetails from "./PropertyDetails";
import PropertyGallery from "./PropertyGallery";
import SleepingArrangements from "./SleepingArrangements";
import HouseRules from "./HouseRules";
import BookingCard from "./BookingCard";

export default function PropertyListing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <PropertyGallery />
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
  );
}
