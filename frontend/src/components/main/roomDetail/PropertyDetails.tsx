import { Home, SparklesIcon, Key, Calendar } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PropertyDetails() {
  return (
    <div className="border-b pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-medium mb-2">
            Entire rental unit hosted by Ghazal
          </h2>
          <p className="text-neutral-500">
            2 guests · 1 bedroom · 1 bed · 1 bath
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4">
          <Home className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium mb-1">Entire home</h3>
            <p className="text-neutral-500">
              You'll have the apartment to yourself
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <SparklesIcon className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium mb-1">Enhanced Clean</h3>
            <p className="text-neutral-500">
              This Host committed to Airbnb's 5-step enhanced cleaning process.
              <Button variant="link" className="px-1 py-0 h-auto font-medium">
                Show more
              </Button>
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Key className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium mb-1">Self check-in</h3>
            <p className="text-neutral-500">
              Check yourself in with the keypad.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Calendar className="w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium">Free cancellation before Feb 14</h3>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-neutral-600 leading-6">
          Come and stay in this superb duplex T2, in the heart of the historic
          center of Bordeaux. Spacious and bright, in a real Bordeaux building
          in exposed stone, you will enjoy all the charms of the city thanks to
          its ideal location. Close to many shops, bars and restaurants, you can
          access the apartment by tram A and C and bus routes 27 and 44.
        </p>
        <Button variant="link" className="px-0 py-0 h-auto font-medium mt-2">
          Show more
          <span className="ml-2">›</span>
        </Button>
      </div>
    </div>
  );
}
