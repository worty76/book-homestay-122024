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
import { Room, rooms } from "@/data/rooms";

const RoomList = () => {
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [plugin, setPlugin] = useState<AutoplayType | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Load featured rooms
  useEffect(() => {
    // Get a selection of rooms (first 5 or less)
    const selectedRooms = rooms.slice(0, Math.min(5, rooms.length));
    setFeaturedRooms(selectedRooms);
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
    <section className="bg-[#f8f3e9] py-16">
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
              {featuredRooms.map((room, index) => (
                <CarouselItem
                  key={room.id}
                  className="md:basis-1/2 lg:basis-1/3 pl-6"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <RoomCard room={room} />
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
