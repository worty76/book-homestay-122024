import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface GalleryCardProps {
  imgUrl: string;
  title: string;
}

export default function GalleryCard({ imgUrl, title }: GalleryCardProps) {
  return (
    <Card
      className="hover:shadow-lg transition-shadow duration-300 
                 rounded-lg overflow-hidden"
    >
      <div className="relative w-full h-48">
        <Image src={imgUrl} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Deskripsi singkat mengenai {title}.
        </p>
      </CardContent>
    </Card>
  );
}
