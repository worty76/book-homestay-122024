import { PropertyGallery } from "./PropertyGallery";
import { PropertyDetails } from "./PropertyDetails";
import { BookingCard } from "./BookingCard";
import Amenities from "./Amenities";
import { Calendar } from "./Calendar";
import { HouseRules } from "./HouseRules";
import SleepingArrangements from "./SleepingArrangements";

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
