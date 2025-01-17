import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto mb-4">
      <h1 className="text-center font-bold font-roboto text-5xl">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-12 p-3">
        <Card>
          <Image
            src="/images/image4.png"
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">Post title</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              Small Description
            </p>
            <Button asChild className="w-full mt-7">
              <Link href="">Read More</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <Image
            src="/images/image4.png"
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">Post title</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              Small Description
            </p>
            <Button asChild className="w-full mt-7">
              <Link href="">Read More</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <Image
            src="/images/image4.png"
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">Post title</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              Small Description
            </p>
            <Button asChild className="w-full mt-7">
              <Link href="">Read More</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <Image
            src="/images/image4.png"
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />

          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-bold">Post title</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              Small Description
            </p>
            <Button asChild className="w-full mt-7">
              <Link href="">Read More</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
