import Image from "next/image"
import Link from "next/link"

interface SidebarArticleProps {
  title: string
  date: string
  image: string
  slug: string
}

export default function SidebarArticle({ title, date, image, slug }: SidebarArticleProps) {
  return (
    <article className="group flex gap-4">
      <Link href={`/blog/${slug}`} className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex-1">
        <time className="text-sm text-gray-500 mb-1 block">{date}</time>
        <Link href={`/blog/${slug}`}>
          <h3 className="font-medium leading-snug group-hover:text-[#ff5533] transition-colors">{title}</h3>
        </Link>
      </div>
    </article>
  )
}

