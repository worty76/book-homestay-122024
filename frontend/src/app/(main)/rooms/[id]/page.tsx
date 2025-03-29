"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import RoomGallery from "@/components/main/rooms/roomGallery";
import RoomDetails from "@/components/main/rooms/roomDetails";
import RoomAmenities from "@/components/main/rooms/roomAmenities";
import BookingForm from "@/components/main/rooms/bookingForm";
import { Skeleton } from "@/components/ui/skeleton";
import AnotherHeader from "@/components/main/another-header";
import { RoomCategory, RoomType, ViewType } from "@/data/rooms";

// Updated Room interface based on API response
interface Room {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string[];
  amenities: string[];
  status: "available" | "booked";
  averageRating: number;
  dailyRate: number;
  capacity: {
    maxGuests: number;
    maxAdults?: number;
    maxChildren?: number;
  };
  pricing: {
    basePrice: number;
    cleaningFee: number;
    securityDeposit: number;
  };
  houseRules: {
    smokingAllowed: boolean;
    petsAllowed: boolean;
    partiesAllowed: boolean;
    checkInTime: string;
    checkOutTime: string;
  };
  facilities: {
    bathrooms: number;
    roomSize: number;
    bedsDescription: {
      type: string;
      count: number;
      _id: string;
    }[];
  };
  floor?: string;
  bedrooms?: number;
  shared?: boolean;
  bathroomAmenities?: string[]; // Added for compatibility with existing components
}

// Helper function to map API values to expected enum types
const mapCategory = (category: string): RoomCategory => {
  return category === "room" || category === "suite" || category === "apartment" 
    ? "Standard" 
    : "Deluxe";
};

const mapRoomType = (type: string): RoomType => {
  if (type === "Single" || type === "Double") return "Double";
  if (type === "Queen" || type === "King") return "Twin";
  return "Dormitory";
};

const mapViewType = (view: string): ViewType => {
  return view === "Ocean View" ? "Balcony" : "Window";
};

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/room/${params.id}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            setLoading(false);
            return;
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Exclude location from the fetched data
        const { location, ...roomData } = data;
        const transformedRoom: Room = {
          ...roomData,
          bathroomAmenities: ["Shower", "Toiletries", "Hair Dryer"], // Default bathroom amenities
        };

        setRoom(transformedRoom);
      } catch (err) {
        console.error("Failed to fetch room:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch room details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [params.id]);

  if (loading) {
    return <RoomDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!room) {
    notFound();
  }

  return (
    <>
      <AnotherHeader
        title="Chi tiết phòng"
        description=""
        image="/images/img4.jpg"
      />
      <div className="bg-[#f8f3e9]">
        <div className="container mx-auto px-4 py-8 ">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[#0a3b33]">
              {room.name}
            </h1>
            <p className="text-[#5a8d69]">
              {room.facilities.bedsDescription.map((bed, index) => (
                <span key={bed._id}>
                  {index > 0 && ", "}
                  {bed.count} {bed.type} bed{bed.count > 1 ? "s" : ""}
                </span>
              ))}
              {" · "}
              {room.category === "room" ? "Standard" : room.category} Room
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RoomGallery images={room.image} alt={room.name} />

              <RoomDetails
                room={{
                  id: room._id,
                  name: room.name,
                  description: room.description,
                  maxCapacity: room.capacity.maxGuests,
                  size: room.facilities.roomSize,
                  floor: parseInt(room.floor || "1"),
                  type: mapRoomType(room.facilities.bedsDescription[0]?.type || "Standard"),
                  bedsDescription: room.facilities.bedsDescription,
                  price: room.dailyRate,
                  view: "Window" as ViewType,
                  amenities: room.amenities,
                  bathroomAmenities: room.bathroomAmenities || [],
                  images: room.image,
                  category: mapCategory(room.category),
                  available: room.status === "available",
                  rating: room.averageRating,
                  checkInTime: room.houseRules.checkInTime,
                  checkOutTime: room.houseRules.checkOutTime,
                  bathrooms: room.facilities.bathrooms,
                  bedrooms: room.bedrooms || 1,
                  shared: room.shared || false,
                  pricing: room.pricing,
                  houseRules: room.houseRules,
                }}
              />

              <RoomAmenities
                amenities={room.amenities}
                bathroomAmenities={room.bathroomAmenities || []}
              />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BookingForm
                  room={{
                    id: room._id,
                    name: room.name,
                    price: room.dailyRate,
                    maxCapacity: room.capacity.maxGuests,
                    maxAdults:
                      room.capacity.maxAdults || room.capacity.maxGuests,
                    maxChildren: room.capacity.maxChildren || 0,
                    cleaningFee: room.pricing.cleaningFee,
                    securityDeposit: room.pricing.securityDeposit,
                    basePrice: room.pricing.basePrice,
                    available: room.status === "available",
                    description: room.description,
                    type: mapRoomType(room.facilities.bedsDescription[0]?.type || "Standard"),
                    view: mapViewType(room.category === "room" ? "Ocean View" : "City View"),
                    category: mapCategory(room.category),
                    images: room.image,
                    amenities: room.amenities,
                    bathroomAmenities: room.bathroomAmenities || [],
                    rating: room.averageRating,
                    floor: parseInt(room.floor || "1"),
                    size: room.facilities.roomSize,
                    bedrooms: room.bedrooms || 1,
                    bathrooms: room.facilities.bathrooms,
                    checkInTime: room.houseRules.checkInTime,
                    checkOutTime: room.houseRules.checkOutTime,
                    houseRules: room.houseRules,
                    bedsDescription: room.facilities.bedsDescription,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function RoomDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 w-3/4 mb-2">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="h-5 w-1/2">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="h-[400px] w-full mb-8">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="h-[200px] w-full mb-8">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="h-[300px] w-full mb-8">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="h-[250px] w-full">
            <Skeleton className="h-full w-full" />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="h-[500px] w-full sticky top-8">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
