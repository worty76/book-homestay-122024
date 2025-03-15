"use client";

import { useState } from "react";
import BlogCard from "@/components/main/blog/blog-card";
import SidebarArticle from "@/components/main/blog/sidebar-article";
import BlogPagination from "@/components/main/blog/blog-pagination";
import { articles, recentArticles } from "@/data/blogs";
import { getPaginatedItems, getTotalPages } from "@/lib/pagination";
import { Pagination } from "@/components/ui/pagination";
import AnotherHeader from "@/components/main/another-header";

// Number of articles to show per page
const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = getTotalPages(articles.length, POSTS_PER_PAGE);

  // Get current page articles
  const currentArticles = getPaginatedItems(
    articles,
    currentPage,
    POSTS_PER_PAGE
  );

  return (
    <>
      <AnotherHeader title="Bài viết" description="" image="/images/img4.jpg" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6 pb-2 border-b">
              Bài viết mới nhất
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {currentArticles.map((article, index) => (
                <BlogCard key={index} {...article} />
              ))}
            </div>

            {/* Pagination */}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-8"
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
                Bài viết dành cho bạn
              </h2>
              <div className="space-y-6">
                {recentArticles.map((article, index) => (
                  <SidebarArticle key={index} {...article} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
