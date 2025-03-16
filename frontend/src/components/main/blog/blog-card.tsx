import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogArticle } from "@/data/blogs";

export default function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  date,
  category,
  tags,
}: BlogArticle) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/blog/${slug}`}>
        <div className="relative aspect-[16/9]">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-3">
            <Badge variant="secondary">{category}</Badge>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(date).toLocaleDateString("vi-VN")}
            </div>
          </div>
          <h3 className="font-bold text-xl mb-2 line-clamp-2 hover:text-[#5a8d69] transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 line-clamp-3 mb-4">{excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
