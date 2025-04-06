"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import Link from "next/link";
import RoomCard from "./rooms/roomCard";

// Define types locally to avoid import issues
type RoomType = "Twin" | "Double" | "Dormitory";
type ViewType = "Window" | "Balcony";
type RoomCategory = "Deluxe" | "Standard";

interface Room {
  id: string;
  name: string;
  floor: number;
  type: RoomType;
  category: RoomCategory;
  view: ViewType;
  size: number;
  maxCapacity: number;
  price: number;
  available: boolean;
  description: string;
  story: string;
  mainColors: string[];
  amenities: string[];
  bathroomAmenities: string[];
  images: string[];
  rating?: number; // Add rating property
}

// API Room interface
interface ApiRoom {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string[];
  status: string;
  floor?: string;
  dailyRate: number;
  capacity: {
    maxGuests: number;
  };
  facilities: {
    roomSize: number;
    bedsDescription?: Array<{ type: string }>;
  };
  amenities: string[];
  averageRating?: number;
}

const RoomList = () => {
  const [rooms, setRooms] = useState<ApiRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plugin, setPlugin] = useState<AutoplayType | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/room`
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setRooms(data.slice(0, Math.min(5, data.length)));
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    setPlugin(
      Autoplay({
        delay: 3000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      })
    );
  }, []);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) api.scrollTo(index);
  };

  return (
    <section className="bg-[#f8f3e9] py-16" id="roomCarousel">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <span className="text-[#5a8d69] uppercase tracking-wider text-sm mb-4 block">
              Khám phá các phòng
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-[#0a3b33] leading-tight">
              Phòng tiêu biểu
            </h2>
          </div>

          <Link href="/rooms" legacyBehavior>
            <motion.a
              className="hidden md:flex items-center gap-2 text-[#5a8d69] uppercase tracking-wider text-sm group cursor-pointer"
              whileHover={{ x: 4 }}
            >
              Xem tất cả phòng
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </Link>
        </div>

        <div className="relative px-8">
          {loading ? (
            <div className="flex justify-center items-center h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5a8d69]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              <p>Unable to load rooms: {error}</p>
            </div>
          ) : (
            <>
              <Carousel
                className="mb-4"
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={plugin ? [plugin] : undefined}
                setApi={setApi}
              >
                <CarouselContent>
                  {rooms.map((room, index) => (
                    <CarouselItem
                      key={room._id}
                      className="md:basis-1/2 lg:basis-1/3 pl-6"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      >
                        <RoomCard
                          room={{
                            id: room._id,
                            name: room.name,
                            description: room.description || "",
                            price: room.dailyRate,
                            // Explicitly cast to RoomType
                            type: (room.facilities.bedsDescription?.[0]?.type ||
                              "Double") as RoomType,
                            // Explicitly cast to ViewType
                            view: "Window" as ViewType,
                            // Explicitly cast to RoomCategory
                            category: room.category as RoomCategory,
                            images: room.image,
                            maxCapacity: room.capacity.maxGuests,
                            amenities: room.amenities,
                            available: room.status === "available",
                            rating: room.averageRating || 0,
                            floor: parseInt(room.floor || "1", 10),
                            size: room.facilities.roomSize || 20,
                            // Adding missing required properties with default values
                            story: "",
                            mainColors: ["#ffffff", "#f5f5f5"],
                            bathroomAmenities: [],
                            // Add the missing properties
                            maxAdults: room.capacity.maxGuests,
                            maxChildren: 0,
                            // Optional properties with default values
                            cleaningFee: 0,
                            securityDeposit: 0,
                            basePrice: room.dailyRate,
                            bedrooms: 1,
                            bathrooms: 1,
                            checkInTime: "14:00",
                            checkOutTime: "12:00",
                            houseRules: {
                              smokingAllowed: false,
                              petsAllowed: false,
                              partiesAllowed: false,
                              checkInTime: "14:00",
                              checkOutTime: "12:00",
                            },
                            bedsDescription: room.facilities.bedsDescription
                              ? room.facilities.bedsDescription.map(
                                  (bed: { type?: string }) => ({
                                    type: bed.type || "Double",
                                    count: 1, // Default count value
                                    _id: room._id + "-bed", // Generate a unique ID
                                  })
                                )
                              : [
                                  {
                                    type: "Double",
                                    count: 1,
                                    _id: room._id + "-default-bed",
                                  },
                                ],
                          }}
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="w-12 h-12 bg-[#8a9a5b] hover:bg-[#758a4b] text-white rounded-full shadow-md -ml-6 absolute left-0" />
                <CarouselNext className="w-12 h-12 bg-[#8a9a5b] hover:bg-[#758a4b] text-white rounded-full shadow-md -mr-6 absolute right-0" />
              </Carousel>

              <div className="flex justify-center gap-2 mt-6 mb-4">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === current
                        ? "bg-[#5a8d69] w-8"
                        : "bg-[#5a8d69]/30 hover:bg-[#5a8d69]/50"
                    }`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <Link href="/rooms" legacyBehavior>
          <motion.a
            className="flex md:hidden items-center gap-2 text-[#5a8d69] uppercase tracking-wider text-sm justify-center cursor-pointer mt-6"
            whileHover={{ x: 4 }}
          >
            Xem tất cả phòng
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </Link>
      </div>
    </section>
  );
};

export default RoomList;
