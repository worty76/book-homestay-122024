import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogArticle } from "@/app/(main)/blog/page";
import ViewCounter from "@/components/blog/ViewCounter";
import { getCurrentUserId } from "@/services/userService";
import { useTranslation } from "@/hooks/useTranslation";

export default function BlogCard({
  _id,
  title,
  content,
  imageUrl,
  createdAt,
  category,
  tags,
  views,
  likes,
}: BlogArticle) {
  const { t, language } = useTranslation();
  const [currentUserId, setCurrentUserId] = useState<string>("");

  // Get current user ID on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUserId(getCurrentUserId());
    }
  }, []);

  // Create a slug from the title if not available
  const slug = _id;
  const excerpt = content.substring(0, 150) + "...";

  const dateFormat = language === "en" ? "en-US" : "vi-VN";

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <Link href={`/blog/${slug}`} className="flex flex-col h-full">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={imageUrl || "/images/placeholder.jpg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-4 mb-3">
            <Badge variant="secondary" className="whitespace-nowrap">
              {category}
            </Badge>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="whitespace-nowrap">
                {new Date(createdAt).toLocaleDateString(dateFormat)}
              </span>
            </div>
            {views !== undefined && <ViewCounter count={views} size="sm" />}
          </div>
          <h3 className="font-bold text-xl mb-2 line-clamp-2 hover:text-[#5a8d69] transition-colors h-14">
            {title}
          </h3>
          <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">{excerpt}</p>
          <div className="flex flex-wrap justify-between items-center mt-auto">
            <div className="flex flex-wrap gap-2">
              {tags &&
                tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
            </div>
            {/* 
            <div className="mt-2" onClick={(e) => e.preventDefault()}>
              <LikeButton
                blogId={_id}
                initialLikes={likes?.count || 0}
                isLiked={likes?.users?.includes(currentUserId)}
                size="sm"
              />
            </div> */}
          </div>
        </div>
      </Link>
    </article>
  );
}
