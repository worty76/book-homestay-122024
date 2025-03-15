import { Hero } from "@/components/main/Hero";
import { Properties } from "@/components/main/Properties";
import { Testimonials } from "@/components/main/Testimonials";
import ApartmentGallery from "@/components/main/ApartmentGallery";
import ApartmentTestimonial from "@/components/main/ConceptList";
import BlogSection from "@/components/main/blog-section";
import AboutSection from "@/components/main/aboutSection";
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
      {/* <Properties /> */}
      <FacilitiesGrid />
      <BlogSection />
      <Testimonials />
    </>
  );
}
