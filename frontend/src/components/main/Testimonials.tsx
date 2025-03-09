"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Title } from "./Title";

const testimonials = [
  {
    id: 1,
    content:
      "Tôi đã được chào đón bởi một đội ngũ nhân viên độc đáo và chu đáo có vài đồng nghiệp trong thành phố nộp đơn với các địa điểm tuyệt vời với dịch vụ mẫu mực. Đẹp và rất đặc biệt.",
    author: "Nguyễn Anh",
    avatar: "/images/avatar.png",
  },
  {
    id: 2,
    content:
      "Phòng ốc sạch sẽ, thoáng mát và rất tiện nghi. Nhân viên phục vụ nhiệt tình, chu đáo. Tôi sẽ quay lại đây trong chuyến du lịch tới.",
    author: "Trần Minh",
    avatar: "/images/avatar.png",
  },
  {
    id: 3,
    content:
      "Vị trí tuyệt vời, gần các điểm tham quan chính của thành phố. Bữa sáng ngon miệng với nhiều lựa chọn. Đáng giá từng đồng tiền bỏ ra.",
    author: "Lê Hương",
    avatar: "/images/avatar.png",
  },
];

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 text-white bg-[#344E41] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-[60px] text-center">
          <Title
            subtitle="Giúp chúng tôi cải thiện"
            title="Ý KIẾN KHÁCH HÀNG"
            subtitleColor="#5d8b3f"
            titleColor="#F3ECDC"
            opacity="40"
          />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentTestimonial].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-lg mb-4">
                  {testimonials[currentTestimonial].content}
                </p>
                <p className="text-[#F3ECDC] font-semibold">
                  — {testimonials[currentTestimonial].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            className="absolute left-2 sm:left-4 lg:top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-[#8a9a5b] hover:bg-[#758a4b] text-white rounded-full shadow-md"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-2 sm:right-4 lg:top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-[#8a9a5b] hover:bg-[#758a4b] text-white rounded-full shadow-md"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
}
