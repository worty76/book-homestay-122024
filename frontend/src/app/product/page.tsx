import { Header } from "@/components/main/Header";
import Amenities from "@/components/main/roomDetail/Amenities";
import BookingCard from "@/components/main/roomDetail/BookingCard";
import Calendar from "@/components/main/roomDetail/Calendar";
import HouseRules from "@/components/main/roomDetail/HouseRules";
import PropertyDetails from "@/components/main/roomDetail/PropertyDetails";
import PropertyGallery from "@/components/main/roomDetail/PropertyGallery";
import PropertyHeader from "@/components/main/roomDetail/PropertyHeader";
import SleepingArrangements from "@/components/main/roomDetail/SleepingArrangements";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="relative min-h-[500px] overflow-hidden">
          <Header />
          <div className="absolute inset-0">
            <Image
              src={`/images/img1.jpg`}
              alt={`abc`}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute"></div>
        </div>
      </div>

      <div className="container px-6 py-6 mx-auto">
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
    </>
  );
}
