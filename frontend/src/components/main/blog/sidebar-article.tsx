import Link from "next/link";
import Image from "next/image";
import { BlogArticle } from "@/data/blogs";

export default function SidebarArticle({
  slug,
  title,
  coverImage,
  date,
}: BlogArticle) {
  return (
    <Link href={`/blog/${slug}`} className="flex gap-4 group">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="96px"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium line-clamp-2 group-hover:text-[#5a8d69] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(date).toLocaleDateString("vi-VN")}
        </p>
      </div>
    </Link>
  );
}
