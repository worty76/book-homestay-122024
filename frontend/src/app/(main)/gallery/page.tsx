"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import AnotherHero from "@/components/main/AnotherHero";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, X, Download, Heart, Plus, Loader2, Play } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import AnotherHeader from "@/components/main/another-header";
import { useTranslation } from "@/hooks/useTranslation";

export default function GalleryPage() {
  const { t } = useTranslation();

  const generateMedia = (startIndex: number, count: number) => {
    // Define categories based on the 3DKENHOME folder structure
    const categories = [
      "Floor 1",
      "Kitchen",
      "No Tech Night",
      "Work Room",
      "Hải Cầu Viên",
      "Lụa Hội",
      "Ngư Bình",
      "Non Nước",
      "Phong Nam",
      "Video",
    ];

    const widths = [300, 350, 400, 450, 500];
    const heights = [200, 250, 300, 350, 400, 450, 500];

    // Videos from Cloudinary
    const videos = [
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd04_cswtwh&profile=cld-default",
        thumbnail: "/images/3DKENHOME/floor1/01.png",
        category: "Video",
        title: "Video Tour 1",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd01_is7gxq&profile=cld-default",
        thumbnail: "/images/3DKENHOME/floor1/02.png",
        category: "Video",
        title: "Video Tour 2",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd12_o2alk8&profile=cld-default",
        thumbnail: "/images/3DKENHOME/floor1/03.png",
        category: "Video",
        title: "Video Tour 3",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd02&profile=cld-default",
        thumbnail: "/images/3DKENHOME/floor1/04.png",
        category: "Video",
        title: "Video Tour 4",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd03&profile=cld-default",
        thumbnail: "/images/3DKENHOME/floor1/05 (1).png",
        category: "Video",
        title: "Video Tour 5",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd05&profile=cld-default",
        thumbnail: "/images/3DKENHOME/TẦNG 02/Hải Cầu Viên/26.png",
        category: "Video",
        title: "Video Tour 6",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd06&profile=cld-default",
        thumbnail: "/images/3DKENHOME/TẦNG 02/Hải Cầu Viên/27.png",
        category: "Video",
        title: "Video Tour 7",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd07&profile=cld-default",
        thumbnail: "/images/3DKENHOME/TẦNG 02/Hải Cầu Viên/28.png",
        category: "Video",
        title: "Video Tour 8",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd08&profile=cld-default",
        thumbnail: "/images/3DKENHOME/TẦNG 02/Ngư Bình/19.png",
        category: "Video",
        title: "Video Tour 9",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd09&profile=cld-default",
        thumbnail: "/images/3DKENHOME/TẦNG 02/Ngư Bình/20.png",
        category: "Video",
        title: "Video Tour 10",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd10&profile=cld-default",
        thumbnail: "/images/3DKENHOME/TẦNG 02/Lụa Hội/24.png",
        category: "Video",
        title: "Video Tour 11",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd11&profile=cld-default",
        thumbnail: "/images/3DKENHOME/TẦNG 02/Phong Nam/25.png",
        category: "Video",
        title: "Video Tour 12",
      },
      {
        url: "https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=vd13&profile=cld-default",
        thumbnail: "/images/3DKENHOME/TẦNG 02/Non nước/TANG02-11.png",
        category: "Video",
        title: "Video Tour 13",
      },
    ];

    // All images from the 3DKENHOME folder
    const allImages = [
      // Floor 1 main images
      "3DKENHOME/floor1/01.png",
      "3DKENHOME/floor1/01 (1).png",
      "3DKENHOME/floor1/02.png",
      "3DKENHOME/floor1/02(1).png",
      "3DKENHOME/floor1/03.png",
      "3DKENHOME/floor1/03 (1).png",
      "3DKENHOME/floor1/04.png",
      "3DKENHOME/floor1/04 (1).png",
      "3DKENHOME/floor1/05 (1).png",
      "3DKENHOME/floor1/30.png",
      "3DKENHOME/floor1/D6.jpg",

      // Floor 1 - Kitchen (Bếp)
      "3DKENHOME/floor1/Bếp/19.png",
      "3DKENHOME/floor1/Bếp/20.png",
      "3DKENHOME/floor1/Bếp/21.png",

      // Floor 1 - No tech night
      "3DKENHOME/floor1/No tech night/10.png",
      "3DKENHOME/floor1/No tech night/11.png",
      "3DKENHOME/floor1/No tech night/12.png",
      "3DKENHOME/floor1/No tech night/12 (1).png",
      "3DKENHOME/floor1/No tech night/13 (1).png",
      "3DKENHOME/floor1/No tech night/14 (1).png",
      "3DKENHOME/floor1/No tech night/16.png",
      "3DKENHOME/floor1/No tech night/17.png",

      // Floor 1 - Work Room (Phòng làm việc)
      "3DKENHOME/floor1/Phòng làm việc/13.png",
      "3DKENHOME/floor1/Phòng làm việc/14.png",
      "3DKENHOME/floor1/Phòng làm việc/31.png",
      "3DKENHOME/floor1/Phòng làm việc/32.png",

      // Floor 2 - Hải Cầu Viên
      "3DKENHOME/TẦNG 02/Hải Cầu Viên/26.png",
      "3DKENHOME/TẦNG 02/Hải Cầu Viên/27.png",
      "3DKENHOME/TẦNG 02/Hải Cầu Viên/28.png",
      "3DKENHOME/TẦNG 02/Hải Cầu Viên/29.png",
      "3DKENHOME/TẦNG 02/Hải Cầu Viên/30.png",

      // Floor 2 - Lụa Hội
      "3DKENHOME/TẦNG 02/Lụa Hội/24.png",
      "3DKENHOME/TẦNG 02/Lụa Hội/D2.jpg",
      "3DKENHOME/TẦNG 02/Lụa Hội/BS-LUAHOI01.png",
      "3DKENHOME/TẦNG 02/Lụa Hội/TANG02-08.png",

      // Floor 2 - Ngư Bình
      "3DKENHOME/TẦNG 02/Ngư Bình/19.png",
      "3DKENHOME/TẦNG 02/Ngư Bình/20.png",
      "3DKENHOME/TẦNG 02/Ngư Bình/21.png",
      "3DKENHOME/TẦNG 02/Ngư Bình/22.png",
      "3DKENHOME/TẦNG 02/Ngư Bình/23.png",
      "3DKENHOME/TẦNG 02/Ngư Bình/D3.jpg",
      "3DKENHOME/TẦNG 02/Ngư Bình/TANG02-21.png",

      // Floor 2 - Non nước
      "3DKENHOME/TẦNG 02/Non nước/D4.jpg",
      "3DKENHOME/TẦNG 02/Non nước/D5.jpg",
      "3DKENHOME/TẦNG 02/Non nước/D7.jpg",
      "3DKENHOME/TẦNG 02/Non nước/D8.jpg",
      "3DKENHOME/TẦNG 02/Non nước/TANG02-11.png",

      // Floor 2 - Phong Nam
      "3DKENHOME/TẦNG 02/Phong Nam/25.png",
      "3DKENHOME/TẦNG 02/Phong Nam/D12.jpg",
      "3DKENHOME/TẦNG 02/Phong Nam/D9.jpg",
      "3DKENHOME/TẦNG 02/Phong Nam/TANG02-04.png",
    ];

    // First, generate videos
    const mediaItems = videos.map((video, index) => {
      return {
        id: `video-${startIndex + index}`, // Use string ID with prefix to avoid potential overlap
        type: "video",
        url: video.url,
        thumbnailUrl: video.thumbnail,
        alt: `Video ${index + 1}`,
        width: 400,
        height: 300,
        category: video.category,
        photographer: video.title,
      };
    });

    // Then generate images if we need more items
    if (count > videos.length) {
      const remainingCount = count - videos.length;
      const imageItems = Array.from({ length: remainingCount }, (_, i) => {
        const id = `image-${startIndex + i}`; // Use string ID with prefix
        const imageIndex = i % allImages.length; // Use i instead of id
        const imagePath = allImages[imageIndex];
        const width = widths[Math.floor(Math.random() * widths.length)];
        const height = heights[Math.floor(Math.random() * heights.length)];

        // Determine category based on image path
        let category = "Floor 1"; // Default category
        if (imagePath.includes("/floor1/Bếp/")) {
          category = "Kitchen";
        } else if (imagePath.includes("/floor1/No tech night/")) {
          category = "No Tech Night";
        } else if (imagePath.includes("/floor1/Phòng làm việc/")) {
          category = "Work Room";
        } else if (imagePath.includes("/floor1/")) {
          category = "Floor 1";
        } else if (imagePath.includes("/Hải Cầu Viên/")) {
          category = "Hải Cầu Viên";
        } else if (imagePath.includes("/Lụa Hội/")) {
          category = "Lụa Hội";
        } else if (imagePath.includes("/Ngư Bình/")) {
          category = "Ngư Bình";
        } else if (imagePath.includes("/Non nước/")) {
          category = "Non Nước";
        } else if (imagePath.includes("/Phong Nam/")) {
          category = "Phong Nam";
        }

        return {
          id,
          type: "image",
          url: `/images/${imagePath}`,
          thumbnailUrl: `/images/${imagePath}`,
          alt: `Image ${id}`,
          width,
          height,
          category,
          photographer: `${t("gallery.photographer")} ${(i % 10) + 1}`,
        };
      });

      mediaItems.push(...imageItems);
    }

    return mediaItems;
  };

  const [media, setMedia] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(
    t("gallery.categories.all")
  );

  // Updated categories based on folder structure
  const categories = [
    t("gallery.categories.all"),
    "Floor 1",
    "Kitchen",
    "No Tech Night",
    "Work Room",
    "Hải Cầu Viên",
    "Lụa Hội",
    "Ngư Bình",
    "Non Nước",
    "Phong Nam",
    "Video",
  ];

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    setMedia(generateMedia(0, 40)); // Load more items initially to ensure we have enough
  }, []);

  useEffect(() => {
    if (inView && !isLoading && activeCategory !== "Video") {
      // Only load more if not in Video category
      loadMoreMedia();
    }
  }, [inView, activeCategory]);

  const loadMoreMedia = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      const newMedia = generateMedia(media.length, 10);
      setMedia((prev) => [...prev, ...newMedia]);
      setPage((prev) => prev + 1);
      setIsLoading(false);
    }, 1000);
  }, [media.length, isLoading]);

  const filteredMedia = media.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.photographer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === t("gallery.categories.all") ||
      item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnotherHeader
        title={t("gallery.title")}
        description={t("gallery.description")}
        finalPage={t("gallery.finalPage")}
        image="/images/3DKENHOME/floor1/01.png"
      />

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={cn(
                "rounded-full text-sm capitalize ",
                activeCategory === category
                  ? "bg-[#8a9a5b] text-white"
                  : "hover:bg-[#8a9a5b]/90"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: (index % 10) * 0.05 }}
                className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden mb-4"
                onClick={() => handleItemClick(item)}
              >
                <div className="relative">
                  {item.type === "image" ? (
                    <Image
                      src={item.url || "/placeholder.svg"}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      className="w-full h-auto object-cover rounded-xl"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOQvhwAAAABJRU5ErkJggg=="
                      priority={index < 4}
                    />
                  ) : (
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100">
                      <Image
                        src={
                          item.thumbnailUrl || "/images/3DKENHOME/floor1/01.png"
                        }
                        alt={item.alt}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                        unoptimized={item.type === "video"}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="bg-white/80 rounded-full p-3">
                          <Play className="h-8 w-8 text-[#8a9a5b]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <p className="font-medium text-sm">{item.photographer}</p>
                  <p className="text-xs text-gray-300 capitalize">
                    {item.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div ref={ref} className="flex justify-center mt-8 py-8">
          {isLoading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-gray-500">
                {t("gallery.loadingMore")}
              </span>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 z-10 rounded-full bg-black/50 hover:bg-black/70"
                onClick={closeModal}
              >
                <X className="h-5 w-5 text-white" />
              </Button>

              {selectedItem.type === "image" ? (
                <Image
                  src={selectedItem.url || "/placeholder.svg"}
                  alt={selectedItem.alt}
                  width={1200}
                  height={800}
                  className="max-h-[90vh] w-auto object-contain"
                />
              ) : (
                <div className="w-full h-full min-h-[70vh] max-w-[90vw] bg-black">
                  {/* <iframe
                    src={selectedItem.url}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe> */}
                  <iframe
                    src={selectedItem.url}
                    width="1280"
                    height="720"
                    style={{
                      height: "70vh",
                      width: "100%",
                      minWidth: "800px",
                      aspectRatio: "16 / 9",
                    }}
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                </div>
              )}

              {selectedItem.type === "image" ? (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h3 className="text-xl font-medium">
                    {selectedItem.photographer}
                  </h3>
                  <p className="text-sm text-gray-300 capitalize">
                    {selectedItem.category}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
