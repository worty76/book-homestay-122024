"use client";

import { useState } from "react";
import { Calendar, Minus, Plus, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoomCard from "./roomCard";
import FacilitiesSection from "./facilitiesSection";
import MapSection from "./mapSection";

export default function RoomBooking() {
  const [guests, setGuests] = useState(2);

  const increaseGuests = () => {
    if (guests < 10) setGuests(guests + 1);
  };

  const decreaseGuests = () => {
    if (guests > 1) setGuests(guests - 1);
  };

  return (
    <div className="container py-8">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="list"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 data-[state=active]:shadow-none px-4 py-2 h-auto"
          >
            List Apartemen
          </TabsTrigger>
          <TabsTrigger
            value="availability"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 data-[state=active]:shadow-none px-4 py-2 h-auto"
          >
            Ketersediaan dan tarif
          </TabsTrigger>
          <TabsTrigger
            value="facilities"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 data-[state=active]:shadow-none px-4 py-2 h-auto"
          >
            Fasilitas
          </TabsTrigger>
          <TabsTrigger
            value="neighbors"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 data-[state=active]:shadow-none px-4 py-2 h-auto"
          >
            Para tetangga
          </TabsTrigger>
          <TabsTrigger
            value="policy"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 data-[state=active]:shadow-none px-4 py-2 h-auto"
          >
            Kebijakan pemesanan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
            <div>
              <h2 className="text-lg font-medium mb-4">
                Atur Jadwal mu disini..
              </h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex border rounded-full overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>Check-in</span>
                  </div>
                  <div className="flex items-center px-2">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>Check-out</span>
                  </div>
                </div>

                <div className="flex items-center border rounded-full px-4 py-2">
                  <Users className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="mr-2">Orang</span>
                  <button
                    onClick={decreaseGuests}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100"
                    disabled={guests <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-3">{guests}</span>
                  <button
                    onClick={increaseGuests}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100"
                    disabled={guests >= 10}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button variant="outline" className="rounded-full">
                  Harga
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-3 max-w-lg">
                Harga diperlihatkan: Tata letak, furnitur, dan dekorasi ruangan
                Anda mungkin berbeda dari yang ditampilkan di sini.
              </p>
            </div>

            <div className="bg-[#5a8d69] text-white p-4 rounded-lg max-w-md">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm">
                  Pesan dengan ketenangan pikiran sebelum check-in untuk
                  pembayaran seluruh dana
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <RoomCard
              title="Single Room"
              image="/placeholder.svg?height=300&width=500"
              price="Rp. 500.000"
              specs={[
                { icon: "bed", text: "1 Tempat tidur" },
                { icon: "user", text: "1 Pengunjung" },
                { icon: "bath", text: "1 Kamar mandi" },
                { icon: "size", text: "67 Sq ft" },
              ]}
              facilities={[
                "Twin bed",
                "Air Conditioning",
                "Television",
                "Cable TV",
                "Streaming device",
              ]}
            />

            <RoomCard
              title="Double Room"
              image="/placeholder.svg?height=300&width=500"
              price="Rp. 500.000"
              specs={[
                { icon: "bed", text: "2 Bedroom" },
                { icon: "user", text: "2-3 Guest" },
                { icon: "bath", text: "1 Bathroom" },
                { icon: "size", text: "84 Sq ft" },
              ]}
              facilities={[
                "Twin bed",
                "Air Conditioning",
                "Television",
                "Cable TV",
                "Streaming device",
              ]}
            />

            <RoomCard
              title="Premium Room"
              image="/placeholder.svg?height=300&width=500"
              price="Rp. 500.000"
              specs={[
                { icon: "bed", text: "3 Bedroom" },
                { icon: "user", text: "5 Guest" },
                { icon: "bath", text: "2 Bathroom" },
                { icon: "size", text: "92 Sq ft" },
              ]}
              facilities={[
                "Twin bed",
                "Air Conditioning",
                "Television",
                "Cable TV",
                "Streaming device",
              ]}
            />

            <RoomCard
              title="Single Room Class Elite"
              image="/placeholder.svg?height=300&width=500"
              price="Rp. 500.000"
              specs={[
                { icon: "bed", text: "1 Bedroom" },
                { icon: "user", text: "1 Guest" },
                { icon: "bath", text: "1 Bathroom" },
                { icon: "size", text: "67 Sq ft" },
              ]}
              facilities={[
                "Twin bed",
                "Air Conditioning",
                "Television",
                "Cable TV",
                "Streaming device",
              ]}
            />

            <RoomCard
              title="Private Room"
              image="/placeholder.svg?height=300&width=500"
              price="Rp. 500.000"
              specs={[
                { icon: "bed", text: "1 Bedroom" },
                { icon: "user", text: "1 Guest" },
                { icon: "bath", text: "1 Bathroom" },
                { icon: "size", text: "67 Sq ft" },
              ]}
              facilities={[
                "Twin bed",
                "Air Conditioning",
                "Television",
                "Cable TV",
                "Streaming device",
              ]}
            />
          </div>

          <div className="flex justify-center mt-8">
            <Button variant="outline" className="rounded-full px-8">
              Lihat Lainnya
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="availability">
          <div className="py-8 text-center text-gray-500">
            Ketersediaan dan tarif content will appear here
          </div>
        </TabsContent>

        <TabsContent value="facilities">
          <FacilitiesSection />
        </TabsContent>

        <TabsContent value="neighbors">
          <MapSection />
        </TabsContent>

        <TabsContent value="policy">
          <div className="py-8 text-center text-gray-500">
            Kebijakan pemesanan content will appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
