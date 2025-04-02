"use client";

import { useEffect, useState, Suspense } from "react";
import { Hero } from "@/components/main/Hero";
import { Testimonials } from "@/components/main/Testimonials";
import ApartmentGallery from "@/components/main/ApartmentGallery";
import BlogSection from "@/components/main/blog-section";
import AboutSection from "@/components/main/aboutSection";
import FacilitiesGrid from "@/components/main/facilities-grid";
import RoomList from "@/components/main/roomList";
import {
  OrganizationJsonLd,
  AccommodationJsonLd,
} from "@/components/SEO/JsonLd";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd
        name="Ken Homestay"
        url="https://ken-homestay.com"
        logo="https://ken-homestay.com/images/logo.png"
        address="123 Main Street, City, Country"
        telephone="+1234567890"
      />
      <AccommodationJsonLd
        name="Ken Homestay"
        description="Experience luxury homestay accommodations with Ken Homestay. Book your perfect stay with premium amenities, comfortable rooms and authentic local experiences."
        image="https://ken-homestay.com/images/homestay-exterior.jpg"
        url="https://ken-homestay.com"
        priceRange="$$$"
        address="123 Main Street, City, Country"
        rating={4.8}
        reviewCount={124}
      />
      <Suspense fallback={<></>}>
        <div className="relative min-h-screen overflow-hidden">
          <Hero />
        </div>
        <AboutSection />
        <ApartmentGallery />
        <RoomList />
        <FacilitiesGrid />
        <BlogSection />
        <Testimonials />
      </Suspense>
    </>
  );
}
