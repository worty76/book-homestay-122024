import { Hero } from "@/components/main/Hero";
import { Properties } from "@/components/main/Properties";
import { Testimonials } from "@/components/main/Testimonials";
import ApartmentGallery from "@/components/main/ApartmentGallery";
import ConceptList from "@/components/main/ConceptList";
import BlogSection from "@/components/main/blog-section";
import AboutSection from "@/components/main/aboutSection";
import FacilitiesGrid from "@/components/main/facilities-grid";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <Hero />
      </div>
      <AboutSection />
      <ApartmentGallery />
      <ConceptList />
      {/* <Properties /> */}
      <FacilitiesGrid />
      <BlogSection />
      <Testimonials />
    </>
  );
}
