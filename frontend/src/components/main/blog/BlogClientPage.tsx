"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import BlogCard from "@/components/main/blog/blog-card";
import SidebarArticle from "@/components/main/blog/sidebar-article";
import BlogPagination from "@/components/main/blog/blog-pagination";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { BlogArticle } from "@/app/(main)/blog/page";

interface BlogCategory {
  name: string;
  count: number;
}

interface BlogTag {
  name: string;
  count: number;
}

interface BlogClientPageProps {
  currentArticles: BlogArticle[];
  featuredArticles: BlogArticle[];
  categories: BlogCategory[];
  tags: BlogTag[];
  currentPage: number;
  totalPages: number;
  selectedCategory: string | null;
  selectedTag: string | null;
}

export default function BlogClientPage({
  currentArticles,
  featuredArticles,
  categories,
  tags,
  currentPage,
  totalPages,
  selectedCategory: initialSelectedCategory,
  selectedTag: initialSelectedTag,
}: BlogClientPageProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialSelectedCategory
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(
    initialSelectedTag
  );

  // Update URL when selections change
  useEffect(() => {
    const params = new URLSearchParams();

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    if (selectedTag) {
      params.set("tag", selectedTag);
    }

    const newUrl = params.toString() ? `/blog?${params.toString()}` : "/blog";
    router.push(newUrl, { scroll: false });
  }, [selectedCategory, selectedTag, currentPage, router]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const handlePageChange = (page: number) => {
    router.push(
      `/blog?page=${page}${
        selectedCategory ? `&category=${selectedCategory}` : ""
      }${selectedTag ? `&tag=${selectedTag}` : ""}`,
      { scroll: false }
    );
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://ken-homestay.com" },
          { name: "Blog", item: "https://ken-homestay.com/blog" },
        ]}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
              {currentArticles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <BlogCard {...article} />
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
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
                  <SidebarArticle key={article._id} {...article} />
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
                    onClick={() => handleCategoryChange(name)}
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
                    onClick={() => handleTagChange(name)}
                  >
                    {name} ({count})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
