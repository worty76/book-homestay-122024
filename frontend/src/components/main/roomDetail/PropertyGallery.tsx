import Image from "next/image";

export default function PropertyGallery() {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-12 gap-2">
        {/* Main large image */}
        <div className="col-span-6 row-span-2 relative aspect-[4/3]">
          <Image
            src="/images/img1.jpg"
            alt="Living room with grey sofa and yellow chair"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Right side grid */}
        <div className="col-span-6 grid grid-cols-2 gap-2">
          {/* Top row */}
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/img1.jpg"
              alt="Kitchen and dining area"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/img1.jpg"
              alt="Living room view"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Bottom row */}
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/img1.jpg"
              alt="Kitchen"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/img1.jpg"
              alt="Exterior view"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
