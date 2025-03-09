import BlogCard from "@/components/main/blog/blog-card";
import Pagination from "@/components/main/blog/pagination";
import SidebarArticle from "@/components/main/blog/sidebar-article";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const articles = [
  {
    title: "Exploring the Great Wall of China",
    date: "Mar 07, 2025",
    description:
      "Walk along the ancient Great Wall and uncover China's rich history and breathtaking landscapes.",
    image: "/placeholder.svg?height=400&width=600",
    slug: "great-wall-china",
  },
  {
    title: "A Journey Through Kyoto's Temples",
    date: "Mar 07, 2025",
    description:
      "Experience the serenity of Kyoto's ancient temples, where tradition meets nature's beauty.",
    image: "/placeholder.svg?height=400&width=600",
    slug: "kyoto-temples",
  },
  {
    title: "Santorini: The Gem of the Aegean",
    date: "Mar 07, 2025",
    description:
      "Discover the white-washed beauty of Santorini, Greece, and its stunning sunset views.",
    image: "/placeholder.svg?height=400&width=600",
    slug: "santorini-greece",
  },
  {
    title: "Paris in Spring: A Dreamy Getaway",
    date: "Mar 07, 2025",
    description:
      "Explore Paris in the spring, with blooming gardens, charming streets, and the iconic Eiffel Tower.",
    image: "/placeholder.svg?height=400&width=600",
    slug: "paris-spring",
  },
  {
    title: "Venice: The City of Canals",
    date: "Mar 07, 2025",
    description:
      "Drift through the charming canals of Venice and experience the romance of Italy's floating city.",
    image: "/placeholder.svg?height=400&width=600",
    slug: "venice-canals",
  },
  {
    title: "Swiss Alps Adventure: A Winter Wonderland",
    date: "Mar 07, 2025",
    description:
      "Embark on a breathtaking journey through the Swiss Alps, a paradise for skiers and nature lovers.",
    image: "/placeholder.svg?height=400&width=600",
    slug: "swiss-alps",
  },
];

const recentArticles = [
  {
    title: "Exploring the Great Wall of China",
    date: "Nov 19, 2024",
    image: "/placeholder.svg?height=100&width=150",
    slug: "great-wall-china",
  },
  {
    title: "A Journey Through Kyoto's Temples",
    date: "Oct 10, 2024",
    image: "/placeholder.svg?height=100&width=150",
    slug: "kyoto-temples",
  },
  {
    title: "Santorini: The Gem of the Aegean",
    date: "Oct 07, 2024",
    image: "/placeholder.svg?height=100&width=150",
    slug: "santorini-greece",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6 pb-2 border-b">
            Newest articles
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {articles.map((article, index) => (
              <BlogCard key={index} {...article} />
            ))}
          </div>

          <Pagination />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Search</h2>
            <div className="relative">
              <Input
                type="text"
                placeholder="Keyword search"
                className="pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
              Articles for you
            </h2>
            <div className="space-y-6">
              {recentArticles.map((article, index) => (
                <SidebarArticle key={index} {...article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
