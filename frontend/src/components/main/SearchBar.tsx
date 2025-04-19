"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CalendarIcon, UsersIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { addDays, formatISO, format } from "date-fns";
import { enUS } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const initialCheckIn = searchParams.get("checkIn")
    ? new Date(searchParams.get("checkIn") as string)
    : new Date();

  const initialCheckOut = searchParams.get("checkOut")
    ? new Date(searchParams.get("checkOut") as string)
    : addDays(new Date(), 1);

  const initialAdults = searchParams.get("adults")
    ? parseInt(searchParams.get("adults") as string)
    : 2;

  const initialChildren = searchParams.get("children")
    ? parseInt(searchParams.get("children") as string)
    : 0;

  const [checkIn, setCheckIn] = useState<Date | undefined>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<Date | undefined>(initialCheckOut);
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);

  // Format date to English style (MM/DD/YYYY)
  const formatDateEnglish = (date?: Date) => {
    if (!date) return "";
    return format(date, "MM/dd/yyyy", { locale: enUS });
  };

  const handleSearch = () => {
    if (!checkIn || !checkOut) return;

    if (checkOut < checkIn) {
      setCheckOut(addDays(checkIn, 1));
      return;
    }

    const params = new URLSearchParams();
    params.set("checkIn", formatISO(checkIn));
    params.set("checkOut", formatISO(checkOut));
    params.set("adults", adults.toString());
    params.set("children", children.toString());

    router.push(`/rooms?${params.toString()}`);
  };

  // Calculate total guests
  const totalGuests = adults + children;

  // Variants for staggered animation of children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 17 },
    },
    hover: { scale: 1.05, backgroundColor: "#4d7534" },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col sm:flex-row items-center justify-center bg-white/90 backdrop-blur-sm p-2 rounded-lg gap-2 max-w-3xl mx-auto shadow-md"
    >
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full"
      >
        {/* Check-in */}
        <motion.div variants={itemVariants}>
          <Popover>
            <PopoverTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="flex items-center justify-between sm:justify-start space-x-1 px-3 py-1.5 w-full text-xs sm:text-sm h-auto"
                >
                  <CalendarIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="truncate">{formatDateEnglish(checkIn)}</span>
                </Button>
              </motion.div>
            </PopoverTrigger>
            <AnimatePresence>
              <PopoverContent className="w-auto p-0 sm:p-2">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                    className="scale-75 sm:scale-100 origin-top-left"
                    locale={enUS}
                  />
                </motion.div>
              </PopoverContent>
            </AnimatePresence>
          </Popover>
        </motion.div>

        {/* Check-out */}
        <motion.div variants={itemVariants}>
          <Popover>
            <PopoverTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="flex items-center justify-between sm:justify-start space-x-1 px-3 py-1.5 w-full text-xs sm:text-sm h-auto"
                >
                  <CalendarIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="truncate">
                    {formatDateEnglish(checkOut)}
                  </span>
                </Button>
              </motion.div>
            </PopoverTrigger>
            <AnimatePresence>
              <PopoverContent className="w-auto p-0 sm:p-2">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) =>
                      checkIn
                        ? date < checkIn
                        : date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                    className="scale-75 sm:scale-100 origin-top-left"
                    locale={enUS}
                  />
                </motion.div>
              </PopoverContent>
            </AnimatePresence>
          </Popover>
        </motion.div>

        {/* Guests */}
        <motion.div variants={itemVariants}>
          <Popover>
            <PopoverTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="flex items-center justify-between sm:justify-start space-x-1 px-3 py-1.5 w-full text-xs sm:text-sm h-auto"
                >
                  <UsersIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="truncate">
                    {totalGuests} {t("common.guests.guests")}
                  </span>
                </Button>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <label className="text-sm">{t("common.guests.adults")}:</label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={adults}
                  onChange={(e) =>
                    setAdults(Math.max(1, Number(e.target.value)))
                  }
                  className="w-full"
                />
                <label className="text-sm">
                  {t("common.guests.children")}:
                </label>
                <Input
                  type="number"
                  min={0}
                  max={10}
                  value={children}
                  onChange={(e) =>
                    setChildren(Math.max(0, Number(e.target.value)))
                  }
                  className="w-full"
                />
              </motion.div>
            </PopoverContent>
          </Popover>
        </motion.div>
      </motion.div>

      {/* Search Button */}
      <motion.div variants={itemVariants} whileHover="hover" whileTap="tap">
        <Button
          className="px-4 py-1.5 text-xs sm:text-sm font-medium bg-[#5d8b3e] text-white rounded-lg hover:bg-[#4d7534] w-full sm:w-auto h-auto transition-colors"
          onClick={handleSearch}
        >
          {t("common.buttons.search")}
        </Button>
      </motion.div>
    </motion.div>
  );
}
