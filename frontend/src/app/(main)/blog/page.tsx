"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  getAllArticles,
  getRecentArticles,
  getAllCategories,
  getAllTags,
} from "@/data/blogs";
import { getPaginatedItems, getTotalPages } from "@/lib/pagination";
import BlogCard from "@/components/main/blog/blog-card";
import SidebarArticle from "@/components/main/blog/sidebar-article";
import BlogPagination from "@/components/main/blog/blog-pagination";
import AnotherHeader from "@/components/main/another-header";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allArticles = getAllArticles();
  const featuredArticles = getRecentArticles(4);
  const categories = getAllCategories();
  const tags = getAllTags();

  // Filter articles based on selected category and tag
  let filteredArticles = allArticles;
  if (selectedCategory) {
    filteredArticles = filteredArticles.filter(
      (article) => article.category === selectedCategory
    );
  }
  if (selectedTag) {
    filteredArticles = filteredArticles.filter((article) =>
      article.tags.includes(selectedTag)
    );
  }

  const totalPages = getTotalPages(filteredArticles.length, POSTS_PER_PAGE);
  const currentArticles = getPaginatedItems(
    filteredArticles,
    currentPage,
    POSTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#f8f3e9]">
      <AnotherHeader
        title="Blog"
        description="Khám phá những câu chuyện về văn hóa, du lịch và phong cách sống tại Việt Nam"
        image="/images/img4.jpg"
        backgroundColor="#3D5A80"
        colorOverlay={true}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentArticles.map((article, index) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard {...article} />
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-12"
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Featured Articles */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Bài viết nổi bật</h2>
              <div className="space-y-6">
                {featuredArticles.map((article) => (
                  <SidebarArticle key={article.slug} {...article} />
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Danh mục</h2>
              <div className="space-y-2">
                {categories.map(({ name, count }) => (
                  <button
                    key={name}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === name ? null : name
                      )
                    }
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === name
                        ? "bg-[#5a8d69] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {name} ({count})
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Thẻ</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map(({ name, count }) => (
                  <Badge
                    key={name}
                    variant="outline"
                    className={`cursor-pointer ${
                      selectedTag === name
                        ? "bg-[#5a8d69] text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      setSelectedTag(selectedTag === name ? null : name)
                    }
                  >
                    {name} ({count})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
