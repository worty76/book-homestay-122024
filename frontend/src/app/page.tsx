import { About } from "@/components/LandingPage/About";
import { Advantage } from "@/components/LandingPage/Advantage";
import { Amenities } from "@/components/LandingPage/Amentities";
import { BookingForm } from "@/components/LandingPage/Booking";
import { Footer } from "@/components/LandingPage/Footer";
import { Header } from "@/components/LandingPage/Header";
import { Hero } from "@/components/LandingPage/Hero";
import { ImageGallery } from "@/components/LandingPage/ImageGallery";
import { Pricing } from "@/components/LandingPage/Pricing";
import { Testimonials } from "@/components/LandingPage/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Advantage />
        <Amenities />
        <Pricing />
        <ImageGallery />
        <Testimonials />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
