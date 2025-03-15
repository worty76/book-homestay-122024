"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, MapPin, Mail, Phone, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInView } from "react-intersection-observer";
import AnotherHeader from "@/components/main/another-header";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Header with Breadcrumb */}
      <AnotherHeader
        title="Giới Thiệu Về Chúng Tôi"
        description="Khám phá câu chuyện, giá trị cốt lõi và đội ngũ đứng sau homestay của chúng tôi"
        image="/images/about-hero.jpg"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Our Story Section */}
        <Section title="Câu Chuyện Của Chúng Tôi" delayOffset={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <AnimatedImage
                src="/images/about-story.jpg"
                alt="Câu chuyện của chúng tôi"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Bắt đầu từ năm 2019, chúng tôi xuất phát với ý tưởng đơn giản:
                tạo ra một không gian lưu trú vừa mang đậm bản sắc Việt Nam, vừa
                đáp ứng được tiêu chuẩn và sự tiện nghi mà du khách mong đợi.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Mỗi góc nhỏ trong homestay đều được chúng tôi chăm chút tỉ mỉ,
                từ việc lựa chọn vật liệu địa phương, tới các họa tiết trang trí
                lấy cảm hứng từ di sản văn hóa của miền Trung Việt Nam.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sau nhiều năm hoạt động, chúng tôi tự hào đã đón tiếp hàng nghìn
                du khách trong và ngoài nước, mang đến cho họ không chỉ một nơi
                nghỉ ngơi, mà còn là trải nghiệm văn hóa đích thực của Việt Nam.
              </p>
            </div>
          </div>
        </Section>

        <Separator className="my-16" />

        {/* Our Values Section */}
        <Section
          title="Giá Trị Cốt Lõi"
          subtitle="Những nguyên tắc định hướng mọi hoạt động của chúng tôi"
          delayOffset={0.2}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedCard
              icon={
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-heart-handshake"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
                    <path d="m18 15-2-2" />
                    <path d="m15 18-2-2" />
                  </svg>
                </div>
              }
              title="Hiếu Khách"
              description="Chúng tôi đón tiếp mỗi vị khách với tinh thần hiếu khách đậm đà bản sắc Việt Nam, tạo cảm giác gần gũi như đang ở nhà."
              delay={0.3}
            />

            <AnimatedCard
              icon={
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-leaf"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
              }
              title="Bền Vững"
              description="Chúng tôi cam kết hoạt động theo hướng bền vững, sử dụng nguyên vật liệu địa phương và thân thiện với môi trường."
              delay={0.4}
            />

            <AnimatedCard
              icon={
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-landmark"
                  >
                    <line x1="3" x2="21" y1="22" y2="22" />
                    <line x1="6" x2="6" y1="18" y2="11" />
                    <line x1="10" x2="10" y1="18" y2="11" />
                    <line x1="14" x2="14" y1="18" y2="11" />
                    <line x1="18" x2="18" y1="18" y2="11" />
                    <polygon points="12 2 20 7 4 7" />
                  </svg>
                </div>
              }
              title="Bản Sắc Văn Hóa"
              description="Chúng tôi tự hào giới thiệu văn hóa Việt Nam thông qua từng chi tiết thiết kế và dịch vụ tại homestay."
              delay={0.5}
            />

            <AnimatedCard
              icon={
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              }
              title="Chất Lượng"
              description="Mỗi chi tiết nhỏ đều được chăm chút tỉ mỉ, từ chất lượng giường nệm cho đến dịch vụ phòng, mang đến trải nghiệm tốt nhất."
              delay={0.6}
            />

            <AnimatedCard
              icon={
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-lightbulb"
                  >
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                </div>
              }
              title="Sáng Tạo"
              description="Chúng tôi luôn đổi mới, sáng tạo trong thiết kế và dịch vụ, mang đến trải nghiệm độc đáo cho khách hàng."
              delay={0.7}
            />

            <AnimatedCard
              icon={
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-hand-heart"
                  >
                    <path d="M11 14V8a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v11" />
                    <path d="M10 16.5a1 1 0 0 1-1-1V12H8a2 2 0 0 0-2 2v4.5a1 1 0 0 0 1 1h7" />
                    <path d="M18 9.25a.25.25 0 1 1-.5 0 .25.25 0 0 1 .5 0" />
                    <path d="M17.25 12v4a3 3 0 0 0 6 0v-3.5a.5.5 0 0 0-.5-.5h-1.5" />
                    <path d="m20.25 11.5.5-1 1-.5" />
                    <path d="M17 18a1 1 0 0 0 1 1h1" />
                    <path d="M18 10c1 0 2 1 2 2" />
                    <path d="m4.5 10.7 1.3.8 1.3-.8.8 1.3m-3.4-.7.8-1.3 1.3-.8c1.4-.8 3.1.3 3.1 1.9v5.2" />
                  </svg>
                </div>
              }
              title="Tận Tâm"
              description="Đội ngũ nhân viên của chúng tôi luôn tận tâm, chu đáo trong từng dịch vụ, sẵn sàng hỗ trợ khách hàng 24/7."
              delay={0.8}
            />
          </div>
        </Section>

        {/* Team Section */}
        <Section
          title="Đội Ngũ Của Chúng Tôi"
          subtitle="Những con người đầy nhiệt huyết đứng sau thành công của homestay"
          delayOffset={0.2}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedTeamCard
              image="/images/team-1.jpg"
              name="Nguyễn Minh Tuấn"
              role="Founder & CEO"
              bio="Với hơn 10 năm kinh nghiệm trong ngành du lịch và khách sạn, anh Tuấn là người đặt nền móng cho ý tưởng homestay kết hợp văn hóa truyền thống và tiện nghi hiện đại."
              delay={0.3}
            />

            <AnimatedTeamCard
              image="/images/team-2.jpg"
              name="Trần Thị Mai Anh"
              role="Design Director"
              bio="Tốt nghiệp ngành Thiết kế Nội thất, chị Mai Anh là người chịu trách nhiệm cho mọi concept thiết kế độc đáo tại homestay, mang đậm dấu ấn văn hóa Việt Nam."
              delay={0.4}
            />

            <AnimatedTeamCard
              image="/images/team-3.jpg"
              name="Lê Văn Hoàng"
              role="Operations Manager"
              bio="Với tính cách tỉ mỉ và khả năng quản lý xuất sắc, anh Hoàng đảm bảo mọi hoạt động tại homestay đều diễn ra suôn sẻ, mang đến trải nghiệm tốt nhất cho khách hàng."
              delay={0.5}
            />
          </div>
        </Section>

        <Separator className="my-16" />

        {/* Testimonials Section */}
        <Section
          title="Khách Hàng Nói Gì"
          subtitle="Những chia sẻ từ khách hàng đã trải nghiệm dịch vụ của chúng tôi"
          delayOffset={0.2}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedTestimonial
              quote="Một trong những kỳ nghỉ đáng nhớ nhất của tôi tại Đà Nẵng. Phòng ở concept Non Nước thực sự đưa tôi đến gần hơn với văn hóa và thiên nhiên Việt Nam."
              author="Hà Mai Linh"
              location="Hà Nội"
              delay={0.3}
            />

            <AnimatedTestimonial
              quote="Tôi yêu thích từng chi tiết nhỏ trong thiết kế phòng. Các nhân viên vô cùng thân thiện và nhiệt tình. Chắc chắn sẽ quay lại vào lần tới!"
              author="Trần Minh Đức"
              location="TP. Hồ Chí Minh"
              delay={0.4}
            />

            <AnimatedTestimonial
              quote="Vị trí tuyệt vời, dễ dàng di chuyển đến các điểm du lịch. Phòng sạch sẽ, thoải mái và có thiết kế rất độc đáo. Rất đáng giá với giá tiền."
              author="Phạm Thanh Hà"
              location="Đà Nẵng"
              delay={0.5}
            />

            <AnimatedTestimonial
              quote="Tôi đặc biệt ấn tượng với concept Lụa Hội. Cảm giác như được sống trong một không gian văn hóa Hội An thu nhỏ. Sẽ giới thiệu cho bạn bè!"
              author="Lê Hoàng Nam"
              location="Hải Phòng"
              delay={0.6}
            />
          </div>
        </Section>

        {/* Location & Contact Section */}
        <Section title="Thông Tin Liên Hệ" delayOffset={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <motion.div
                className="relative h-[400px] rounded-lg overflow-hidden mb-6"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Replace with an actual map or location image */}
                <Image
                  src="/images/map.jpg"
                  alt="Vị trí homestay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Vị Trí Của Chúng Tôi
                </h3>
                <p className="text-muted-foreground mb-6">
                  Homestay của chúng tôi nằm ở vị trí lý tưởng tại Đà Nẵng, cách
                  bãi biển Mỹ Khê chỉ 10 phút đi bộ và gần các điểm du lịch nổi
                  tiếng như Bà Nà Hills, Cầu Rồng và Phố cổ Hội An.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Địa chỉ</h4>
                      <p className="text-muted-foreground">
                        123 Đường Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Giờ mở cửa</h4>
                      <p className="text-muted-foreground">
                        Check-in: 14:00 - 22:00
                        <br />
                        Check-out: 12:00
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                className="bg-muted/30 p-8 rounded-lg"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-6">
                  Liên Hệ Với Chúng Tôi
                </h3>
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Điện thoại</h4>
                      <p className="text-muted-foreground">+84 236 1234 567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">
                        info@vietnamhomestay.com
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="font-medium mb-4">Kết nối với chúng tôi</h4>
                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-youtube"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </a>
                </div>

                <Separator className="my-8" />

                <h4 className="font-medium mb-4">Bạn muốn đặt phòng?</h4>
                <Button asChild size="lg" className="w-full">
                  <Link href="/rooms">Đặt phòng ngay</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

// Section component with animation
function Section({
  title,
  subtitle,
  children,
  delayOffset = 0,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delayOffset?: number;
}) {
  return (
    <section className="mb-16">
      <motion.div
        className="text-center mb-12"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delayOffset }}
      >
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </section>
  );
}

// Animated Card Component
function AnimatedCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
}

// Animated Image Component
function AnimatedImage({ src, alt }: { src: string; alt: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-lg overflow-hidden shadow-md aspect-[4/3]"
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </motion.div>
  );
}

// Animated Team Card
function AnimatedTeamCard({
  image,
  name,
  role,
  bio,
  delay = 0,
}: {
  image: string;
  name: string;
  role: string;
  bio: string;
  delay?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-lg overflow-hidden border shadow-sm"
    >
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-primary text-sm mb-2">{role}</p>
        <p className="text-muted-foreground text-sm">{bio}</p>
      </div>
    </motion.div>
  );
}

// Animated Testimonial
function AnimatedTestimonial({
  quote,
  author,
  location,
  delay = 0,
}: {
  quote: string;
  author: string;
  location: string;
  delay?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-lg p-6 border shadow-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-primary/30 h-8 w-8 mb-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
          transform="rotate(180 12 12)"
        />
      </svg>
      <p className="text-muted-foreground mb-4 italic leading-relaxed">
        {quote}
      </p>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{author}</h4>
          <p className="text-muted-foreground text-sm">{location}</p>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-amber-400"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
