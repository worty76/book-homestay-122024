import { Share, Heart } from "lucide-react";
import Link from "next/link";

export default function PropertyHeader() {
  return (
    <div className="mb-6">
      <h1 className="text-[32px] font-medium mb-1">Bordeaux Getaway</h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center">
            <span className="text-rose-500">★</span>
            <span className="ml-1 font-medium">5.0</span>
            <span className="mx-1">·</span>
            <Link href="#" className="underline font-medium">
              7 reviews
            </Link>
            <span className="mx-1">·</span>
            <span className="text-rose-500">♦</span>
            <span className="ml-1 font-medium">Superhost</span>
            <span className="mx-1">·</span>
            <Link href="#" className="underline">
              Bordeaux, France
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <Share className="h-4 w-4" />
            <span className="underline font-medium">Share</span>
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <Heart className="h-4 w-4" />
            <span className="underline font-medium">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
