"use client";

import { useEffect, useState } from "react";

type OrganizationProps = {
  name: string;
  url: string;
  logo: string;
  address?: string;
  telephone?: string;
};

type AccommodationProps = {
  name: string;
  description: string;
  image: string;
  url: string;
  priceRange: string;
  address: string;
  rating?: number;
  reviewCount?: number;
};

type BreadcrumbItemProps = {
  name: string;
  item: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItemProps[];
};

type ArticleProps = {
  title: string;
  description: string;
  images: string[];
  authorName: string;
  publisherName: string;
  publisherLogo: string;
  datePublished: string;
  dateModified?: string;
  url: string;
};

export const OrganizationJsonLd = ({
  name,
  url,
  logo,
  address,
  telephone,
}: OrganizationProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    ...(address && {
      address: { "@type": "PostalAddress", streetAddress: address },
    }),
    ...(telephone && { telephone }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export const AccommodationJsonLd = ({
  name,
  description,
  image,
  url,
  priceRange,
  address,
  rating,
  reviewCount,
}: AccommodationProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name,
    description,
    image,
    url,
    priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
    },
    ...(rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating,
        reviewCount: reviewCount || 0,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export const BreadcrumbJsonLd = ({ items }: BreadcrumbProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.item,
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export const ArticleJsonLd = ({
  title,
  description,
  images,
  authorName,
  publisherName,
  publisherLogo,
  datePublished,
  dateModified,
  url,
}: ArticleProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: images,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: publisherLogo,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
