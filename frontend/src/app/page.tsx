import { Hero } from "@/components/main/Hero";
import { Testimonials } from "@/components/main/Testimonials";
import ApartmentGallery from "@/components/main/ApartmentGallery";
import BlogSection from "@/components/main/blog-section";
import AboutSection from "@/components/main/aboutSection";
import FacilitiesGrid from "@/components/main/facilities-grid";
// import RoomList from "@/components/main/roomList";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <Hero />
      </div>
      <AboutSection />
      <ApartmentGallery />
      {/* <RoomList /> */}
      <FacilitiesGrid />
      <BlogSection />
      <Testimonials />
    </>
  );
}
