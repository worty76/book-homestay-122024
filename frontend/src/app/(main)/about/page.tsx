"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useInView } from "react-intersection-observer";
import AnotherHeader from "@/components/main/another-header";
import { useTranslation } from "@/hooks/useTranslation";
import { OrganizationJsonLd, BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f8f3e9]/50">
      <OrganizationJsonLd
        name={t("seo.aboutPage.organization.name")}
        url="https://ken-homestay.com"
        logo="https://ken-homestay.com/images/logo.png"
        address={t("seo.aboutPage.organization.address")}
        telephone={t("seo.aboutPage.organization.telephone")}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: t("seo.aboutPage.breadcrumbs.home"),
            item: "https://ken-homestay.com",
          },
          {
            position: 2,
            name: t("seo.aboutPage.breadcrumbs.about"),
            item: "https://ken-homestay.com/about",
          },
        ]}
      />

      <AnotherHeader
        title={t("about.header.title")}
        subtitle={t("about.header.subtitle")}
        description={t("about.header.description")}
        image="/images/3DKENHOME/floor1/01.png"
        finalPage={t("about.header.finalPage")}
      />

      <div className="container mx-auto px-4 py-16">
        {/* Our Story Section */}
        <Section title={t("about.story.title")} delayOffset={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <AnimatedImage
                src="/images/Logo1.png"
                alt={t("about.story.imageAlt")}
                priority
              />
            </div>
            <motion.div
              className="order-1 lg:order-2"
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-[#7a5230] mb-5 leading-relaxed text-lg">
                <span>{t("about.story.paragraph1")}</span>
              </p>
              <p className="text-[#7a5230] mb-5 leading-relaxed text-lg">
                <span>{t("about.story.paragraph2")}</span>
              </p>
            </motion.div>
          </div>
        </Section>

        <Separator className="my-20 opacity-30" />

        {/* Vision & Mission Section */}
        <Section title={t("about.visionMission.title")} delayOffset={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl p-8 border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>{t("about.visionMission.visionTitle")}</span>
              </h3>
              <p className="text-white leading-relaxed">
                <span>{t("about.visionMission.visionText")}</span>
              </p>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-[#6a11cb] to-[#2575fc] rounded-xl p-8 border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                <span>{t("about.visionMission.missionTitle")}</span>
              </h3>
              <p className="text-white leading-relaxed">
                <span>{t("about.visionMission.missionText")}</span>
              </p>
            </motion.div>
          </div>
        </Section>

        <Separator className="my-20 opacity-30" />

        {/* Slogan Section */}
        <Section title={t("about.slogan.title")} delayOffset={0.2}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center bg-gradient-to-b from-[#344E41] to-[#2C4134] rounded-xl p-12 border border-primary/10"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#F3ECDC] mb-6 tracking-tight">
              <span>{t("about.slogan.text")}</span>
            </h3>
            <p className="text-[#F3ECDC]/90 max-w-2xl mx-auto text-lg">
              <span>{t("about.slogan.description")}</span>
            </p>
          </motion.div>
        </Section>

        <Separator className="my-20 opacity-30" />

        <Section
          title={t("about.values.title")}
          subtitle={t("about.values.subtitle")}
          delayOffset={0.2}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard
              icon={
                <div className="p-4 rounded-full bg-[#FFD700] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
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
              title={t("about.values.value1.title")}
              description={t("about.values.value1.description")}
              delay={0.3}
            />

            <AnimatedCard
              icon={
                <div className="p-4 rounded-full bg-[#fa709a] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
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
              title={t("about.values.value2.title")}
              description={t("about.values.value2.description")}
              delay={0.4}
            />

            <AnimatedCard
              icon={
                <div className="p-4 rounded-full bg-[#228B22] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
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
              title={t("about.values.value3.title")}
              description={t("about.values.value3.description")}
              delay={0.5}
            />
          </div>
        </Section>

        <Separator className="my-20 opacity-30" />

        {/* Team Section */}
        <Section
          title={t("about.team.title")}
          subtitle={t("about.team.subtitle")}
          delayOffset={0.2}
        >
          <div className="flex flex-col justify-center w-full gap-4">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <TeamCarousel />
            </div>
          </div>
        </Section>

        <Separator className="my-20 opacity-30" />

        {/* Testimonials Section */}
        <Section
          title={t("about.testimonials.title")}
          subtitle={t("about.testimonials.subtitle")}
          delayOffset={0.2}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedTestimonial
              quote={t("about.testimonials.testimonial1.quote")}
              author={t("about.testimonials.testimonial1.author")}
              location={t("about.testimonials.testimonial1.location")}
              delay={0.3}
            />

            <AnimatedTestimonial
              quote={t("about.testimonials.testimonial2.quote")}
              author={t("about.testimonials.testimonial2.author")}
              location={t("about.testimonials.testimonial2.location")}
              delay={0.4}
            />

            <AnimatedTestimonial
              quote={t("about.testimonials.testimonial3.quote")}
              author={t("about.testimonials.testimonial3.author")}
              location={t("about.testimonials.testimonial3.location")}
              delay={0.5}
            />

            <AnimatedTestimonial
              quote={t("about.testimonials.testimonial4.quote")}
              author={t("about.testimonials.testimonial4.author")}
              location={t("about.testimonials.testimonial4.location")}
              delay={0.6}
            />
          </div>
        </Section>

        {/* Location & Contact Section */}
        <Section title={t("about.contact.title")} delayOffset={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div
                id="map"
                className="relative h-[400px] rounded-xl overflow-hidden mb-6 shadow-md"
              >
                <Image
                  src="/images/map.png"
                  alt={t("about.contact.mapAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  <span>{t("about.contact.locationTitle")}</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  <span>{t("about.contact.locationDescription")}</span>
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        {t("about.contact.addressTitle")}
                      </h4>
                      <p className="text-muted-foreground">
                        {t("about.contact.address")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        {t("about.contact.hoursTitle")}
                      </h4>
                      <p className="text-muted-foreground">
                        {t("about.contact.checkInHours")}
                        <br />
                        {t("about.contact.checkOutHours")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-card/90 to-card p-8 rounded-xl border border-border/40 shadow-sm h-full">
                <h3 className="text-xl font-semibold mb-6 text-primary">
                  <span>{t("about.contact.contactTitle")}</span>
                </h3>
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        {t("about.contact.phoneTitle")}
                      </h4>
                      <p className="text-muted-foreground">+84 925 090 669</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        {t("about.contact.emailTitle")}
                      </h4>
                      <p className="text-muted-foreground">
                        info@kenhomestay.com
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="font-medium mb-4 text-primary">
                  <span>{t("about.contact.connectTitle")}</span>
                </h4>
                <div className="flex items-center gap-4 mb-8">
                  {/** whatsapp icon */}
                  <a
                    href="tel:0925090669"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-full hover:bg-primary/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="26"
                      height="26"
                      viewBox="0 0 32 32"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M 24.503906 7.503906 C 22.246094 5.246094 19.246094 4 16.050781 4 C 9.464844 4 4.101563 9.359375 4.101563 15.945313 C 4.097656 18.050781 4.648438 20.105469 5.695313 21.917969 L 4 28.109375 L 10.335938 26.445313 C 12.078125 27.398438 14.046875 27.898438 16.046875 27.902344 L 16.050781 27.902344 C 22.636719 27.902344 27.996094 22.542969 28 15.953125 C 28 12.761719 26.757813 9.761719 24.503906 7.503906 Z M 16.050781 25.882813 L 16.046875 25.882813 C 14.265625 25.882813 12.515625 25.402344 10.992188 24.5 L 10.628906 24.285156 L 6.867188 25.269531 L 7.871094 21.605469 L 7.636719 21.230469 C 6.640625 19.648438 6.117188 17.820313 6.117188 15.945313 C 6.117188 10.472656 10.574219 6.019531 16.054688 6.019531 C 18.707031 6.019531 21.199219 7.054688 23.074219 8.929688 C 24.949219 10.808594 25.980469 13.300781 25.980469 15.953125 C 25.980469 21.429688 21.523438 25.882813 16.050781 25.882813 Z M 21.496094 18.445313 C 21.199219 18.296875 19.730469 17.574219 19.457031 17.476563 C 19.183594 17.375 18.984375 17.328125 18.785156 17.625 C 18.585938 17.925781 18.015625 18.597656 17.839844 18.796875 C 17.667969 18.992188 17.492188 19.019531 17.195313 18.871094 C 16.894531 18.722656 15.933594 18.40625 14.792969 17.386719 C 13.90625 16.597656 13.304688 15.617188 13.132813 15.320313 C 12.957031 15.019531 13.113281 14.859375 13.261719 14.710938 C 13.398438 14.578125 13.5625 14.363281 13.710938 14.1875 C 13.859375 14.015625 13.910156 13.890625 14.011719 13.691406 C 14.109375 13.492188 14.058594 13.316406 13.984375 13.167969 C 13.910156 13.019531 13.3125 11.546875 13.0625 10.949219 C 12.820313 10.367188 12.574219 10.449219 12.390625 10.4375 C 12.21875 10.429688 12.019531 10.429688 11.820313 10.429688 C 11.621094 10.429688 11.296875 10.503906 11.023438 10.804688 C 10.75 11.101563 9.980469 11.824219 9.980469 13.292969 C 9.980469 14.761719 11.050781 16.183594 11.199219 16.382813 C 11.347656 16.578125 13.304688 19.59375 16.300781 20.886719 C 17.011719 21.195313 17.566406 21.378906 18 21.515625 C 18.714844 21.742188 19.367188 21.710938 19.882813 21.636719 C 20.457031 21.550781 21.648438 20.914063 21.898438 20.214844 C 22.144531 19.519531 22.144531 18.921875 22.070313 18.796875 C 21.996094 18.671875 21.796875 18.597656 21.496094 18.445313 Z"
                      ></path>
                    </svg>
                  </a>
                  {/** instagram icon */}
                  <a
                    href="https://www.instagram.com/ken_homestay/?utm_source=ig_web_button_share_sheet"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-full hover:bg-primary/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-full hover:bg-primary/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="24"
                      height="24"
                      viewBox="0 0 64 64"
                      fill="currentColor"
                    >
                      <path d="M32,6C17.642,6,6,17.642,6,32c0,13.035,9.603,23.799,22.113,25.679V38.89H21.68v-6.834h6.433v-4.548	c0-7.529,3.668-10.833,9.926-10.833c2.996,0,4.583,0.223,5.332,0.323v5.965h-4.268c-2.656,0-3.584,2.52-3.584,5.358v3.735h7.785	l-1.055,6.834h-6.73v18.843C48.209,56.013,58,45.163,58,32C58,17.642,46.359,6,32,6z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 bg-muted/50 rounded-full hover:bg-primary/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="24"
                      height="24"
                      viewBox="0 0 50 50"
                      fill="currentColor"
                    >
                      <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 15.580078 6 C 12.00899 9.7156859 10 14.518083 10 19.5 C 10 24.66 12.110156 29.599844 15.910156 33.339844 C 16.030156 33.549844 16.129922 34.579531 15.669922 35.769531 C 15.379922 36.519531 14.799687 37.499141 13.679688 37.869141 C 13.249688 38.009141 12.97 38.430859 13 38.880859 C 13.03 39.330859 13.360781 39.710781 13.800781 39.800781 C 16.670781 40.370781 18.529297 39.510078 20.029297 38.830078 C 21.379297 38.210078 22.270625 37.789609 23.640625 38.349609 C 26.440625 39.439609 29.42 40 32.5 40 C 36.593685 40 40.531459 39.000731 44 37.113281 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 33 15 C 33.55 15 34 15.45 34 16 L 34 25 C 34 25.55 33.55 26 33 26 C 32.45 26 32 25.55 32 25 L 32 16 C 32 15.45 32.45 15 33 15 z M 18 16 L 23 16 C 23.36 16 23.700859 16.199531 23.880859 16.519531 C 24.050859 16.829531 24.039609 17.219297 23.849609 17.529297 L 19.800781 24 L 23 24 C 23.55 24 24 24.45 24 25 C 24 25.55 23.55 26 23 26 L 18 26 C 17.64 26 17.299141 25.800469 17.119141 25.480469 C 16.949141 25.170469 16.960391 24.780703 17.150391 24.470703 L 21.199219 18 L 18 18 C 17.45 18 17 17.55 17 17 C 17 16.45 17.45 16 18 16 z M 27.5 19 C 28.11 19 28.679453 19.169219 29.189453 19.449219 C 29.369453 19.189219 29.65 19 30 19 C 30.55 19 31 19.45 31 20 L 31 25 C 31 25.55 30.55 26 30 26 C 29.65 26 29.369453 25.810781 29.189453 25.550781 C 28.679453 25.830781 28.11 26 27.5 26 C 25.57 26 24 24.43 24 22.5 C 24 20.57 25.57 19 27.5 19 z M 38.5 19 C 40.43 19 42 20.57 42 22.5 C 42 24.43 40.43 26 38.5 26 C 36.57 26 35 24.43 35 22.5 C 35 20.57 36.57 19 38.5 19 z M 27.5 21 C 27.39625 21 27.29502 21.011309 27.197266 21.03125 C 27.001758 21.071133 26.819727 21.148164 26.660156 21.255859 C 26.500586 21.363555 26.363555 21.500586 26.255859 21.660156 C 26.148164 21.819727 26.071133 22.001758 26.03125 22.197266 C 26.011309 22.29502 26 22.39625 26 22.5 C 26 22.60375 26.011309 22.70498 26.03125 22.802734 C 26.051191 22.900488 26.079297 22.994219 26.117188 23.083984 C 26.155078 23.17375 26.202012 23.260059 26.255859 23.339844 C 26.309707 23.419629 26.371641 23.492734 26.439453 23.560547 C 26.507266 23.628359 26.580371 23.690293 26.660156 23.744141 C 26.819727 23.851836 27.001758 23.928867 27.197266 23.96875 C 27.29502 23.988691 27.39625 24 27.5 24 C 27.60375 24 27.70498 23.988691 27.802734 23.96875 C 28.487012 23.82916 29 23.22625 29 22.5 C 29 21.67 28.33 21 27.5 21 z M 38.5 21 C 38.39625 21 38.29502 21.011309 38.197266 21.03125 C 38.099512 21.051191 38.005781 21.079297 37.916016 21.117188 C 37.82625 21.155078 37.739941 21.202012 37.660156 21.255859 C 37.580371 21.309707 37.507266 21.371641 37.439453 21.439453 C 37.303828 21.575078 37.192969 21.736484 37.117188 21.916016 C 37.079297 22.005781 37.051191 22.099512 37.03125 22.197266 C 37.011309 22.29502 37 22.39625 37 22.5 C 37 22.60375 37.011309 22.70498 37.03125 22.802734 C 37.051191 22.900488 37.079297 22.994219 37.117188 23.083984 C 37.155078 23.17375 37.202012 23.260059 37.255859 23.339844 C 37.309707 23.419629 37.371641 23.492734 37.439453 23.560547 C 37.507266 23.628359 37.580371 23.690293 37.660156 23.744141 C 37.739941 23.797988 37.82625 23.844922 37.916016 23.882812 C 38.005781 23.920703 38.099512 23.948809 38.197266 23.96875 C 38.29502 23.988691 38.39625 24 38.5 24 C 38.60375 24 38.70498 23.988691 38.802734 23.96875 C 39.487012 23.82916 40 23.22625 40 22.5 C 40 21.67 39.33 21 38.5 21 z"></path>
                    </svg>
                  </a>
                </div>

                <Separator className="my-6 opacity-30" />

                <h4 className="font-medium mb-4">
                  <span>{t("about.contact.bookingQuestion")}</span>
                </h4>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#5d8b40] hover:bg-[#5d8b40]/90 text-white shadow-sm"
                >
                  <Link
                    href="/rooms"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>{t("about.contact.bookNow")}</span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
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
  return (
    <section className="mb-20">
      <motion.div
        className="text-center mb-12"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delayOffset }}
      >
        <h2 className="text-3xl font-bold mb-3 tracking-tight text-[#0a3b33]">
          <span>{title}</span>
        </h2>
        {subtitle && (
          <p className="text-[#5a8d69] max-w-2xl mx-auto">
            <span>{subtitle}</span>
          </p>
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
      transition={{ duration: 0.6, delay }}
      className="bg-gradient-to-br from-card/90 to-card rounded-xl p-6 border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="mb-5">{icon}</div>
      <h3 className="text-lg font-semibold mb-3 text-primary">
        <span>{title}</span>
      </h3>
      <p className="text-muted-foreground">
        <span>{description}</span>
      </p>
    </motion.div>
  );
}

// Animated Image Component
function AnimatedImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-xl overflow-hidden shadow-md aspect-[4/3]"
      variants={slideInLeft}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.6 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
      />
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
      transition={{ duration: 0.6, delay }}
      className="bg-gradient-to-br from-card/90 to-card rounded-xl p-6 border border-border/40 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-primary/50 h-8 w-8 mb-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
          transform="rotate(180 12 12)"
        />
      </svg>
      <p className="text-muted-foreground mb-5 italic leading-relaxed">
        "<span>{quote}</span>"
      </p>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-foreground">
            <span>{author}</span>
          </h4>
          <p className="text-muted-foreground text-sm">
            <span>{location}</span>
          </p>
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

// Team Carousel Component
function TeamCarousel() {
  const { t } = useTranslation();
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const teamImages = [
    {
      src: "/images/Team/DSC05579.jpg",
      caption:
        t("about.team.carousel.image1") || "Team at the homestay entrance",
    },
    {
      src: "/images/Team/DSC05581.jpg",
      caption: t("about.team.carousel.image2") || "Our team serving guests",
    },
    {
      src: "/images/Team/DSC05593.jpg",
      caption: t("about.team.carousel.image3") || "Team handling reservations",
    },
    {
      src: "/images/Team/DSC05597.jpg",
      caption: t("about.team.carousel.image4") || "Our hospitality team",
    },
    {
      src: "/images/Team/DSC05603.jpg",
      caption: t("about.team.carousel.image5") || "Team preparing for guests",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {teamImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative group">
                <img
                  src={image.src}
                  alt={`${t("about.team.imageAlt")} ${index + 1}`}
                  className="w-full h-auto aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-sm md:text-base">{image.caption}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <CarouselPrevious className="w-12 h-12 bg-[#8a9a5b] hover:bg-[#758a4b] text-white rounded-full shadow-md ml-2 absolute left-0"></CarouselPrevious>
          <CarouselNext className="w-12 h-12 bg-[#8a9a5b] hover:bg-[#758a4b] text-white rounded-full shadow-md mr-2 absolute right-0"></CarouselNext>
        </div>
      </Carousel>
    </>
  );
}
