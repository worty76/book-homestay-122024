import Image from "next/image";
import { Title } from "./title";

const images = [
  {
    src: "/images/image7.svg",
    alt: "Kitchen area with brick walls and wooden cabinets",
  },
  {
    src: "/images/image7(1).svg",
    alt: "Cozy seating area with cushions and blankets",
  },
  {
    src: "/images/image7(2).svg",
    alt: "Bedroom with modern bed and yellow accents",
  },
  {
    src: "/images/image7(3).svg",
    alt: "Kitchen or bar area with large windows",
  },
  {
    src: "/images/image7(4).svg",
    alt: "Living space with exposed brick walls",
  },
  {
    src: "/images/image7(5).svg",
    alt: "Bedroom with Japanese-style sliding doors",
  },
];

export function ImageGallery() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="my-[80px]">
          <Title subtitle="Luxury" title="HÌNH ẢNH HOMESTAY" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[4/3]">
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
