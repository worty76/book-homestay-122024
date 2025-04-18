"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Check,
  Clock,
  Coffee,
  CookingPot,
  WifiOff,
  DollarSign,
  CalendarClock,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useInView } from "react-intersection-observer";
import AnotherHeader from "@/components/main/another-header";
import { useTranslation } from "@/hooks/useTranslation";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ExperiencesPage() {
  const { t } = useTranslation();

  return (
    <>
      <AnotherHeader
        title={t("experiences.pageHeader.title")}
        subtitle={t("experiences.pageHeader.subtitle")}
        description={t("experiences.pageHeader.description")}
        image="/images/img3.jpg"
        finalPage={t("experiences.pageHeader.finalPage")}
      />
      <div className="bg-[#f8f3e9]">
        <div className="container mx-auto px-4 py-12">
          {/* Vietnamese Morning Lifestyle Section */}
          <Section
            title={t("experiences.morningLifestyle.title")}
            delayOffset={0.1}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#9C6B4A]">
                  {t("experiences.morningLifestyle.subtitle")}
                </h3>
                <p className="text-[#5a6065] mb-4 leading-relaxed">
                  {t("experiences.morningLifestyle.description")}
                </p>

                <h4 className="text-lg font-medium mt-6 mb-3 text-[#0a3b33]">
                  {t("experiences.morningLifestyle.breakfast.title")}
                </h4>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-[#5a8d69]" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-[#7A5230]">
                        {t(
                          "experiences.morningLifestyle.breakfast.option1.title"
                        )}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.morningLifestyle.breakfast.option1.description"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-[#5a8d69]" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-[#7A5230]">
                        {t(
                          "experiences.morningLifestyle.breakfast.option2.title"
                        )}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.morningLifestyle.breakfast.option2.description"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-medium mt-6 mb-3 text-[#0a3b33]">
                  {t("experiences.morningLifestyle.coffeeTeaTitle")}
                </h4>
                <p className="text-[#5a6065] mb-4 leading-relaxed">
                  {t("experiences.morningLifestyle.coffeeTeaDescription")}
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/img2.jpg"
                  alt={t("experiences.morningLifestyle.title")}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a3b33]/70 to-transparent"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-white to-[#f3e8d8] rounded-lg p-6 border border-[#e6d7c3] shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <Coffee className="h-6 w-6 text-[#9C6B4A] mr-2" />
                  <h3 className="text-xl font-semibold text-[#7A5230]">
                    {t("experiences.morningLifestyle.coffee.title")}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-[#0a3b33]">
                      {t("experiences.morningLifestyle.coffee.icedMilk.title")}
                    </h4>
                    <ul className="list-disc list-inside space-y-2 mt-2 text-[#5a6065]">
                      <li>
                        {t(
                          "experiences.morningLifestyle.coffee.icedMilk.step1"
                        )}
                      </li>
                      <li>
                        {t(
                          "experiences.morningLifestyle.coffee.icedMilk.step2"
                        )}
                      </li>
                      <li>
                        {t(
                          "experiences.morningLifestyle.coffee.icedMilk.step3"
                        )}
                      </li>
                      <li>
                        {t(
                          "experiences.morningLifestyle.coffee.icedMilk.step4"
                        )}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#0a3b33]">
                      {t("experiences.morningLifestyle.coffee.icedBlack.title")}
                    </h4>
                    <ul className="list-disc list-inside space-y-2 mt-2 text-[#5a6065]">
                      <li>
                        {t(
                          "experiences.morningLifestyle.coffee.icedBlack.step1"
                        )}
                      </li>
                      <li>
                        {t(
                          "experiences.morningLifestyle.coffee.icedBlack.step2"
                        )}
                      </li>
                      <li>
                        {t(
                          "experiences.morningLifestyle.coffee.icedBlack.step3"
                        )}
                      </li>
                      <li>
                        {t(
                          "experiences.morningLifestyle.coffee.icedBlack.step4"
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-white to-[#e8f3e8] rounded-lg p-6 border border-[#d7e6d7] shadow-sm"
              >
                <div className="flex items-center mb-4">
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
                    className="text-[#5a8d69] mr-2"
                  >
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                    <line x1="6" y1="2" x2="6" y2="4"></line>
                    <line x1="10" y1="2" x2="10" y2="4"></line>
                    <line x1="14" y1="2" x2="14" y2="4"></line>
                  </svg>
                  <h3 className="text-xl font-semibold text-[#0a3b33]">
                    {t("experiences.morningLifestyle.tea.title")}
                  </h3>
                </div>

                <p className="text-[#5a6065] mb-3">
                  {t("experiences.morningLifestyle.tea.description")}
                </p>

                <h4 className="font-medium text-[#0a3b33]">
                  {t("experiences.morningLifestyle.tea.instructions.title")}
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2 text-[#5a6065]">
                  <li>
                    {t("experiences.morningLifestyle.tea.instructions.step1")}
                  </li>
                  <li>
                    {t("experiences.morningLifestyle.tea.instructions.step2")}
                  </li>
                  <li>
                    {t("experiences.morningLifestyle.tea.instructions.step3")}
                  </li>
                  <li>
                    {t("experiences.morningLifestyle.tea.instructions.step4")}
                  </li>
                  <li>
                    {t("experiences.morningLifestyle.tea.instructions.step5")}
                  </li>
                </ul>
              </motion.div>
            </div>
          </Section>

          <Separator className="my-16 opacity-30 bg-[#9C6B4A]" />

          {/* Cooking Class Section */}
          <Section
            title={t("experiences.cookingClass.title")}
            delayOffset={0.2}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/img1.jpg"
                  alt={t("experiences.cookingClass.title")}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a3b33]/80 to-transparent flex flex-col justify-end p-6">
                  <div className="text-white">
                    <Badge className="bg-[#5a8d69] border-0 mb-2">
                      {t("experiences.badges.dailyActivity")}
                    </Badge>
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {t("experiences.cookingClass.time")}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm">
                        {t("experiences.cookingClass.price")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h3 className="text-xl font-semibold mb-4 text-[#9C6B4A]">
                  {t("experiences.cookingClass.subtitle")}
                </h3>
                <div className="flex flex-wrap items-center mb-4 gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs border-[#9C6B4A] text-[#7A5230]"
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    {t("experiences.cookingClass.location")}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-[#5a8d69] text-[#0a3b33]"
                  >
                    <CalendarClock className="h-3 w-3 mr-1" />
                    {t("experiences.cookingClass.availability")}
                  </Badge>
                </div>

                <p className="text-[#5a6065] mb-4 leading-relaxed">
                  {t("experiences.cookingClass.description")}
                </p>

                <h4 className="text-lg font-medium mt-6 mb-3 text-[#0a3b33]">
                  {t("experiences.cookingClass.procedure.title")}
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-[#9C6B4A]/10 rounded-full p-2 mt-1">
                      <span className="font-medium text-[#9C6B4A]">1</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-[#7A5230]">
                        {t("experiences.cookingClass.procedure.step1.title")}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.cookingClass.procedure.step1.description"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-[#9C6B4A]/10 rounded-full p-2 mt-1">
                      <span className="font-medium text-[#9C6B4A]">2</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-[#7A5230]">
                        {t("experiences.cookingClass.procedure.step2.title")}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.cookingClass.procedure.step2.description"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-[#9C6B4A]/10 rounded-full p-2 mt-1">
                      <span className="font-medium text-[#9C6B4A]">3</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-[#7A5230]">
                        {t("experiences.cookingClass.procedure.step3.title")}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.cookingClass.procedure.step3.description"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-[#9C6B4A]/10 rounded-full p-2 mt-1">
                      <span className="font-medium text-[#9C6B4A]">4</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-[#7A5230]">
                        {t("experiences.cookingClass.procedure.step4.title")}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.cookingClass.procedure.step4.description"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Separator className="my-16 opacity-30 bg-[#9C6B4A]" />

          {/* No-Tech Night Section */}
          <Section title={t("experiences.noTechNight.title")} delayOffset={0.3}>
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <p className="text-[#5a6065] mb-4 leading-relaxed">
                {t("experiences.noTechNight.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white/60 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-[#9C6B4A]">
                  {t("experiences.noTechNight.subtitle")}
                </h3>
                <div className="flex flex-wrap items-center mb-4 gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs border-[#5a8d69] text-[#0a3b33]"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {t("experiences.noTechNight.time")}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-[#5a8d69] text-[#0a3b33]"
                  >
                    <CalendarClock className="h-3 w-3 mr-1" />
                    {t("experiences.noTechNight.days")}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-[#9C6B4A] text-[#7A5230]"
                  >
                    <DollarSign className="h-3 w-3 mr-1" />
                    {t("experiences.noTechNight.price")}
                  </Badge>
                </div>

                <h4 className="text-lg font-medium mt-6 mb-3 text-[#0a3b33]">
                  {t("experiences.noTechNight.experience.title")}
                </h4>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-[#5a8d69]" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-[#7A5230]">
                        {t("experiences.noTechNight.experience.feature1.title")}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.noTechNight.experience.feature1.description"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-[#5a8d69]" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-[#7A5230]">
                        {t("experiences.noTechNight.experience.feature2.title")}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.noTechNight.experience.feature2.description"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-medium mt-6 mb-3 text-[#0a3b33]">
                  {t("experiences.noTechNight.activities.title")}
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <WifiOff className="h-5 w-5 text-[#9C6B4A] mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-[#7A5230]">
                        {t(
                          "experiences.noTechNight.activities.activity1.title"
                        )}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.noTechNight.activities.activity1.description"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <WifiOff className="h-5 w-5 text-[#9C6B4A] mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-[#7A5230]">
                        {t(
                          "experiences.noTechNight.activities.activity2.title"
                        )}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.noTechNight.activities.activity2.description"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <WifiOff className="h-5 w-5 text-[#9C6B4A] mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-[#7A5230]">
                        {t(
                          "experiences.noTechNight.activities.activity3.title"
                        )}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.noTechNight.activities.activity3.description"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <WifiOff className="h-5 w-5 text-[#9C6B4A] mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-[#7A5230]">
                        {t(
                          "experiences.noTechNight.activities.activity4.title"
                        )}
                      </p>
                      <p className="text-[#5a6065]">
                        {t(
                          "experiences.noTechNight.activities.activity4.description"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/img3.jpg"
                  alt={t("experiences.noTechNight.title")}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a3b33]/80 to-transparent flex flex-col justify-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">
                      {t("experiences.noTechNight.value.title")}
                    </h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-[#98c799] mr-2 mt-0.5" />
                        <span>
                          {t("experiences.noTechNight.value.benefit1")}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-[#98c799] mr-2 mt-0.5" />
                        <span>
                          {t("experiences.noTechNight.value.benefit2")}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-[#98c799] mr-2 mt-0.5" />
                        <span>
                          {t("experiences.noTechNight.value.benefit3")}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}

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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="mb-12"
    >
      <motion.div
        variants={fadeIn}
        transition={{ duration: 0.5, delay: delayOffset }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold mb-2 text-[#0a3b33]">{title}</h2>
        {subtitle && (
          <p className="text-[#5a6065] max-w-3xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </motion.section>
  );
}
