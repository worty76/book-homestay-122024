"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Tv,
  Shirt,
  Wine,
  Droplets,
  Scissors,
} from "lucide-react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Mảng ảnh (cho carousel ảnh lớn + thumbnails)
const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img3.jpg",
];

// Mảng tiện ích (amenities) - bạn có thể tuỳ chỉnh, thêm/bớt tuỳ ý
const amenities = [
  { icon: Shirt, label: "Phòng/ Tủ Quần Áo" },
  { icon: Wine, label: "Quầy Bar Mini" },
  { icon: Droplets, label: "Phòng Tắm - Vòi Sen" },
  { icon: Scissors, label: "Máy Sấy Tóc" },
  { icon: Tv, label: "Truyền Hình Cáp/Vệ Tinh" },
  { icon: Tv, label: "Truyền Hình Cáp/Vệ Tinh" },
  { icon: Tv, label: "Truyền Hình Cáp/Vệ Tinh" },
];

export default function VillaListing() {
  const [currentImage, setCurrentImage] = useState(0);

  // Logic carousel ảnh lớn
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };
  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          {/* ========== 1) Carousel Ảnh Lớn + Thumbnails ========== */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={images[currentImage] || "/placeholder.svg"}
                alt={`Villa view ${currentImage + 1}`}
                fill
                className="object-cover w-full h-full rounded-lg"
              />
              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Thumbnails: scroll ngang bằng ScrollArea */}
            <ScrollArea className="mt-2 w-full max-w-[350px]">
              <div className="flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative flex-shrink-0 ${
                      currentImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="relative w-24 h-16">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* ========== 2) Thông tin + Tiện ích ========== */}
          <div className="flex gap-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Villa 6 PN</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Tọa Lạc Tại Trung Tâm Thủ Phú Resort Mũi Né, Villa Sát Biển Bao
                Gồm 6 Phòng Ngủ: 2 Phòng 1 Giường Đôi Và 4 Phòng 2 Giường Đôi.
                Tổng Có 10 Giường Đôi. Phòng Khách, Bếp Và 8 Wc.
              </p>

              {/* 
                ========== Carousel tiện ích (giới hạn 5 items hiển thị) ==========
                - max-w đủ hiển thị 5 items (mỗi item ~80-100px + khoảng cách)
                - Nếu nhiều hơn 5, user cuộn ngang để xem các item còn lại
              */}
              <ScrollArea className="mb-6 max-w-[550px]">
                <div className="flex gap-8">
                  {amenities.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1 min-w-[80px]"
                    >
                      <div className="p-2 bg-gray-100 rounded">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs text-center pb-2">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              {/* Giá và nút chi tiết */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm line-through text-muted-foreground">
                    9.000.000đ
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold">7.000.000đ</span>
                    <span className="text-sm text-muted-foreground">/ đêm</span>
                  </div>
                </div>
              </div>
            </div>

            <Button className="bg-red-500 hover:bg-red-600 text-white mt-1">
              CHI TIẾT
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
