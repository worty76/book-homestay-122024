import Image from "next/image";
import { Title } from "./title";

const amenities = [
  {
    name: "KHU SÂN VƯỜN",
    description:
      "Diện tích rộng 50m2, phù hợp với những cuộc họp mặt thành viên trong gia đình cuối tuần, có chỗ riêng cho trẻ em vui chơi.",
    image: "/images/image5.png",
  },
  {
    name: "PHÒNG KHÁCH",
    description:
      "Không gian sang trọng, được bố trí tinh tế với ghế sofa lớn và bàn uống nước tiện lợi.",
    image: "/images/image5(1).png",
  },
  {
    name: "PHÒNG NGỦ",
    description:
      "Trang bị đầy đủ giường êm ái, chăn gối cao cấp mang lại giấc ngủ thư thái.",
    image: "/images/image5(2).png",
  },
  {
    name: "NHÀ BẾP",
    description:
      "Không gian bếp đầy đủ tiện nghi, tạo cảm hứng cho các bữa ăn ngon miệng.",
    image: "/images/image5(3).png",
  },
];

export function Amenities() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="my-[80px]">
          <Title subtitle="luxury" title="TIỆN ÍCH HOMESTAY" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity) => (
            <div key={amenity.name} className="relative overflow-hidden group">
              {/* Image */}
              <Image
                src={amenity.image}
                alt={amenity.name}
                width={300}
                height={500}
                className="w-full transition-transform duration-300 group-hover:scale-105"
              />

              {/* Always visible name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white py-2 px-4 rounded group-hover:opacity-0 transition-opacity duration-300">
                  {amenity.name}
                </h3>
              </div>

              {/* Hover: Show description */}
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {amenity.name}
                </h3>
                <div className="h-1 w-10 bg-yellow-500 mb-4"></div>
                <p className="text-sm text-center">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
