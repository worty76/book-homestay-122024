import Image from "next/image";

export function Advantage() {
  return (
    <section className="py-12 md:py-20 bg-[#f9f5e3] text-[#9C6B4A]">
      <div className="max-w-7xl mx-auto px-4">
        {/* First Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col justify-center items-start order-2 md:order-1">
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-roboto">
                Ưu điểm vị trí
              </h2>
              <ul className="space-y-3 md:space-y-4 font-roboto">
                <AdvantageItem
                  distance="200m"
                  description="đến Bamboo Bar (Luckydaisy Bamboo Bar)"
                />
                <AdvantageItem
                  distance="250m"
                  description="đến nhà hàng Ta Van View phục vụ các món địa phương"
                />
                <AdvantageItem
                  distance="400m"
                  description="đến Lá Dao Spa & Café"
                />
                <AdvantageItem
                  distance="450m"
                  description="đến chợ địa phương"
                />
              </ul>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="/images/image4.png"
              alt="Modern kitchen and living area"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Second Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="md:order-1">
            <Image
              src="/images/image4.png"
              alt="Cozy bedroom with large windows"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center items-start md:order-2">
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-roboto">
                Giới thiệu chỗ ở
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 font-roboto">
                <AmenityItem description="Trà và cà phê miễn phí." />
                <AmenityItem description="Nước nóng lạnh." />
                <AmenityItem description="Nước uống miễn phí." />
                <AmenityItem description="Giường với thật nhiều gối êm." />
                <AmenityItem description="Máy giặt, máy sấy tóc." />
                <AmenityItem description="Chăn gối ủ ấm loại tốt." />
                <AmenityItem description="Khăn tắm sạch." />
                <AmenityItem description="Quạt sưởi và đèm điện" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdvantageItem({
  distance,
  description,
}: {
  distance: string;
  description: string;
}) {
  return (
    <li className="flex items-start">
      <Image
        src="/icons/infor.svg"
        alt="infor"
        width={16}
        height={16}
        className="mr-2 mt-1 flex-shrink-0"
      />
      <span className="text-sm md:text-base">
        <strong>{distance}</strong> {description}
      </span>
    </li>
  );
}

function AmenityItem({ description }: { description: string }) {
  return (
    <div className="flex items-start">
      <Image
        src="/icons/infor.svg"
        alt="infor"
        width={16}
        height={16}
        className="mr-2 mt-1 flex-shrink-0"
      />
      <span className="text-sm md:text-base">{description}</span>
    </div>
  );
}
