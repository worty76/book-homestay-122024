import FeaturedPosts from "./featured-posts";
import { Title } from "./Title";

export default function ChampionsPage() {
  return (
    <div
      id="about"
      className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: 'url("/images/testimonial-bg.png")' }}
    >
      <Title
        subtitle="Luxury"
        title="ABOUT"
        subtitleColor="text-primary"
        titleColor="text-black"
      />
      <FeaturedPosts />
    </div>
  );
}
