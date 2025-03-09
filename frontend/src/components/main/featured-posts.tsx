"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Post {
  id: string;
  title: string;
  image: string;
  slug: string;
}

const featuredPosts: Post[] = [
  {
    id: "1",
    title: "Exploring the Great Wall of China",
    image: "/images/image4.png",
    slug: "exploring-great-wall-china",
  },
  {
    id: "2",
    title: "A Journey Through Kyoto's Temples",
    image: "/images/image4.png",
    slug: "journey-through-kyoto-temples",
  },
  {
    id: "3",
    title: "Santorini: The Gem of the Aegean",
    image: "/images/image4.png",
    slug: "santorini-gem-aegean",
  },
  {
    id: "4",
    title: "Paris in Spring: A Dreamy Getaway",
    image: "/images/image4.png",
    slug: "paris-spring-getaway",
  },
  {
    id: "5",
    title: "Venice: The City of Canals",
    image: "/images/image4.png",
    slug: "venice-city-canals",
  },
];

export default function FeaturedPosts() {
  return (
    <div className="container mx-auto px-20 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* First Row - Large Posts */}
        {featuredPosts.slice(0, 2).map((post) => (
          <motion.div
            key={post.id}
            className="relative aspect-[4/3] lg:col-span-3 overflow-hidden rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link href={`/posts/${post.slug}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority={true}
              />
              <h2 className="absolute bottom-4 left-4 right-4 text-white text-xl md:text-2xl font-bold z-20">
                {post.title}
              </h2>
            </Link>
          </motion.div>
        ))}

        {/* Second Row - Smaller Posts */}
        {featuredPosts.slice(2).map((post) => (
          <motion.div
            key={post.id}
            className="relative aspect-[4/3] lg:col-span-2 overflow-hidden rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link href={`/posts/${post.slug}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <h2 className="absolute bottom-4 left-4 right-4 text-white text-lg md:text-xl font-bold z-20">
                {post.title}
              </h2>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
