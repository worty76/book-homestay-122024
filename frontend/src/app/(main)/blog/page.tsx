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
import { generatePageMetadata } from "@/components/SEO/PageSEO";
import BlogClientPage from "@/components/main/blog/BlogClientPage";

const POSTS_PER_PAGE = 6;

export const metadata = generatePageMetadata({
  title: "Blog - Latest Articles and Stories",
  description:
    "Discover articles about culture, travel, and lifestyle in Vietnam. Get insights, tips, and inspiration for your next adventure.",
  keywords:
    "blog, articles, travel tips, Vietnam culture, lifestyle, homestay blog",
  canonical: "/blog",
});

export default function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; tag?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const selectedCategory = searchParams.category || null;
  const selectedTag = searchParams.tag || null;

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
