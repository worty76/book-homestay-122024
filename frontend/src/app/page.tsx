import { About } from "@/components/main/About";
import { Advantage } from "@/components/main/Advantage";
import { Hero } from "@/components/main/Hero";
import { MonthlyChampions } from "@/components/main/News";
import { Properties } from "@/components/main/Properties";
import { Testimonials } from "@/components/main/Testimonials";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <Hero />
      </div>
      <About />
      <Advantage />
      <Properties />
      <MonthlyChampions />
      <Testimonials />
    </>
  );
}
