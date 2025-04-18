import Link from "next/link";
import Image from "next/image";
import { BlogArticle } from "@/app/(main)/blog/page";
import { useTranslation } from "@/hooks/useTranslation";

export default function SidebarArticle({
  _id,
  title,
  imageUrl,
  createdAt,
}: BlogArticle) {
  const { language } = useTranslation();

  // Create a slug from the ID
  const slug = _id;

  // Use language-specific date format
  const dateFormat = language === "en" ? "en-US" : "vi-VN";

  return (
    <Link href={`/blog/${slug}`} className="flex gap-4 group h-24">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={imageUrl || "/images/placeholder.jpg"}
          alt={title}
          fill
          sizes="96px"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="font-medium line-clamp-2 group-hover:text-[#5a8d69] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(createdAt).toLocaleDateString(dateFormat)}
        </p>
      </div>
    </Link>
  );
}
