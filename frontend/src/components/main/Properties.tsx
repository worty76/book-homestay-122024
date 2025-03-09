"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Title } from "./Title";
import { properties, Property } from "@/lib/data/propertyData";
import { formatPrice } from "@/lib/utils";

export function Properties() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 1 },
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    <section
      id="about"
      className="pt-10 sm:pt-14 md:pt-16 lg:pt-20 bg-[#f5f0e3]"
    >
      <Title subtitle="Phòng chất lượng" title="NHIỀU PHÒNG" opacity="40" subtitleColor="" titleColor="" />

      <div className="w-full py-6 sm:py-8 md:py-10 lg:py-12 bg-[#f5f0e3]">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div
            className="relative"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-2 sm:-ml-3 md:-ml-4 lg:-ml-6">
                {properties.map((property) => (
                  <PropertyCard key={`${property.id}`} property={property} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center">
            <Button
              variant="default"
              size="sm"
              className="sm:text-base md:px-6 lg:px-8 lg:py-3"
            >
              Xem Thêm
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="flex-[0_0_90%] sm:flex-[0_0_80%] min-w-0 pl-2 sm:pl-3 md:pl-4 lg:pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
      <Card className="overflow-hidden mx-1 sm:mx-2 transition-all duration-300 ease-in-out hover:shadow-xl my-2 sm:my-3 md:my-4 hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[4/3] relative">
            <Image
              src={property.imageUrl || "/placeholder.svg"}
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 40vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <h3 className="text-base sm:text-lg md:text-xl font-bold line-clamp-1">
            {property.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 line-clamp-2">
            {property.location}
          </p>
          <div className="mt-2 sm:mt-3 md:mt-4 space-y-1 sm:space-y-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                {formatPrice(property.price)}
              </span>
              <span className="text-xs sm:text-sm line-through text-muted-foreground">
                {formatPrice(property.originalPrice)}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <span>{property.area}m²</span>
              <span>{property.bedrooms} Giường</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
