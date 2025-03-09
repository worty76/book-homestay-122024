import { About } from "@/components/main/About";
import { Advantage } from "@/components/main/Advantage";
import { Hero } from "@/components/main/Hero";
import MonthlyChampions from "@/components/main/News";
import { Properties } from "@/components/main/Properties";
import { Testimonials } from "@/components/main/Testimonials";
import ApartmentGallery from "@/components/main/ApartmentGallery";
import ApartmentTestimonial from "@/components/main/ApartmentTestimonial";
import BlogSection from "@/components/main/blog-section";
import AboutSection from "@/components/main/about-section";
import FacilitiesGrid from "@/components/main/facilities-grid";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <Hero />
      </div>
      {/* <About /> */}
      <AboutSection />
      {/* <Advantage /> */}
      {/* <MonthlyChampions /> */}
      <ApartmentGallery />
      <ApartmentTestimonial />
      <Properties />
      <FacilitiesGrid />
      <BlogSection />
      <Testimonials />
    </>
  );
}
