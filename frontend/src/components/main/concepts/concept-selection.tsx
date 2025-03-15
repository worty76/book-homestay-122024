"use client";

import { motion } from "framer-motion";
import { RoomConcept } from "@/data/rooms";
import ConceptCard from "./concept-card";

export default function ConceptSelection() {
  // All concept keys
  const conceptKeys: RoomConcept[] = [
    "NonNuoc",
    "PhongNam",
    "HaiCauVien",
    "LuaHoi",
    "NguBinh",
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">Concept Thiết Kế</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mỗi phòng của chúng tôi được thiết kế theo những concept lấy cảm
            hứng từ văn hóa và thiên nhiên Việt Nam
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conceptKeys.map((concept, index) => (
            <ConceptCard key={concept} concept={concept} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
