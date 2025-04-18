"use client";

import { useEffect, useState } from "react";
import React from "react";

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

// Base Organization Data
interface OrganizationJsonLdProps {
  name: string;
  url: string;
  logo: string;
  address: string;
  telephone: string;
}

// Accommodation Data
interface AccommodationJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
  priceRange: string;
  address: string;
  rating?: number;
  reviewCount?: number;
}

// Article Data
interface ArticleJsonLdProps {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  authorName: string;
  authorUrl?: string;
  image: string;
  url: string;
}

// Event Data
interface EventJsonLdProps {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
  };
  image: string;
  url: string;
  offers?: {
    price: number;
    currency: string;
    availability: "InStock" | "SoldOut" | "PreOrder";
  };
}

// FAQ Data
interface FAQJsonLdProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

// BreadcrumbList Data
interface BreadcrumbJsonLdProps {
  itemListElements: {
    position: number;
    name: string;
    item: string;
  }[];
}

// Organization schema
export function OrganizationJsonLd({
  name,
  url,
  logo,
  address,
  telephone,
}: OrganizationJsonLdProps) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: name,
    url: url,
    logo: logo,
    address: address,
    telephone: telephone,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
    />
  );
}

// Accommodation/Hotel schema
export function AccommodationJsonLd({
  name,
  description,
  image,
  url,
  priceRange,
  address,
  rating,
  reviewCount,
}: AccommodationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: name,
    description: description,
    image: image,
    url: url,
    priceRange: priceRange,
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article schema
export function ArticleJsonLd({
  title,
  description,
  publishedTime,
  modifiedTime,
  authorName,
  authorUrl,
  image,
  url,
}: ArticleJsonLdProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Ken Homestay",
      logo: {
        "@type": "ImageObject",
        url: "https://ken-homestay.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

// Event schema
export function EventJsonLd({
  name,
  description,
  startDate,
  endDate,
  location,
  image,
  url,
  offers,
}: EventJsonLdProps) {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    location: {
      "@type": "Place",
      name: location.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.address,
      },
    },
    image: image,
    url: url,
    ...(offers && {
      offers: {
        "@type": "Offer",
        price: offers.price,
        priceCurrency: offers.currency,
        availability: `https://schema.org/${offers.availability}`,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
    />
  );
}

// FAQ schema
export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

// BreadcrumbList schema
export function BreadcrumbJsonLd({ itemListElements }: BreadcrumbJsonLdProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemListElements.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
