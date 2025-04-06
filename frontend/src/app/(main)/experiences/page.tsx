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
  return (
    <>
      <AnotherHeader
        title="Trải Nghiệm Tại "
        subtitle="Kén Homestay"
        description="Khám phá nét đẹp văn hóa Việt Nam qua những trải nghiệm độc đáo"
        image="/images/img3.jpg"
        finalPage="Trải nghiệm dịch vụ"
      />
      <div className="bg-[#f8f3e9]">
        <div className="container mx-auto px-4 py-12">
          {/* Vietnamese Morning Lifestyle Section */}
          <Section title="Vietnamese Morning Lifestyle" delayOffset={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#9C6B4A]">
                  Eat breakfast, drink Vietnamese tea, filter coffee
                </h3>
                <p className="text-[#5a6065] mb-4 leading-relaxed">
                  From 7:00 - 9:30 a.m every day, customers at the homestay will
                  enjoy drinks that are indispensable in the daily lives of
                  local people.
                </p>

                <h4 className="text-lg font-medium mt-6 mb-3 text-[#0a3b33]">
                  Breakfast Options:
                </h4>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-[#5a8d69]" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-[#7A5230]">Option 1:</p>
                      <p className="text-[#5a6065]">
                        Homestay will prepare ingredients for customers to
                        prepare their own breakfast (sandwiches, eggs, cereal,
                        fresh milk, lettuce, tomatoes, jam...)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-[#5a8d69]" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-[#7A5230]">Option 2:</p>
                      <p className="text-[#5a6065]">
                        If the customer wants to eat local food, they will send
                        dish information to the host the night before. The host
                        will assist customers in ordering meals.
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-medium mt-6 mb-3 text-[#0a3b33]">
                  Coffee & Tea Experience:
                </h4>
                <p className="text-[#5a6065] mb-4 leading-relaxed">
                  The homestay arranges a simple Vietnamese coffee counter
                  including: dry coffee, filter, sugar packets, condensed milk,
                  ice and coffee making instructions. The small tea counter
                  includes: 2 types of dry tea, tea pots, tea brewing
                  instructions.
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/img2.jpg"
                  alt="Vietnamese Morning Lifestyle"
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
                    Vietnamese Coffee
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-[#0a3b33]">
                      Iced milk coffee:
                    </h4>
                    <ul className="list-disc list-inside space-y-2 mt-2 text-[#5a6065]">
                      <li>
                        Host supports installation phin into the cup, compress
                        the coffee.
                      </li>
                      <li>
                        Brew coffee for 1-2 minutes with 30ml of boiling water.
                      </li>
                      <li>
                        Continue pouring 70-100 ml of boiling water into the
                        filter and wait for 4-5 minutes.
                      </li>
                      <li>
                        Add 2-3 spoons of condensed milk into the glass, stir
                        well until combined, then add ice and enjoy (Customize
                        according to customers' preferences).
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#0a3b33]">
                      Iced black coffee:
                    </h4>
                    <ul className="list-disc list-inside space-y-2 mt-2 text-[#5a6065]">
                      <li>
                        Host supports installation phin into the cup,
                        compressing the coffee.
                      </li>
                      <li>
                        Brew coffee for 2-3 minutes with 30ml of boiling water.
                      </li>
                      <li>
                        Pour about 70 ml of boiling water (almost full phin)
                        enter phin wait for 4-5 minutes.
                      </li>
                      <li>
                        Add 1 packet of sugar to the glass, stir well until
                        combined, then add ice and enjoy (Customize according to
                        customers' preferences).
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
                    Vietnamese Tea
                  </h3>
                </div>

                <p className="text-[#5a6065] mb-3">
                  2 popular types of tea are drunk in the morning: green tea,
                  long tea, and there are also seasonal teas.
                </p>

                <h4 className="font-medium text-[#0a3b33]">
                  Detailed instructions for visitors:
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2 text-[#5a6065]">
                  <li>
                    Put about 2-3g of tea into a teapot or small cup (depending
                    on your taste).
                  </li>
                  <li>
                    Pour water into the tea, wait a few seconds and then pour it
                    away, helping to remove dirt and making the tea softer.
                  </li>
                  <li>
                    Pour boiling water into the teapot or cup, about 200ml
                    (depending on the amount of tea). Do not pour water that is
                    too boiling (avoid water above 98°C so as not to make the
                    tea bitter).
                  </li>
                  <li>
                    Let the tea steep for about 2-3 minutes (depending on the
                    type of tea, green tea can be steeped for 1-2 minutes, black
                    tea for 3-4 minutes). Tea steeping time will affect the
                    strength and flavor of the tea.
                  </li>
                  <li>
                    After the tea has steeped, you can pour it into individual
                    glasses and enjoy.
                  </li>
                </ul>
              </motion.div>
            </div>
          </Section>

          <Separator className="my-16 opacity-30 bg-[#9C6B4A]" />

          {/* Cooking Class Section */}
          <Section title="Cooking Class" delayOffset={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/img1.jpg"
                  alt="Cooking Class"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a3b33]/80 to-transparent flex flex-col justify-end p-6">
                  <div className="text-white">
                    <Badge className="bg-[#5a8d69] border-0 mb-2">
                      Daily Activity
                    </Badge>
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">10:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm">200.000 VND/person</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h3 className="text-xl font-semibold mb-4 text-[#9C6B4A]">
                  Learn to Cook Vietnamese Cuisine
                </h3>
                <div className="flex flex-wrap items-center mb-4 gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs border-[#9C6B4A] text-[#7A5230]"
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    Shared kitchen of the homestay
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-[#5a8d69] text-[#0a3b33]"
                  >
                    <CalendarClock className="h-3 w-3 mr-1" />
                    Available daily
                  </Badge>
                </div>

                <p className="text-[#5a6065] mb-4 leading-relaxed">
                  Experience the authentic flavors of Vietnamese cuisine by
                  participating in our cooking class. We prepare fresh seasonal
                  ingredients (vegetables from the market or Kén's garden, meat,
                  fish, shrimp, squid...) from the local market that day.
                </p>

                <h4 className="text-lg font-medium mt-6 mb-3 text-[#0a3b33]">
                  Procedure:
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-[#9C6B4A]/10 rounded-full p-2 mt-1">
                      <span className="font-medium text-[#9C6B4A]">1</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-[#7A5230]">Check-in</p>
                      <p className="text-[#5a6065]">
                        When customers arrive to check in, the host will
                        introduce information about tomorrow's cooking class and
                        ask if they want to participate. Detailed information
                        about time, location, and price list will be provided.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-[#9C6B4A]/10 rounded-full p-2 mt-1">
                      <span className="font-medium text-[#9C6B4A]">2</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-[#7A5230]">Market</p>
                      <p className="text-[#5a6065]">
                        Go to the morning market around 9:00 AM (Vietnamese
                        people's time to go to the market to buy fresh
                        ingredients is from 5:00 - 9:00 AM). Guide and introduce
                        tourists to visit local markets and buy fresh
                        ingredients with local people.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-[#9C6B4A]/10 rounded-full p-2 mt-1">
                      <span className="font-medium text-[#9C6B4A]">3</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-[#7A5230]">Cook</p>
                      <p className="text-[#5a6065]">
                        The host will be the one conducting the cooking class
                        with customers to make traditional Vietnamese dishes.
                        Customers are encouraged to participate in every step of
                        food preparation (from washing, preparing to seasoning)
                        to increase the experience.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-[#9C6B4A]/10 rounded-full p-2 mt-1">
                      <span className="font-medium text-[#9C6B4A]">4</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-[#7A5230]">Enjoy</p>
                      <p className="text-[#5a6065]">
                        After completing cooking, everyone will enjoy the
                        prepared dishes together, creating a comfortable and
                        friendly space for customers to share their feelings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Separator className="my-16 opacity-30 bg-[#9C6B4A]" />

          {/* No-Tech Night Section */}
          <Section title="No-Tech Night" delayOffset={0.3}>
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <p className="text-[#5a6065] mb-4 leading-relaxed">
                Modern life often pulls us into phone screens, causing us to
                miss out on precious moments. "No-Tech Night" at "Kén" offers
                guests a chance to step away from the digital world and spend a
                meaningful evening reconnecting with themselves, nature, and
                those around them.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white/60 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-[#9C6B4A]">
                  Disconnect to Reconnect
                </h3>
                <div className="flex flex-wrap items-center mb-4 gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs border-[#5a8d69] text-[#0a3b33]"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    7:00 PM - 9:00 PM
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-[#5a8d69] text-[#0a3b33]"
                  >
                    <CalendarClock className="h-3 w-3 mr-1" />
                    Tuesday, Thursday, Saturday
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-[#9C6B4A] text-[#7A5230]"
                  >
                    <DollarSign className="h-3 w-3 mr-1" />
                    250.000 VND/person
                  </Badge>
                </div>

                <h4 className="text-lg font-medium mt-6 mb-3 text-[#0a3b33]">
                  Experience:
                </h4>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-[#5a8d69]" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-[#7A5230]">
                        A Wooden Box for Devices
                      </p>
                      <p className="text-[#5a6065]">
                        "Kén" provides a beautifully crafted wooden box where
                        guests can place their electronic devices, allowing them
                        to take a break from technology.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-[#5a8d69]" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-[#7A5230]">
                        Gentle Reminders
                      </p>
                      <p className="text-[#5a6065]">
                        A charming note in the room reads: "Tonight, turn off
                        your screens and turn on your emotions!"
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-medium mt-6 mb-3 text-[#0a3b33]">
                  A Tech-Free Space – Diverse Activities for Everyone:
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <WifiOff className="h-5 w-5 text-[#9C6B4A] mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-[#7A5230]">
                        "Nhậu" Like a Local (BBQ)
                      </p>
                      <p className="text-[#5a6065]">
                        For those who want to experience Vietnam's authentic
                        drinking culture. Raise your glasses, enjoy fun drinking
                        games, and share everyday stories (including meats &
                        beer).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <WifiOff className="h-5 w-5 text-[#9C6B4A] mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-[#7A5230]">
                        Play Board Games
                      </p>
                      <p className="text-[#5a6065]">
                        From familiar games like Uno and "Horse Chess" (Cờ cá
                        ngựa) to traditional Vietnamese games like Ô Ăn Quan,
                        all are available for a fun and engaging night.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <WifiOff className="h-5 w-5 text-[#9C6B4A] mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-[#7A5230]">
                        Read & Enjoy Your Own Space
                      </p>
                      <p className="text-[#5a6065]">
                        For those who prefer a quiet evening, "Kén" offers a
                        cozy reading corner with travel books, literature, and
                        magazines.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <WifiOff className="h-5 w-5 text-[#9C6B4A] mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-[#7A5230]">
                        Herbal Tea & Conversations
                      </p>
                      <p className="text-[#5a6065]">
                        A warm pot of herbal tea is prepared, encouraging guests
                        to sit together, chat, and share stories from their
                        journeys.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/img3.jpg"
                  alt="No-Tech Night"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a3b33]/80 to-transparent flex flex-col justify-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">
                      The Value of Disconnection
                    </h3>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-[#98c799] mr-2 mt-0.5" />
                        <span>
                          A truly relaxing night, free from notifications and
                          messages
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-[#98c799] mr-2 mt-0.5" />
                        <span>
                          A unique experience that blends the excitement of
                          local drinking culture with a peaceful space to unwind
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-[#98c799] mr-2 mt-0.5" />
                        <span>
                          Encouraging real human connections rather than screens
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
