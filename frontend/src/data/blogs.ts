// Define interfaces
export interface Article {
  title: string;
  date: string;
  description?: string;
  image: string;
  slug: string;
}

export interface MainArticle extends Article {
  description: string;
}

export interface SidebarArticle extends Article {
  // Sidebar articles don't need any additional properties currently
  // but might have different requirements in the future
}

// Main articles data
export const articles: MainArticle[] = [
  {
    title: "Các phòng có deal tốt nhất hiện tại",
    date: "03/02/2025",
    description:
      "Nhiều phòng có deal tốt nhất hiện tại, hãy cùng khám phá những phòng đang có deal tốt nhất hiện tại.",
    image: "/images/view/1.png",
    slug: "cac-phong-co-deal-tot-nhat-hien-tai",
  },
  {
    title: "Các phòng có deal tốt nhất hiện tại",
    date: "03/02/2025",
    description:
      "Nhiều phòng có deal tốt nhất hiện tại, hãy cùng khám phá những phòng đang có deal tốt nhất hiện tại.",
    image: "/images/view/1.png",
    slug: "cac-phong-co-deal-tot-nhat-hien-tai",
  },
  {
    title: "Các phòng có deal tốt nhất hiện tại",
    date: "03/02/2025",
    description:
      "Nhiều phòng có deal tốt nhất hiện tại, hãy cùng khám phá những phòng đang có deal tốt nhất hiện tại.",
    image: "/images/view/1.png",
    slug: "cac-phong-co-deal-tot-nhat-hien-tai",
  },
  {
    title: "Các phòng có deal tốt nhất hiện tại",
    date: "03/02/2025",
    description:
      "Nhiều phòng có deal tốt nhất hiện tại, hãy cùng khám phá những phòng đang có deal tốt nhất hiện tại.",
    image: "/images/view/1.png",
    slug: "cac-phong-co-deal-tot-nhat-hien-tai",
  },
  {
    title: "Các phòng có deal tốt nhất hiện tại",
    date: "03/02/2025",
    description:
      "Nhiều phòng có deal tốt nhất hiện tại, hãy cùng khám phá những phòng đang có deal tốt nhất hiện tại.",
    image: "/images/view/1.png",
    slug: "cac-phong-co-deal-tot-nhat-hien-tai",
  },
  {
    title: "Các phòng có deal tốt nhất hiện tại",
    date: "03/02/2025",
    description:
      "Nhiều phòng có deal tốt nhất hiện tại, hãy cùng khám phá những phòng đang có deal tốt nhất hiện tại.",
    image: "/images/view/1.png",
    slug: "cac-phong-co-deal-tot-nhat-hien-tai",
  },
];

// Recent/sidebar articles data
export const recentArticles: SidebarArticle[] = [
  {
    title: "Danh sách các phòng tốt nhất",
    date: "19/11/2024",
    image: "/images/img1.jpg",
    slug: "great-wall-china",
  },
  {
    title: "Danh sách các phòng đẹp nhất nhất",
    date: "10/10/2024",
    image: "/images/img2.jpg",
    slug: "kyoto-temples",
  },
  {
    title: "Danh sách các phòng tốt nhất",
    date: "07/11/2024",
    image: "/images/img3.jpg",
    slug: "santorini-greece",
  },
];

// Utility functions for blog data
export const getSortedArticles = (articleList: Article[]): Article[] => {
  return [...articleList].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// Get article by slug
export const getArticleBySlug = (slug: string): MainArticle | undefined => {
  return articles.find((article) => article.slug === slug);
};

// Get related articles (excludes the current article)
export const getRelatedArticles = (
  currentSlug: string,
  limit: number = 3
): MainArticle[] => {
  return articles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, limit);
};
