"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoomConcept, concepts } from "@/data/rooms";
import { colorMap } from "@/lib/color-map";

interface ConceptCardProps {
  concept: RoomConcept;
  index?: number;
}

export default function ConceptCard({ concept, index = 0 }: ConceptCardProps) {
  const conceptData = concepts[concept];
  const previewImage = conceptData.images.floor1[0];

  return (
    <motion.div
      className="group rounded-lg overflow-hidden border bg-white/80 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={previewImage}
          alt={conceptData.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl md:text-2xl font-bold">{conceptData.name}</h3>
        </div>
      </div>

      <div className="p-4">
        <p className="mb-4 line-clamp-2 text-[#0a3b33]/80">
          {conceptData.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {conceptData.mainColors.map((color, i) => {
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

        <Button
          asChild
          variant="ghost"
          className="w-full justify-between hover:bg-[#0a3b33] hover:text-primary-foreground"
        >
          <Link href={`/concepts/${concept}`}>
            <span>Xem chi tiết</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
