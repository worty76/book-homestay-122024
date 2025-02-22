"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const newsItems = [
  {
    category: "Champion",
    title: "Introducing Employee Champion Of November",
    image: "/images/img1.jpg",
    alt: "Employee Champion of November",
  },
  {
    category: "Record Breaking",
    title: "We Hit 100% Room Occupancy This Month",
    image: "/images/img1.jpg",
    alt: "100% Room Occupancy",
  },
  {
    category: "Luxury",
    title: "Why Horizon Is The Best Hotel In Entebbe",
    image: "/images/img1.jpg",
    alt: "Horizon Hotel in Entebbe",
  },
  {
    category: "Achievement",
    title: "Best Customer Service Award 2023",
    image: "/images/img1.jpg",
    alt: "Customer Service Award",
  },
  {
    category: "Event",
    title: "Annual Staff Recognition Ceremony",
    image: "/images/img1.jpg",
    alt: "Staff Recognition",
  },
];

export function MonthlyChampions() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-amber-500 uppercase tracking-wider text-sm font-medium mb-2">
          Inside Horizon Hotel
        </h2>
        <h3 className="text-4xl font-serif mb-12">
          Our Monthly Champions & News
        </h3>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              slides: {
                perView: 1,
                spacing: 32,
              },
              breakpoints: {
                "(min-width: 768px)": {
                  slides: {
                    perView: 2,
                    spacing: 32,
                  },
                },
                "(min-width: 1024px)": {
                  slides: {
                    perView: 3,
                    spacing: 32,
                  },
                },
              },
            }}
            className="w-full"
          >
            <CarouselContent>
              {newsItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="relative group">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={400}
                      height={300}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute top-4 right-4 text-xs bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                      NOV 2023
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-white p-6 transform transition-transform">
                      <div className="text-gray-500 uppercase text-xs tracking-wider mb-2">
                        {item.category}
                      </div>
                      <h4 className="text-gray-900 text-xl font-serif">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 -translate-x-1/2 bg-white text-gray-900 hover:bg-gray-100" />
            <CarouselNext className="absolute right-0 translate-x-1/2 bg-white text-gray-900 hover:bg-gray-100" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
