"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Images } from "lucide-react";
import { concepts, getRoomsByConcept, Room, RoomConcept } from "@/data/rooms";
import RoomCard from "@/components/main/rooms/roomCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ConceptGalleryModal from "@/components/main/concepts/concept-gallery-modal";
import AnotherHeader from "@/components/main/another-header";
// import { colorMap } from "@/lib/color-map";

export default function ConceptDetailPage({
  params,
}: {
  params: { concept: string };
}) {
  const [conceptRooms, setConceptRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (!isValidConcept(params.concept)) {
        return;
      }

      const concept = params.concept as RoomConcept;
      const rooms = getRoomsByConcept(concept);
      setConceptRooms(rooms);
      setLoading(false);
    } catch (error) {
      console.error("Error loading concept:", error);
      setLoading(false);
    }
  }, [params.concept]);

  if (!isValidConcept(params.concept) && !loading) {
    notFound();
  }

  if (loading) {
    return <ConceptDetailSkeleton />;
  }

  const concept = params.concept as RoomConcept;
  const conceptData = concepts[concept];

  const allImages = [
    ...conceptData.images.floor1,
    ...conceptData.images.floor2,
  ];

  const displayImages = allImages.slice(0, 4);

  const hasMoreImages = allImages.length > 4;

  return (
    <div className="bg-[#f8f3e9]">
      <AnotherHeader
        title="Chủ đề Thiết Kế"
        description=""
        image="/images/img4.jpg"
      />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <motion.h1
            className="text-3xl font-bold mb-2 text-[#0a3b33]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Chủ đề {conceptData.name}
          </motion.h1>
          <motion.p
            className="text-muted-foreground max-w-3xl text-[#5a8d69]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {conceptData.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-[#0a3b33]">
                Câu chuyện thiết kế
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed text-[#5a8d69] ">
                {conceptData.story}
              </p>

              <h3 className="text-lg font-medium mb-3 text-[#0a3b33]">
                Màu sắc chủ đạo
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {conceptData.mainColors.map((color, i) => {
                  const colorMap: Record<string, string> = {
                    "Xanh ngọc":
                      "bg-emerald-500 text-white border border-emerald-500",
                    "Nâu gỗ": "bg-amber-800 text-white border border-amber-800",
                    Trắng: "bg-white text-black border border-black",
                    Be: "bg-[#c3b091] text-amber-900 border border-amber-300",
                    "Xanh lá": "bg-[#008000] text-white",
                    "Xanh dương pastel": "bg-blue-200 text-blue-800",
                    "Xanh ngọc lam": "bg-cyan-500 text-white",
                    "Trắng ngà": "bg-amber-50 text-amber-900",
                    "Vàng cát nhạt": "bg-yellow-100 text-yellow-800",
                  };

                  return (
                    <div
                      key={i}
                      className={`text-xs px-2 py-1 rounded ${
                        colorMap[color as keyof typeof colorMap] ||
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {color}
                    </div>
                  );
                })}
              </div>

              <h3 className="text-lg font-medium mb-3 text-[#0a3b33]">
                Tiện nghi nổi bật
              </h3>
              <div className="space-y-2 mb-6">
                {conceptData.amenities.slice(0, 4).map((amenity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 mt-0.5 text-[#50C878]" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {displayImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="aspect-[4/3]">
                      <Image
                        src={image}
                        alt={`${conceptData.name} - Hình ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {hasMoreImages && (
                <div className="mt-4 flex justify-end">
                  <ConceptGalleryModal
                    images={allImages}
                    conceptName={conceptData.name}
                    trigger={
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Images className="h-4 w-4" />
                        <span>Xem tất cả hình ảnh ({allImages.length})</span>
                      </Button>
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Phòng theo chủ đề {conceptData.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conceptRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <RoomCard room={room} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function isValidConcept(concept: string): concept is RoomConcept {
  return ["NonNuoc", "PhongNam", "HaiCauVien", "LuaHoi", "NguBinh"].includes(
    concept
  );
}

function ConceptDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="h-10 w-1/3 bg-muted rounded mb-2"></div>
        <div className="h-5 w-2/3 bg-muted rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-1">
          <div className="h-6 w-1/2 bg-muted rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded"></div>
            <div className="h-4 w-full bg-muted rounded"></div>
            <div className="h-4 w-3/4 bg-muted rounded"></div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[4/3] bg-muted rounded"></div>
            <div className="aspect-[4/3] bg-muted rounded"></div>
            <div className="aspect-[4/3] bg-muted rounded"></div>
            <div className="aspect-[4/3] bg-muted rounded"></div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-muted my-12"></div>

      <div className="mb-12">
        <div className="h-8 w-1/3 bg-muted rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden border shadow-sm"
            >
              <div className="aspect-[4/3] bg-muted"></div>
              <div className="p-4 space-y-2">
                <div className="h-6 w-3/4 bg-muted rounded"></div>
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="flex justify-between pt-2">
                  <div className="h-10 w-20 bg-muted rounded"></div>
                  <div className="h-10 w-24 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
