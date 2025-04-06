"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Tag,
  User,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getArticleBySlug,
  getRelatedArticles,
  BlogArticle,
} from "@/data/blogs";
import AnotherHeader from "@/components/main/another-header";

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchedArticle = getArticleBySlug(params.slug);

    if (fetchedArticle) {
      setArticle(fetchedArticle);
      const related = getRelatedArticles(params.slug, 3);
      setRelatedArticles(related);
    }

    setIsLoading(false);
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Bài viết không tồn tại</h1>
        <p className="mb-8">
          Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Button variant="outline" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại trang blog
          </Link>
        </Button>
      </div>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const wordCount = article.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <>
      <AnotherHeader
        subtitle={article.title}
        description={article.excerpt}
        image={article.coverImage}
        finalPage="Bài viết"
        detailPage={article.title}
      />

      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#5a8d69] hover:underline"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Quay lại trang blog
            </Link>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Article metadata */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{readingTime} phút đọc</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{article.author}</span>
              </div>
            </div>

            {/* Article content */}
            <div className="prose prose-lg max-w-none">
              {article.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[#5a8d69]">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author box */}
            <div className="mt-12 bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row gap-6 items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src="/images/placeholder.jpg"
                  alt={article.author}
                />
                <AvatarFallback>{article.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold mb-2">{article.author}</h3>
                <p className="text-gray-600">
                  Tác giả của nhiều bài viết về văn hóa, du lịch và lối sống tại
                  Việt Nam.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8 text-center">
                Bài viết liên quan
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <motion.article
                    key={relatedArticle.slug}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href={`/blog/${relatedArticle.slug}`}>
                      <div className="relative h-48">
                        <Image
                          src={relatedArticle.coverImage}
                          alt={relatedArticle.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                          priority={false}
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
