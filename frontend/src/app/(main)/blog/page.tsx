import { getPaginatedItems, getTotalPages } from "@/lib/pagination";
import BlogCard from "@/components/main/blog/blog-card";
import SidebarArticle from "@/components/main/blog/sidebar-article";
import BlogPagination from "@/components/main/blog/blog-pagination";
import AnotherHeader from "@/components/main/another-header";
import { Badge } from "@/components/ui/badge";
import { generatePageMetadata } from "@/components/SEO/PageSEO";
import BlogClientPage from "@/components/main/blog/BlogClientPage";
import axios from "axios";

const POSTS_PER_PAGE = 6;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const metadata = generatePageMetadata({
  title: "Blog - Latest Articles and Stories",
  description:
    "Discover articles about culture, travel, and lifestyle in Vietnam. Get insights, tips, and inspiration for your next adventure.",
  keywords:
    "blog, articles, travel tips, Vietnam culture, lifestyle, homestay blog",
  canonical: "/blog",
});

// Blog interface based on API response
export interface BlogArticle {
  _id: string;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  category: string;
  tags: string[];
  ratings?: {
    user: string;
    rating: number;
    comment: string;
  }[];
  averageRating?: number;
  likes?: string[];
  views?: number;
  createdAt: string;
  updatedAt: string;
}

// Fetch all blogs from API
async function getAllArticles(): Promise<BlogArticle[]> {
  try {
    const response = await axios.get(`${API_URL}/api/v1/blog`);
    return response.data;
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
    const category = article.category;
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
        subtitle="Bài viết của chúng tôi"
        description="Khám phá những câu chuyện về văn hóa, du lịch và phong cách sống tại Việt Nam"
        image="/images/img3.jpg"
        finalPage="Bài viết"
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
