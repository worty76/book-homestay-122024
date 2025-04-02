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
      <Suspense
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="relative w-24 h-24 mb-8">
              {/* Multiple spinning circles with different speeds and opacities */}
              <div className="absolute inset-0 w-full h-full rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 w-full h-full rounded-full border-4 border-primary border-b-transparent animate-ping opacity-30 animation-delay-300"></div>
              <div className="absolute inset-2 w-20 h-20 rounded-full border-4 border-secondary border-l-transparent animate-spin animation-delay-150 animation-reverse"></div>
            </div>

            <h2 className="text-xl font-medium text-gray-700 animate-pulse">
              Loading your experience...
            </h2>

            <div className="flex space-x-1 mt-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-400"></div>
            </div>

            <p className="text-gray-500 mt-4 transition-opacity duration-500 animate-fadeIn">
              We're preparing your Ken Homestay experience
            </p>
          </div>
        }
      >
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
