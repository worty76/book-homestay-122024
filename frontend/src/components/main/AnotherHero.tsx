import { Header } from "@/components/main/Header";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
};

const AnotherHero = ({ title, description }: Props) => {
  return (
    <div className="relative min-h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <div className={`absolute inset-0`}>
          <Image
            src={"/images/img1.jpg"}
            alt={`img`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Header />

        <main className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="space-y-2">
            <p className="text-white text-2xl md:text-4xl tracking-widest">
              Contact
            </p>
            <h2 className="text-white  font-serif tracking-wider">
              <span>Home page</span> &gt; <span>Contact</span>
            </h2>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnotherHero;
