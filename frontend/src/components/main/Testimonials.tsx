"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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
    <section className="relative py-24 text-white bg-gradient-to-b from-[#344E41] to-[#2C4134] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <Quote className="absolute top-10 left-10 w-24 h-24 text-[#F3ECDC]" />
        <Quote className="absolute bottom-10 right-10 w-24 h-24 text-[#F3ECDC] rotate-180" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center relative">
          <span className="font-cursive text-[#8a9a5b] text-xl mb-2 block">
            Giúp chúng tôi cải thiện
          </span>
          <h2 className="text-4xl font-bold text-[#F3ECDC] tracking-tight">
            Ý KIẾN KHÁCH HÀNG
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentTestimonial].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <blockquote className="max-w-3xl mx-auto mb-8">
                  <p className="text-xl leading-relaxed text-[#F3ECDC]/90 italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                </blockquote>
                <div className="flex items-center gap-2">
                  <div className="h-px w-8 bg-[#8a9a5b]" />
                  <p className="text-[#F3ECDC] font-semibold">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <div className="h-px w-8 bg-[#8a9a5b]" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentTestimonial === index
                      ? "bg-[#8a9a5b] w-8"
                      : "bg-[#F3ECDC]/30 hover:bg-[#F3ECDC]/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-[#8a9a5b]/20 hover:bg-[#8a9a5b]/30 backdrop-blur-sm transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-[#F3ECDC]" />
            </Button>
          </div>
          <div className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-[#8a9a5b]/20 hover:bg-[#8a9a5b]/30 backdrop-blur-sm transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-[#F3ECDC]" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
