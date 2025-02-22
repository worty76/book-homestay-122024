"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Title } from "./Title";

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  originalPrice: number;
  area: number;
  bedrooms: number;
  imageUrl: string;
}

const properties: Property[] = [
  {
    id: "villa-6-pn",
    name: "Villa 6 PN",
    location:
      "Tọa lạc tại Khu du lịch Tiến Thành - Phía nam TP. Phan Thiết, biệt thự có 6 phòng ngủ, 1 phòng khách + bếp, bãn biển lô, hồ bơi riêng và cách biển vài...",
    price: 6500000,
    originalPrice: 7000000,
    area: 1000,
    bedrooms: 15,
    imageUrl: "/images/img1.jpg",
  },
  {
    id: "flora-villa",
    name: "Flora Villa",
    location:
      "Biệt thự Flora có diện tích hơn 1000m2 với 7 phòng ngủ (11 giường), 6 wc, phòng khách rộng rãi hiện đại, đầy đủ tiện nghi sinh hoạt...",
    price: 7000000,
    originalPrice: 8000000,
    area: 1000,
    bedrooms: 11,
    imageUrl: "/images/img1.jpg",
  },
  {
    id: "cocobeach",
    name: "Cocobeach",
    location:
      "Tọa lạc tại phía nam TP. Phan Thiết, KDL Tiến Thành, Cocobeach là một villa với diện tích 140m2 có bãi biển riêng, hồ bơi riêng bao gồm 2 phòng ngủ...",
    price: 5000000,
    originalPrice: 6000000,
    area: 140,
    bedrooms: 2,
    imageUrl: "/images/img1.jpg",
  },
  {
    id: "lagi-5-pn",
    name: "Lagi 5 PN",
    location:
      "Tọa lạc tại thị xã Lagi, biệt thự có 5 phòng ngủ với 7 giường, 2 hồ bơi lớn cách biển vài bước chân.",
    price: 10400000,
    originalPrice: 11000000,
    area: 2000,
    bedrooms: 7,
    imageUrl: "/images/img1.jpg",
  },
  {
    id: "lagi-3-pn",
    name: "Lagi 5 PN",
    location:
      "Tọa lạc tại thị xã Lagi, biệt thự có 5 phòng ngủ với 7 giường, 2 hồ bơi lớn cách biển vài bước chân.",
    price: 10400000,
    originalPrice: 11000000,
    area: 2000,
    bedrooms: 7,
    imageUrl: "/images/img1.jpg",
  },
  {
    id: "lagi-4-pn",
    name: "Lagi 5 PN",
    location:
      "Tọa lạc tại thị xã Lagi, biệt thự có 5 phòng ngủ với 7 giường, 2 hồ bơi lớn cách biển vài bước chân.",
    price: 10400000,
    originalPrice: 11000000,
    area: 2000,
    bedrooms: 7,
    imageUrl: "/images/img1.jpg",
  },
];

export function Properties() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused && emblaApi) {
        scrollNext();
      }
    }, 3000);
  }, [emblaApi, isPaused, scrollNext]);

  useEffect(() => {
    if (emblaApi) {
      startAutoplay();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [emblaApi, startAutoplay]);

  const onMouseEnter = () => setIsPaused(true);
  const onMouseLeave = () => setIsPaused(false);

  return (
    <section id="about" className="pt-20 bg-white">
      <Title subtitle="Luxury" title="Ý KIẾN KHÁCH HÀNG" />

      <div className="w-full py-12 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div
            className="relative"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4 md:-ml-6">
                {properties.map((property) => (
                  <div
                    key={`${property.id}`}
                    className="flex-[0_0_100%] min-w-0 pl-4 md:pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                  >
                    <Card className="overflow-hidden mx-2 transition-all duration-300 ease-in-out hover:shadow-xl my-4 hover:-translate-y-1">
                      <CardHeader className="p-0">
                        <div className="aspect-[4/3] relative">
                          <Image
                            src={property.imageUrl || "/placeholder.svg"}
                            alt={property.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-bold">{property.name}</h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {property.location}
                        </p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(property.price)}
                            </span>
                            <span className="text-sm line-through text-muted-foreground">
                              {formatPrice(property.originalPrice)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{property.area}m²</span>
                            <span>{property.bedrooms} Giường</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="default" size="lg">
              Xem Thêm
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
