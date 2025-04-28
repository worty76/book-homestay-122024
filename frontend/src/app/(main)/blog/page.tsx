"use client";

import { getPaginatedItems, getTotalPages } from "@/lib/pagination";
import AnotherHeader from "@/components/main/another-header";
import { fetchBlogs } from "@/services/blogService";
import { Blog } from "@/types/blog";
import BlogClientPage from "@/components/main/blog/BlogClientPage";
import { useTranslation } from "@/hooks/useTranslation";

const POSTS_PER_PAGE = 6;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Blog interface based on API response
export interface BlogArticle extends Blog {
  imageUrl?: string; // Additional field for compatibility with existing components
}

// Fetch all blogs from API
async function getAllArticles(): Promise<BlogArticle[]> {
  try {
    const blogs = await fetchBlogs();
    // Map to ensure compatibility with existing components
    return blogs.map((blog) => ({
      ...blog,
      imageUrl: blog.image
        ? blog.image.startsWith("http")
          ? blog.image
          : `${API_URL}${blog.image.startsWith("/") ? "" : "/"}${blog.image}`
        : "/images/placeholder.jpg", // Map image to imageUrl with proper URL construction
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// Get recent articles
function getRecentArticles(
  articles: BlogArticle[],
  count: number
): BlogArticle[] {
  return [...articles]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, count);
}

// Get all categories
function getAllCategories(
  articles: BlogArticle[]
): { name: string; count: number }[] {
  const categories = articles.reduce((acc, article) => {
    const category = article.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categories).map(([name, count]) => ({ name, count }));
}

// Get all tags
function getAllTags(
  articles: BlogArticle[]
): { name: string; count: number }[] {
  const tags = articles.reduce((acc, article) => {
    if (article.tags) {
      article.tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = 0;
        }
        acc[tag]++;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tags).map(([name, count]) => ({ name, count }));
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; tag?: string };
}) {
  const { t } = useTranslation();
  const currentPage = Number(searchParams.page) || 1;
  const selectedCategory = searchParams.category || null;
  const selectedTag = searchParams.tag || null;

  // Fetch data from API
  const allArticles = await getAllArticles();
  const featuredArticles = getRecentArticles(allArticles, 4);
  const categories = getAllCategories(allArticles);
  const tags = getAllTags(allArticles);

  // Filter articles based on selected category and tag
  let filteredArticles = allArticles;
  if (selectedCategory) {
    filteredArticles = filteredArticles.filter(
      (article) => (article.category || "") === selectedCategory
    );
  }
  if (selectedTag) {
    filteredArticles = filteredArticles.filter((article) =>
      article.tags?.includes(selectedTag)
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
        subtitle={t("blog.title")}
        description={t("blog.subtitle")}
        image="/images/3DKENHOME/floor1/09.png"
        finalPage={t("blog.pageComponents.finalPage")}
      />

      <BlogClientPage
        currentArticles={currentArticles}
        featuredArticles={featuredArticles}
        categories={categories}
        tags={tags}
        currentPage={currentPage}
        totalPages={totalPages}
        selectedCategory={selectedCategory}
        selectedTag={selectedTag}
      />
    </div>
  );
}
