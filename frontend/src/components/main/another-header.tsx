import { Header } from "@/components/main/Header";
import Image from "next/image";
import BreadcrumbNav from "./breadcrumb-nav";

interface Props {
  title: string;
  description: string;
  image: string;
  backgroundColor?: string;
  colorOverlay?: boolean;
}

const AnotherHeader = ({
  title,
  description,
  image = "/images/img1.jpg",
}: Props) => {
  return (
    <div className="relative min-h-[450px] overflow-hidden">
      <div className="absolute inset-0">
        <div className={`absolute inset-0`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </div>
        <Header />

        <main className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="space-y-4 w-full max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {title}
            </h1>
            <p className="text-base text-white md:text-lg">{description}</p>

            <div className="flex justify-center w-full mt-6">
              <BreadcrumbNav
                darkMode={true}
                containerClassName="justify-center flex"
                listClassName="flex justify-center"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnotherHeader;
