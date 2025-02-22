"use client";

import Image from "next/image";
import { useState } from "react";
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
    <section className="py-20 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-[60px]">
          <Title subtitle="Luxury" title="Ý KIẾN KHÁCH HÀNG" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg mb-4">
              {testimonials[currentTestimonial].content}
            </p>
            <p className="text-yellow-500 font-semibold">
              — {testimonials[currentTestimonial].author}
            </p>
          </div>
          {/* Adjusted button positioning */}
          <Button
            variant="ghost"
            size="lg"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-black"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-14 w-14 text-black" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-black"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-14 w-14 text-black" />
          </Button>
        </div>
      </div>
    </section>
  );
}
