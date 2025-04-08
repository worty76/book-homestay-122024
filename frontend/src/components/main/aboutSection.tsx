"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function AboutSection() {
  return (
    <section className="bg-[#f8f3e9] py-16 px-4 md:px-8 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeIn}
              className="relative z-10"
            >
              <div className="rounded-3xl overflow-hidden">
                <Image
                  alt="Modern dining area"
                  src="/images/view/4.png"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={slideIn}
              className="absolute -bottom-12 -right-8 lg:-right-12 z-20 w-3/4 bg-[#f8f3e9] rounded-3xl"
            >
              <div className="rounded-3xl overflow-hidden p-3">
                <Image
                  src="/images/view/1.png"
                  alt="Modern staircase"
                  width={600}
                  height={400}
                  className="w-full object-cover rounded-3xl"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="lg:w-1/2 pt-12 lg:pt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={fadeIn}
          >
            <span className="text-[#5a8d69] uppercase tracking-wider text-sm mb-4 block">
              Không gian ấm áp, dịch vụ chu đáo
            </span>

            <h2 className="font-playfair text-4xl md:text-5xl text-[#0a3b33] lg:leading-[58px] mb-6">
              Hơi thở truyền thống Nhịp sống hiện đại
            </h2>

            <p className="text-gray-600 mb-8">
              Hãy để chúng tôi mang đến cho bạn những trải nghiệm đặc biệt
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#5a8d69]/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-[#5a8d69]" />
                </div>
                <p className="font-medium text-[#0a3b33]">
                  Tận hưởng sự chăm sóc chu đáo trong từng chi tiết
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#5a8d69]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-[#5a8d69]" />
                </div>
                <p className="font-medium text-[#0a3b33]">
                  Sẵn sàng phục vụ quý khách nhiệt tình
                </p>
              </div>
            </div>

            <motion.div whileHover={{ x: 4 }}>
              <Link href={"/rooms"}>
                <Button className="rounded-full bg-[#5a8d69] hover:bg-[#4a7d59] text-white group px-6">
                  Đặt phòng ngay
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
