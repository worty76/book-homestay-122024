import { Blog } from "@/types/blog";

export const blogs: Blog[] = [
  {
    _id: "1",
    title: "Top 10 Homestay Experiences in Vietnam",
    content: `Vietnam offers an incredible array of homestay experiences that allow travelers to immerse themselves in local culture. From the terraced rice fields of Sapa to the vibrant streets of Hoi An, homestays provide an authentic glimpse into Vietnamese life.

    When choosing a homestay, consider what type of experience you're looking for. Mountain retreats offer peaceful settings and opportunities to learn about ethnic minority cultures, while urban homestays allow you to experience city life like a local.

    In Sapa, many homestays are operated by H'mong or Red Dao families, where you can learn traditional crafts and agricultural techniques. In the Mekong Delta, homestays often include boat trips through floating markets and fruit orchards.

    Coastal homestays in places like Phu Quoc or Da Nang combine beach relaxation with culinary experiences, often featuring fresh seafood prepared by your hosts.`,
    author: "Nguyen Van Anh",
    image: "/images/blog/homestay-vietnam.jpg",
    category: "Travel Tips",
    tags: ["homestay", "vietnam", "travel", "accommodation"],
    views: 1245,
    likes: {
      count: 87,
      users: [],
    },
    ratings: [
      {
        user: "user123",
        rating: 5,
        comment: "Great article with useful tips!",
        date: "2023-04-10T07:51:21.345Z",
      },
    ],
    averageRating: 4.8,
    createdAt: "2023-04-10T07:51:21.345Z",
    updatedAt: "2023-04-10T07:51:21.345Z",
  },
  {
    _id: "2",
    title: "How to Choose the Perfect Homestay for Your Trip",
    content: `Choosing the right homestay can make or break your travel experience. Here are some factors to consider when making your selection.

    First, consider the location. Do you want to be in the heart of a city, or in a more remote, peaceful setting? Think about what activities you plan to do and how accessible they are from your potential homestay.

    Next, read reviews carefully. Look for comments about cleanliness, host communication, and accuracy of the listing description. Photos can be misleading, so reviews from previous guests are invaluable.

    Consider what type of cultural experience you're seeking. Some homestays offer a very immersive experience where you'll share meals and activities with your host family. Others provide more privacy and independence.

    Don't forget to check what amenities are important to you. Do you need reliable Wi-Fi? Air conditioning? Private bathroom? Make sure the homestay can meet your basic comfort needs.`,
    author: "Tran Minh Duc",
    image: "/images/blog/choose-homestay.jpg",
    category: "Travel Tips",
    tags: ["homestay", "booking tips", "accommodation", "travel planning"],
    views: 982,
    likes: {
      count: 65,
      users: [],
    },
    ratings: [
      {
        user: "user456",
        rating: 4,
        comment: "Helpful guide for first-time homestay guests",
        date: "2023-05-15T10:32:45.678Z",
      },
    ],
    averageRating: 4.5,
    createdAt: "2023-05-15T10:32:45.678Z",
    updatedAt: "2023-05-15T10:32:45.678Z",
  },
  {
    _id: "3",
    title: "The Rise of Eco-Friendly Homestays",
    content: `Sustainable travel is becoming increasingly important, and eco-friendly homestays are leading the way in responsible tourism. These accommodations focus on minimizing environmental impact while maximizing positive contributions to local communities.

    Eco-friendly homestays often feature solar power, rainwater harvesting, composting systems, and organic gardens. Many use locally-sourced, natural building materials and implement waste reduction strategies.

    Beyond environmental practices, these homestays typically support local economies by employing local staff, sourcing food from nearby farmers, and promoting local artisans and businesses.

    Staying at an eco-friendly homestay allows travelers to reduce their carbon footprint while enjoying unique, authentic experiences. Many offer activities like organic farming workshops, traditional craft lessons, and guided nature walks that highlight the importance of environmental conservation.`,
    author: "Le Thi Huong",
    image: "/images/blog/eco-homestay.jpg",
    category: "Sustainable Travel",
    tags: [
      "eco-friendly",
      "sustainable travel",
      "green accommodation",
      "responsible tourism",
    ],
    views: 756,
    likes: {
      count: 94,
      users: [],
    },
    ratings: [
      {
        user: "user789",
        rating: 5,
        comment: "Love these eco-friendly options!",
        date: "2023-06-20T14:25:33.789Z",
      },
    ],
    averageRating: 4.7,
    createdAt: "2023-06-20T14:25:33.789Z",
    updatedAt: "2023-06-20T14:25:33.789Z",
  },
];

export interface BlogArticle {
  title: string;
  slug: string;
  author: string;
  date: string;
  coverImage: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
}

const articles: BlogArticle[] = [
  {
    title: "Khám phá ẩm thực địa phương tại Đà Nẵng",
    slug: "kham-pha-am-thuc-dia-phuong-tai-da-nang",
    author: "Nguyễn Minh Tuấn",
    date: "2023-09-15",
    coverImage: "/images/view/1.png",
    excerpt:
      "Trải nghiệm hương vị đặc sắc của các món ăn đường phố và nhà hàng nổi tiếng tại Đà Nẵng.",
    content:
      "Đà Nẵng không chỉ nổi tiếng với bãi biển đẹp, cầu Rồng và núi Ngũ Hành Sơn mà còn có nền ẩm thực phong phú đa dạng. Từ mì Quảng, bánh xèo đến hải sản tươi ngon, mỗi món ăn đều mang đậm hương vị đặc trưng của miền Trung Việt Nam...",
    tags: ["ẩm thực", "du lịch", "đà nẵng"],
    category: "Du lịch",
  },
  {
    title: "5 điểm tham quan không thể bỏ qua ở Hội An",
    slug: "5-diem-tham-quan-khong-the-bo-qua-o-hoi-an",
    author: "Trần Thị Mai Anh",
    date: "2023-10-21",
    coverImage: "/images/view/2.png",
    excerpt:
      "Khám phá vẻ đẹp cổ kính của phố cổ Hội An và những địa điểm du lịch nổi tiếng.",
    content:
      "Hội An - thành phố cổ nằm ở tỉnh Quảng Nam được UNESCO công nhận là Di sản Văn hóa Thế giới. Với kiến trúc độc đáo pha trộn nhiều nền văn hóa, Hội An thu hút du khách bởi vẻ đẹp thanh bình và trầm mặc...",
    tags: ["hội an", "di sản", "du lịch"],
    category: "Du lịch",
  },
  {
    title: "Trang trí phòng khách với phong cách Việt Nam hiện đại",
    slug: "trang-tri-phong-khach-voi-phong-cach-viet-nam-hien-dai",
    author: "Lê Văn Hoàng",
    date: "2023-11-10",
    coverImage: "/images/view/3.png",
    excerpt:
      "Cách kết hợp yếu tố truyền thống và hiện đại trong trang trí nhà cửa.",
    content:
      "Phong cách thiết kế nội thất Việt Nam hiện đại đang ngày càng được ưa chuộng. Đây là sự kết hợp hài hòa giữa những giá trị văn hóa truyền thống với lối sống hiện đại, tạo nên không gian sống vừa quen thuộc vừa mới mẻ...",
    tags: ["thiết kế", "nội thất", "việt nam"],
    category: "Thiết kế",
  },
  {
    title: "Bí quyết du lịch tiết kiệm tại miền Trung Việt Nam",
    slug: "bi-quyet-du-lich-tiet-kiem-tai-mien-trung-viet-nam",
    author: "Phạm Thanh Hà",
    date: "2023-12-05",
    coverImage: "/images/view/4.png",
    excerpt:
      "Kinh nghiệm du lịch tiết kiệm chi phí nhưng vẫn trọn vẹn trải nghiệm.",
    content:
      "Miền Trung Việt Nam với nhiều danh lam thắng cảnh và di sản văn hóa thu hút đông đảo du khách. Tuy nhiên, không phải ai cũng có ngân sách dồi dào cho chuyến đi. Bài viết này sẽ chia sẻ những bí quyết giúp bạn có chuyến du lịch tiết kiệm nhưng vẫn đầy đủ trải nghiệm...",
    tags: ["du lịch", "tiết kiệm", "miền trung"],
    category: "Du lịch",
  },
  {
    title: "Các loại cây trồng trong nhà mang lại may mắn",
    slug: "cac-loai-cay-trong-trong-nha-mang-lai-may-man",
    author: "Trần Minh Đức",
    date: "2024-01-18",
    coverImage: "/images/view/5.png",
    excerpt:
      "Những loại cây cảnh không chỉ làm đẹp không gian sống mà còn mang ý nghĩa phong thủy tốt.",
    content:
      "Việc trồng cây xanh trong nhà không chỉ giúp làm đẹp không gian sống, tạo không khí trong lành mà theo quan niệm phong thủy, một số loại cây còn mang lại may mắn, tài lộc cho gia chủ...",
    tags: ["cây cảnh", "phong thủy", "trang trí"],
    category: "Lifestyle",
  },
  {
    title: "Trải nghiệm homestay tại làng quê Việt Nam",
    slug: "trai-nghiem-homestay-tai-lang-que-viet-nam",
    author: "Lê Hoàng Nam",
    date: "2024-02-22",
    coverImage: "/images/view/6.png",
    excerpt:
      "Khám phá cuộc sống thôn quê Việt Nam thông qua mô hình homestay độc đáo.",
    content:
      "Xu hướng homestay đang ngày càng phát triển tại Việt Nam, đặc biệt là những homestay mang đậm nét văn hóa làng quê. Đây không chỉ là nơi lưu trú mà còn là cơ hội để du khách trải nghiệm cuộc sống thường ngày của người dân địa phương...",
    tags: ["homestay", "làng quê", "trải nghiệm"],
    category: "Du lịch",
  },
];

export function getAllArticles(): BlogArticle[] {
  return articles;
}

export function getSortedArticles(): BlogArticle[] {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getRecentArticles(count: number = 6): BlogArticle[] {
  return getSortedArticles().slice(0, count);
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string): BlogArticle[] {
  return articles.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
}

export function getArticlesByTag(tag: string): BlogArticle[] {
  return articles.filter((article) =>
    article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getRelatedArticles(
  slug: string,
  count: number = 3
): BlogArticle[] {
  const currentArticle = getArticleBySlug(slug);

  if (!currentArticle) return [];

  const relatedByCategory = articles.filter(
    (article) =>
      article.slug !== slug && article.category === currentArticle.category
  );

  const relatedByTags = articles.filter(
    (article) =>
      article.slug !== slug &&
      article.category !== currentArticle.category &&
      article.tags.some((tag) => currentArticle.tags.includes(tag))
  );

  const related = [...relatedByCategory, ...relatedByTags];
  const uniqueRelated = related.filter(
    (article, index, self) =>
      index === self.findIndex((a) => a.slug === article.slug)
  );

  return uniqueRelated.slice(0, count);
}

export function getAllCategories(): { name: string; count: number }[] {
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

export function getAllTags(): { name: string; count: number }[] {
  const tags = articles.reduce((acc, article) => {
    article.tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = 0;
      }
      acc[tag]++;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tags).map(([name, count]) => ({ name, count }));
}
