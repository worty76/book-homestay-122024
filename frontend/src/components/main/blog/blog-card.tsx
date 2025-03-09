import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"

interface BlogCardProps {
  title: string
  date: string
  description: string
  image: string
  slug: string
}

export default function BlogCard({ title, date, description, image, slug }: BlogCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h2 className="text-xl font-semibold mb-2 group-hover:text-[#ff5533] transition-colors">{title}</h2>
      </Link>
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
        <Calendar className="w-4 h-4" />
        <time>{date}</time>
      </div>
      <p className="text-gray-600 line-clamp-2">{description}</p>
    </article>
  )
}

