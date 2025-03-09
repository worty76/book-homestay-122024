export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  originalPrice: number;
  area: number;
  bedrooms: number;
  imageUrl: string;
}

export const properties: Property[] = [
  {
    id: "villa-6-pn",
    name: "Villa 6 PN",
    location:
      "Tọa lạc tại Khu du lịch Tiến Thành - Phía nam TP. Phan Thiết, biệt thự có 6 phòng ngủ, 1 phòng khách + bếp, bãn biển lô, hồ bơi riêng và cách biển vài...",
    price: 6500000,
    originalPrice: 7000000,
    area: 1000,
    bedrooms: 15,
    imageUrl: "/images/img1.jpg",
  },
  {
    id: "flora-villa",
    name: "Flora Villa",
    location:
      "Biệt thự Flora có diện tích hơn 1000m2 với 7 phòng ngủ (11 giường), 6 wc, phòng khách rộng rãi hiện đại, đầy đủ tiện nghi sinh hoạt...",
    price: 7000000,
    originalPrice: 8000000,
    area: 1000,
    bedrooms: 11,
    imageUrl: "/images/img1.jpg",
  },
  {
    id: "cocobeach",
    name: "Cocobeach",
    location:
      "Tọa lạc tại phía nam TP. Phan Thiết, KDL Tiến Thành, Cocobeach là một villa với diện tích 140m2 có bãi biển riêng, hồ bơi riêng bao gồm 2 phòng ngủ...",
    price: 5000000,
    originalPrice: 6000000,
    area: 140,
    bedrooms: 2,
    imageUrl: "/images/img1.jpg",
  },
  {
    id: "lagi-5-pn",
    name: "Lagi 5 PN",
    location:
      "Tọa lạc tại thị xã Lagi, biệt thự có 5 phòng ngủ với 7 giường, 2 hồ bơi lớn cách biển vài bước chân.",
    price: 10400000,
    originalPrice: 11000000,
    area: 2000,
    bedrooms: 7,
    imageUrl: "/images/img1.jpg",
  },
  {
    id: "lagi-3-pn",
    name: "Lagi 3 PN",
    location:
      "Tọa lạc tại thị xã Lagi, biệt thự có 3 phòng ngủ với 5 giường, hồ bơi lớn cách biển vài bước chân.",
    price: 8400000,
    originalPrice: 9000000,
    area: 1500,
    bedrooms: 5,
    imageUrl: "/images/img1.jpg",
  },
  {
    id: "lagi-4-pn",
    name: "Lagi 4 PN",
    location:
      "Tọa lạc tại thị xã Lagi, biệt thự có 4 phòng ngủ với 6 giường, hồ bơi lớn cách biển vài bước chân.",
    price: 9400000,
    originalPrice: 10000000,
    area: 1800,
    bedrooms: 6,
    imageUrl: "/images/img1.jpg",
  },
];
