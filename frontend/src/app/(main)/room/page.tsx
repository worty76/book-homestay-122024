"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Heart,
  Share,
  MapPin,
  Award,
  Shield,
  Calendar,
  Users,
  Wifi,
  Tv,
  Clock,
  ChevronDown,
  X,
  AlertCircle,
  Snowflake,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";

import AnotherHero from "@/components/main/AnotherHero";
import BookingSidebar from "@/components/main/room/booking-sidebar";

// Room images data
const roomImages = [
  {
    id: 1,
    src: "/images/img1.jpg",
    alt: "Modern bedroom with king-size bed and large windows",
  },
  {
    id: 2,
    src: "/images/img2.jpg",
    alt: "Elegant bathroom with walk-in shower",
  },
  {
    id: 3,
    src: "/images/img3.jpg",
    alt: "Spacious living area with comfortable seating",
  },
  {
    id: 4,
    src: "/images/view/1.png",
    alt: "Stunning view from the balcony",
  },
  {
    id: 5,
    src: "/images/view/2.png",
    alt: "Modern kitchen with high-end appliances",
  },
];

// Amenities data
const amenities = [
  { icon: Wifi, name: "Wi-Fi tốc độ cao" },
  { icon: Tv, name: "TV thông minh với Netflix" },
  { icon: MapPin, name: "Bếp đầy đủ tiện nghi" },
  { icon: Star, name: "Máy giặt & máy sấy" },
  { icon: Shield, name: "Máy pha cà phê" },
  { icon: Award, name: "Lối vào hồ bơi" },
  { icon: Users, name: "Tiện nghi spa" },
  { icon: Calendar, name: "Trung tâm thể dục" },
  { icon: Heart, name: "Máy lạnh" },
];

export default function RoomDetailPage() {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <AnotherHero title="" description="" />

      {/* Photo Gallery */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Tằm non
          </h1>
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            <Share className="h-4 w-4" />
            <span className="hidden sm:inline">Chia sẽ</span>
          </Button>
        </div>

        {/* Image Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-square relative">
              <Image
                src={roomImages[0].src}
                alt={roomImages[0].alt}
                fill
                className="object-cover hover:opacity-95 transition-opacity"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {roomImages.slice(1, 5).map((image, index) => (
              <div
                key={image.id}
                className="aspect-[4/3] md:aspect-square relative hidden md:block"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:opacity-95 transition-opacity"
                  sizes="25vw"
                />
              </div>
            ))}
            <Button
              variant="secondary"
              className="absolute bottom-4 right-4 rounded-lg bg-white/90 hover:bg-white shadow-md"
              onClick={() => setShowAllPhotos(true)}
            >
              Xem tất cả ảnh
            </Button>
          </div>
        </div>

        {/* Photo Modal */}
        <AnimatePresence>
          {showAllPhotos && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-50 overflow-y-auto p-4 md:p-8"
            >
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <Button
                    variant="ghost"
                    onClick={() => setShowAllPhotos(false)}
                  >
                    <X className="h-5 w-5 mr-2" /> Close
                  </Button>
                  <span className="text-sm text-gray-500">
                    {roomImages.length} photos
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roomImages.map((image) => (
                    <div
                      key={image.id}
                      className="aspect-[4/3] relative rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
          {/* Left Column - Room Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-6 border-b">
              <div>
                <h2 className="text-xl font-semibold">Hạng phòng: Deluxe</h2>
                <h2 className="text-xl font-semibold">Loại phòng: Twin</h2>
                <p className="text-gray-600">
                  2 Phòng ngủ · 2 giường · 2 bồn tắm
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image
                    src="/images/host.jpg"
                    alt="Host Budi"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Highlights */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-4">
                <Award className="h-8 w-8 text-gray-700 mt-1" />
                <div>
                  <h3 className="font-medium">Superhost</h3>
                  <p className="text-sm text-gray-600">
                    Experienced, highly rated host
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-8 w-8 text-gray-700 mt-1" />
                <div>
                  <h3 className="font-medium">Great location</h3>
                  <p className="text-sm text-gray-600">
                    95% of guests gave a 5-star rating
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Calendar className="h-8 w-8 text-gray-700 mt-1" />
                <div>
                  <h3 className="font-medium">Free cancellation</h3>
                  <p className="text-sm text-gray-600">Before September 30</p>
                </div>
              </div>
            </div> */}

            {/* Description */}
            <div className="space-y-4 text-gray-700 pb-6 border-b">
              <p>
                “Tằm Non” không chỉ là một căn phòng, mà là một lời mời gọi khám
                phá những điều tươi mới. Nó mang trong mình sức sống của những
                ngày đầu, khi mọi thứ bắt đầu từ những điều đơn sơ và gần gũi
                nhất. Đây là giai đoạn đầu tiên, thời điểm mà mọi thứ vẫn còn
                rất nhẹ nhàng, mềm mại và chưa có nhiều dấu vết của thời gian,
                mang lại cho bạn cảm giác an yên và tự tại, như cách mà con tằm
                non vẫn còn trong vỏ kén ấm áp của mình, chuẩn bị sẵn sàng cho
                những thay đổi kỳ diệu phía trước.
              </p>
              <Button
                variant="link"
                className="p-0 h-auto text-black font-semibold"
              >
                Xem thêm
              </Button>
            </div>

            {/* Amenities */}
            <div className="pb-6 border-b">
              <h2 className="text-xl font-semibold mb-4">Tiện ích phòng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.slice(0, 6).map((amenity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <amenity.icon className="h-6 w-6 text-gray-700" />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-6 rounded-lg">
                Xem tất cả tiện ích
              </Button>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <BookingSidebar />
        </div>

        {/* Things to know */}
        <div className="mt-12 pb-6">
          <h2 className="text-xl font-semibold mb-6">Cần biết về phòng này</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-4">Luật của phòng</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>Giờ Check-in: 3:00 PM - 10:00 PM</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>Giờ Checkout: 11:00 AM</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Tối đa 4 người</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">An toàn và tiện ích</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Báo động khí carbon monoxide</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Báo động khói</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Camera an ninh</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
