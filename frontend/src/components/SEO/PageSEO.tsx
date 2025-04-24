import { Metadata } from "next";
import { useTranslation } from "@/hooks/useTranslation";

type PageSEOProps = {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
  locale?: string;
};

export function generatePageMetadata({
  title,
  description,
  keywords = "",
  ogImage = "/images/og-image.jpg",
  canonical = "",
  noIndex = false,
  locale = "en_US",
}: PageSEOProps): Metadata {
  const baseUrl = "https://ken-homestay.com";
  const fullTitle = `${title} | Kén Homestay`;

  return {
    title: fullTitle,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      siteName: "Kén Homestay",
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : baseUrl,
    },
  };
}

// New component that uses the translation system
export function PageSEO({
  titleKey,
  descriptionKey,
  keywordsKey,
  ogImage = "/images/og-image.jpg",
  canonical = "",
  noIndex = false,
}: {
  titleKey: string;
  descriptionKey: string;
  keywordsKey?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}) {
  const { t, language } = useTranslation();

  // Map language to locale format
  const localeMap: Record<string, string> = {
    en: "en_US",
    vi: "vi_VN",
  };

  const metadata = generatePageMetadata({
    title: t(titleKey),
    description: t(descriptionKey),
    keywords: keywordsKey ? t(keywordsKey) : "",
    ogImage,
    canonical,
    noIndex,
    locale: localeMap[language] || "en_US",
  });

  return null; // This component doesn't render anything visible, it's for metadata only
}
