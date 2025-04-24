"use client";

import { Suspense, useEffect, useState } from "react";
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

// Create a separate component for the content that uses useSearchParams
function HomeContent() {
  return (
    <>
      <OrganizationJsonLd
        name="Kén Homestay"
        url="https://ken-homestay.com"
        logo="https://ken-homestay.com/images/logo.png"
        address="80 Main Street, City, Country"
        telephone="+1234567890"
      />
      <AccommodationJsonLd
        name="Kén Homestay"
        description="Experience luxury homestay accommodations with Kén Homestay. Book your perfect stay with premium amenities, comfortable rooms and authentic local experiences."
        image="https://ken-homestay.com/images/homestay-exterior.jpg"
        url="https://ken-homestay.com"
        priceRange="$$$"
        address="80 Le Van Hien Street, Khue My, Ngu Hanh Son, Da Nang, Vietnam"
        rating={4.8}
        reviewCount={124}
      />
      <div className="relative min-h-screen overflow-hidden">
        <Hero />
      </div>
      <AboutSection />
      <ApartmentGallery />
      <RoomList />
      <FacilitiesGrid />
      <BlogSection />
      <Testimonials />
    </>
  );
}

// Main component wrapped in Suspense
export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  // This ensures the component is hydrated properly
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading homepage...</div>
        </div>
      }
    >
      {isClient ? <HomeContent /> : null}
    </Suspense>
  );
}
