"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { BlogArticle } from "@/app/(main)/blog/page";
import { useTranslation } from "@/hooks/useTranslation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BlogSection() {
  const { t, language } = useTranslation();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // Language-specific date format
  const dateFormat = language === "en" ? "en-US" : "vi-VN";

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/blog`);
        // Sort by date and take the most recent 6
        const sortedArticles = response.data
          .sort(
            (a: BlogArticle, b: BlogArticle) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 6);
        setArticles(sortedArticles);
      } catch (error) {
        console.error("Error fetching blog articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const [plugin, setPlugin] = useState<AutoplayType | null>(null);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setPlugin(
      Autoplay({
        delay: 3000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      })
    );
  }, []);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) api.scrollTo(index);
  };

  if (loading) {
    return (
      <section className="bg-[#f8f3e9] py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-start mb-12">
            <div>
              <span className="text-[#5a8d69] uppercase tracking-wider text-sm mb-4 block">
                {t("home.blog.subtitle")}
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl text-[#0a3b33] leading-tight">
                {t("home.blog.title")}
              </h2>
            </div>
          </div>
          <div className="flex justify-center py-20">
            <div className="animate-pulse">{t("common.loading")}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f8f3e9] py-16">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <span className="text-[#5a8d69] uppercase tracking-wider text-sm mb-4 block">
              {t("home.blog.subtitle")}
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl text-[#0a3b33] leading-tight">
              {t("home.blog.title")}
            </h2>
          </div>

          <Link href="/blog" legacyBehavior>
            <motion.a
              className="hidden md:flex items-center gap-2 text-[#5a8d69] uppercase tracking-wider text-sm group cursor-pointer"
              whileHover={{ x: 4 }}
            >
              <span>{t("home.blog.viewAll")}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </Link>
        </div>

        <div className="relative px-8">
          <Carousel
            className="mb-4"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={plugin ? [plugin] : undefined}
            setApi={setApi}
          >
            <CarouselContent>
              {articles.map((article, index) => (
                <CarouselItem
                  key={article._id}
                  className="md:basis-1/2 lg:basis-1/3 pl-6"
                >
                  <motion.article
                    className="bg-white rounded-3xl overflow-hidden group h-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    variants={fadeIn}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={article.imageUrl || "/images/placeholder.jpg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="font-playfair text-xl font-bold mb-3 text-[#0a3b33] line-clamp-2">
                        {article.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-3 text-gray-500 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-calendar"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                        <span>
                          {new Date(article.createdAt).toLocaleDateString(
                            dateFormat
                          )}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.content.substring(0, 150) + "..."}
                      </p>

                      <Link href={`/blog/${article._id}`} passHref>
                        <motion.a
                          className="inline-flex items-center gap-2 text-[#5a8d69] uppercase tracking-wider text-sm group/link cursor-pointer"
                          whileHover={{ x: 4 }}
                        >
                          <span>{t("common.buttons.readMore")}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </motion.a>
                      </Link>
                    </div>
                  </motion.article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="w-12 h-12 bg-[#8a9a5b] hover:bg-[#758a4b] text-white rounded-full shadow-md -ml-6 absolute left-0" />
            <CarouselNext className="w-12 h-12 bg-[#8a9a5b] hover:bg-[#758a4b] text-white rounded-full shadow-md -mr-6 absolute right-0" />
          </Carousel>

          <div className="flex justify-center gap-2 mt-6 mb-4">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-[#5a8d69] w-8"
                    : "bg-[#5a8d69]/30 hover:bg-[#5a8d69]/50"
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <Link href="/blog" legacyBehavior>
          <motion.a
            className="flex md:hidden items-center gap-2 text-[#5a8d69] uppercase tracking-wider text-sm justify-center cursor-pointer mt-6"
            whileHover={{ x: 4 }}
          >
            <span>{t("home.blog.viewAll")}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </Link>
      </div>
    </section>
  );
}
