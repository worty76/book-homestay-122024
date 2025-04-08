"use client";

import { motion } from "framer-motion";
import type { JSX } from "react";
import { Title } from "./Title";

interface Facility {
  icon: JSX.Element;
  title: string;
  description: string;
}

const facilities: Facility[] = [
  // {
  //   icon: (
  //     <svg
  //       width="40"
  //       height="40"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="1.5"
  //     >
  //       <path
  //         d="M19 17h2v-5l-9-7-9 7v5h2M12 5.3l6 4.7M3 12l9-7 9 7M5 12v5h14v-5"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //       />
  //       <path d="M10 12h4M8 15h8" strokeLinecap="round" />
  //     </svg>
  //   ),
  //   title: "Đưa đón tận nơi",
  //   description:
  //     "We will pick and drop you off and on the airport at your arrival and departure times.",
  // },
  // {
  //   icon: (
  //     <svg
  //       width="40"
  //       height="40"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="1.5"
  //     >
  //       <path d="M4 9h16M4 15h16M8 5v14M16 5v14" strokeLinecap="round" />
  //     </svg>
  //   ),
  //   title: "Đỗ xe rộng rãi",
  //   description:
  //     "Chúng tôi có và cung cấp đủ chỗ đậu xe cho khách lưu trú tại khách sạn và khách trong ngày.",
  // },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
    title: "Dịch vụ phòng",
    description:
      "Đội ngũ nhân viên phục vụ phòng chuyên nghiệp và tận tình sẽ giữ cho phòng của bạn luôn sạch sẽ.",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 15h16M4 8h16M12 3v18" strokeLinecap="round" />
        <path d="M8 12h8" strokeLinecap="round" strokeDasharray="2 2" />
      </svg>
    ),
    title: "Quang cảnh thoáng đãng",
    description: "Homestay chúng tôi có quang cảnh thoáng đãng và đẹp nhất.",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M12 12c3.3 0 6-2.7 6-6M12 12c-3.3 0-6 2.7-6 6M12 12c0-3.3-2.7-6-6-6M12 12c0 3.3 2.7 6 6 6"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Mạng Internet nhanh",
    description:
      "Chúng tôi có mạng internet siêu nhanh và cáp trong phòng để kết nối có dây.",
  },
  // {
  //   icon: (
  //     <svg
  //       width="40"
  //       height="40"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="1.5"
  //     >
  //       <path d="M3 12h18M9 5v14M15 5v14" strokeLinecap="round" />
  //       <circle cx="12" cy="12" r="2" />
  //     </svg>
  //   ),
  //   title: "Phòng ăn",
  //   description:
  //     "Chúng tôi cung cấp dịch vụ ăn uống tại phòng với các món ăn do đầu bếp chế biến hoặc gọi món bên ngoài.",
  // },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FacilitiesGrid() {
  return (
    <section
      className="pb-16 pt-24 px-4 md:px-8"
      style={{ backgroundImage: 'url("/images/testimonial-bg.png")' }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeInUp}
        >
          <Title
            title="DỊCH VỤ VÀ CƠ SỞ VẬT CHẤT"
            titleColor="#5a8d69"
            subtitle="Cơ sở vật chất homestay"
            subtitleColor="#9C6B4A"
            opacity="25"
          />
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              className="p-6 rounded-lg hover:bg-white/50 transition-colors duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeInUp}
            >
              <div className="text-[#C4A484] mb-4">{facility.icon}</div>
              <h3 className="font-playfair text-xl text-[#2d2d2d] mb-3">
                {facility.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {facility.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
