"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import axios from "axios";
import { BlogArticle } from "@/app/(main)/blog/page";
import { Badge } from "@/components/ui/badge";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturedPosts() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/blog`);
        // Sort by date and take the most recent 3
        const sortedArticles = response.data
          .sort(
            (a: BlogArticle, b: BlogArticle) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);
        setArticles(sortedArticles);
      } catch (error) {
        console.error("Error fetching blog articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#f8f3e9] py-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[#0a3b33] text-2xl font-bold">
              Đọc blog của chúng tôi
            </h2>
            <Link
              href="/blog"
              className="text-[#5a8d69] font-medium flex items-center"
            >
              Xem tất cả blog <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="flex justify-center py-20">
            <div className="animate-pulse">Đang tải bài viết...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f8f3e9] py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[#0a3b33] text-2xl font-bold">
            Đọc blog của chúng tôi
          </h2>
          <Link
            href="/blog"
            className="text-[#5a8d69] font-medium flex items-center"
          >
            Xem tất cả blog <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={article._id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
              className="rounded-xl overflow-hidden bg-white shadow-sm h-full flex flex-col"
            >
              <Link href={`/blog/${article._id}`} className="block">
                <div className="relative aspect-video">
                  <Image
                    src={article.imageUrl || "/images/placeholder.jpg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
              </Link>

              <div className="p-6 flex flex-col flex-grow">
                <Link href={`/blog/category/${article.category}`}>
                  <Badge variant="secondary" className="mb-3 inline-block">
                    {article.category}
                  </Badge>
                </Link>

                <Link href={`/blog/${article._id}`} className="block mb-2">
                  <h3 className="text-xl font-bold text-[#0a3b33] hover:text-[#5a8d69] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>

                <div className="text-gray-500 text-sm flex items-center mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(article.createdAt).toLocaleDateString("vi-VN")}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                  {article.content.substring(0, 150) + "..."}
                </p>

                <Link
                  href={`/blog/${article._id}`}
                  className="text-[#5a8d69] hover:underline uppercase font-medium text-sm inline-flex items-center mt-auto"
                >
                  Đọc ngay
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
