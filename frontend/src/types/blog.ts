export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  imageUrl?: string; // For backward compatibility
  category?: string;
  tags?: string[];
  views: number;
  likes?: {
    count: number;
    users?: string[];
  };
  averageRating?: number;
  ratings?: {
    user: string;
    rating: number;
    comment?: string;
    date: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogCardProps {
  blog: Blog;
}

export interface BlogListProps {
  blogs: Blog[];
}

export interface BlogDetailProps {
  blog: Blog;
}
