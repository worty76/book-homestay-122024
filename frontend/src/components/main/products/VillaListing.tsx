"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Tv,
  Shirt,
  Wine,
  Droplets,
  Scissors,
  Wifi,
  Coffee,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Sample images (in a real app, these would come from props or an API)
const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img1.jpg",
  "/images/img1.jpg",
  "/images/img1.jpg",
  "/images/img1.jpg",
  "/images/img1.jpg",
];

// Amenities with icons
const amenities = [
  { icon: Shirt, label: "Phòng/ Tủ Quần Áo" },
  { icon: Wine, label: "Quầy Bar Mini" },
  { icon: Droplets, label: "Phòng Tắm - Vòi Sen" },
  { icon: Scissors, label: "Máy Sấy Tóc" },
  { icon: Tv, label: "Truyền Hình Cáp/Vệ Tinh" },
  { icon: Wifi, label: "Wi-Fi Miễn Phí" },
  { icon: Coffee, label: "Máy Pha Cà Phê" },
];

export default function VillaListing() {
  const [currentImage, setCurrentImage] = useState(0);

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 2xl:grid-cols-[1fr_1fr]">
          {/* Left side: Image carousel */}
          <div className="relative mx-2 mt-6 md:mx-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={images[currentImage]}
                alt={`Villa view ${currentImage + 1}`}
                fill
                className="object-cover w-full h-full"
              />
              <button
                onClick={() =>
                  setCurrentImage(
                    (prev) => (prev - 1 + images.length) % images.length
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() =>
                  setCurrentImage((prev) => (prev + 1) % images.length)
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="2xl:max-w-[310px] w-full">
              {/* Thumbnails: scroll horizontally using ScrollArea */}
              <ScrollArea className="mt-4">
                <div className="flex gap-2 pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`relative flex-shrink-0 rounded-md overflow-hidden ${
                        currentImage === index ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div className="relative w-24 h-16">
                        <Image
                          src={image || "/placeholder.svg?height=150&width=200"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>

          {/* Right side: Villa details */}
          <div className="p-4 md:p-6 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Villa 6 PN</h2>
                <p className="text-sm text-muted-foreground">
                  Mũi Né, Phan Thiết
                </p>
              </div>
              <Badge variant="outline" className="bg-primary/10">
                Phổ biến
              </Badge>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-muted-foreground mt-4 mb-6">
              Tọa Lạc Tại Trung Tâm Thủ Phú Resort Mũi Né, Villa Sát Biển Bao
              Gồm 6 Phòng Ngủ: 2 Phòng 1 Giường Đôi Và 4 Phòng 2 Giường Đôi.
              Tổng Có 10 Giường Đôi. Phòng Khách, Bếp Và 8 Wc.
            </p>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Tiện nghi</h3>
              <ScrollArea className="w-full">
                <div className="flex gap-4 pb-2">
                  {amenities.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 min-w-[80px]"
                    >
                      <div className="p-2.5 bg-secondary rounded-full">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs text-center">{item.label}</span>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            {/* Divider */}
            <div className="h-px bg-border my-4" />

            {/* Price and booking */}
            <div className="mt-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Giá mỗi đêm
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm line-through text-muted-foreground">
                      9.000.000đ
                    </span>
                    <span className="text-2xl font-bold">7.000.000đ</span>
                  </div>
                </div>
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                  CHI TIẾT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
