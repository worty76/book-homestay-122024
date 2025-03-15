"use client";

import { motion } from "framer-motion";
import { RoomConcept, concepts } from "@/data/rooms";
import ConceptCard from "@/components/main/concepts/concept-card";
import { Separator } from "@/components/ui/separator";
import AnotherHeader from "@/components/main/another-header";

export default function ConceptsPage() {
  const conceptKeys: RoomConcept[] = [
    "NonNuoc",
    "PhongNam",
    "HaiCauVien",
    "LuaHoi",
    "NguBinh",
  ];

  return (
    <div className="bg-[#f8f3e9]">
      <AnotherHeader
        title="Chủ đề Thiết Kế"
        description="Mỗi phòng của chúng tôi được thiết kế theo những concept lấy cảm hứng từ văn hóa và thiên nhiên Việt Nam. Khám phá câu chuyện thiết kế và không gian độc đáo đằng sau mỗi concept."
        image="/images/img3.jpg"
      />
      <div className="container mx-auto px-10 py-12 ">
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-[#0a3b33] leading-tight font-semibold mb-10">
                Cảm hứng thiết kế
              </h2>
              <p className="md:text-md mb-4 text-[#0a3b33]">
                Chúng tôi đã dành nhiều thời gian để nghiên cứu và tìm hiểu về
                các danh lam thắng cảnh, các làng nghề truyền thống và các yếu
                tố văn hóa đặc trưng của miền Trung Việt Nam.
              </p>
              <p className="text-[#0a3b33] md:text-md">
                Mỗi concept đều mang một câu chuyện riêng, được thể hiện qua các
                họa tiết trang trí, bảng màu, và cách bố trí không gian. Chúng
                tôi hy vọng du khách không chỉ được nghỉ ngơi thoải mái mà còn
                cảm nhận được văn hóa Việt Nam thông qua không gian sống.
              </p>
            </motion.div>
            <motion.div
              className="aspect-video relative rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img
                src="/images/img1.jpg"
                alt="Concept thiết kế"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>

        <Separator className="my-16 bg-[#0a3b33]/30" />

        <div className="mb-12">
          <h1 className="font-playfair text-5xl font-bold mb-12 text-center text-[#0a3b33]">
            Khám phá các chủ đề
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conceptKeys.map((concept, index) => (
              <ConceptCard key={concept} concept={concept} index={index} />
            ))}
          </div>
        </div>

        {/* <div className="my-16 bg-muted/30 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Quy trình thiết kế
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-primary/10 text-primary p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">01</span>
              </div>
              <h3 className="font-semibold mb-2">Nghiên cứu và lấy cảm hứng</h3>
              <p className="text-muted-foreground text-sm">
                Tìm hiểu về văn hóa, lịch sử và các đặc trưng địa phương để phát
                triển các concept độc đáo.
              </p>
            </motion.div>

            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary/10 text-primary p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">02</span>
              </div>
              <h3 className="font-semibold mb-2">Thiết kế và chọn vật liệu</h3>
              <p className="text-muted-foreground text-sm">
                Phát triển bảng màu, lựa chọn vật liệu thân thiện với môi trường
                và sản xuất các đồ nội thất đặc trưng.
              </p>
            </motion.div>

            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-primary/10 text-primary p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">03</span>
              </div>
              <h3 className="font-semibold mb-2">
                Thiết kế không gian và trải nghiệm
              </h3>
              <p className="text-muted-foreground text-sm">
                Tạo ra các không gian sống hài hòa, kết hợp giữa tính thẩm mỹ và
                công năng, đảm bảo trải nghiệm thoải mái cho khách hàng.
              </p>
            </motion.div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
