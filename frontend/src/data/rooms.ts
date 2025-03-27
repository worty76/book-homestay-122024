export type RoomType = "Twin" | "Double" | "Dormitory";
export type ViewType = "Window" | "Balcony";
export type RoomCategory = "Deluxe" | "Standard";

export interface Room {
  id: string;
  name: string;
  floor: number;
  type: RoomType;
  category: RoomCategory;
  view: ViewType;
  size: number;
  maxCapacity: number;
  price: number;
  available: boolean;
  description: string;
  story: string;
  mainColors: string[];
  amenities: string[];
  bathroomAmenities: string[];
  images: string[];
}

export const rooms: Room[] = [
  {
    id: "phong-nam",
    name: "Phong Nam",
    floor: 1,
    type: "Double",
    category: "Deluxe",
    view: "Balcony",
    size: 35,
    maxCapacity: 2,
    price: 900000,
    available: true,
    description:
      "Phòng 'Phong Nam' lấy cảm hứng từ ngôi làng cổ Phong Nam, nơi hiện thân cho nét quyến rũ mộc mạc của vùng nông thôn truyền thống Việt Nam. Ngôi làng có từ nhiều thế kỷ trước, từ thời Champa, cho phép du khách trải nghiệm cảm giác yên bình qua hình ảnh những cánh đồng lúa vàng, đàn cò bay và rặng tre xanh tươi. Nó cũng mang đến cảm giác như đang du hành ngược thời gian, đắm chìm trong bầu không khí cổ kính và hoài niệm.",
    story:
      'Phòng "Phong Nam" được lấy cảm hứng từ ngôi làng cổ Phong Nam, nơi hiện thân cho nét mộc mạc của nông thôn Việt. Không gian lưu giữ vẻ đẹp của thời gian với hình ảnh cánh đồng lúa vàng, cò bay và rặng tre xanh, mang đến sự bình yên cho du khách.',
    mainColors: ["Be", "Xanh lá", "Nâu gỗ"],
    amenities: [
      "Ban công",
      "Điều hòa nhiệt độ",
      "Quạt trần",
      "Tủ quần áo",
      "Tủ đầu giường",
      "Đèn ngủ",
      "Wifi tốc độ cao",
      "Ấm siêu tốc",
      "Trà, cà phê miễn phí",
      "Dép đi trong nhà",
      "Rèm cửa",
    ],
    bathroomAmenities: [
      "Bồn rửa mặt kèm gương",
      "Vòi sen",
      "Bình nóng lạnh",
      "Máy sấy tóc",
      "Bộ KIT vệ sinh cá nhân",
      "Khăn tắm",
      "Sữa tắm/dầu gội",
      "Giấy vệ sinh và vòi xịt",
      "Thảm lau chân",
      "Máy hút mùi",
    ],
    images: [
      "/images/view/9.png",
      "/images/view/1.png",
      "/images/view/2.png",
      "/images/view/3.png",
      "/images/view/3.png",
    ],
  },
  {
    id: "non-nuoc",
    name: "Non Nước",
    floor: 1,
    type: "Twin",
    category: "Deluxe",
    view: "Window",
    size: 35,
    maxCapacity: 2,
    price: 800000,
    available: true,
    description:
      "Phòng 'Non Nước' lấy cảm hứng từ vẻ đẹp huyền bí của Ngũ Hành Sơn – không chỉ là danh lam thắng cảnh với hang động, đền chùa linh thiêng mà còn là nơi lưu giữ những câu chuyện huyền thoại về sự hình thành của núi non và sự gắn kết giữa người dân với thiên nhiên. Đây cũng là không gian để du khách tìm hiểu về cụm núi đá vôi cuối cùng còn sót lại của dãy Trường Sơn phía Bắc.",
    story:
      "Phòng 'Non Nước' không chỉ là nơi nghỉ ngơi mà còn mở ra cơ hội khám phá vẻ đẹp và lịch sử của Ngũ Hành Sơn, nơi gắn liền giữa quá khứ và hiện tại.",
    mainColors: ["Xanh ngọc", "Nâu gỗ", "Trắng"],
    amenities: [
      "Điều hòa nhiệt độ",
      "Quạt trần",
      "Tủ quần áo",
      "Tủ đầu giường",
      "Đèn ngủ",
      "Wifi tốc độ cao",
      "Ấm siêu tốc",
      "Trà, cà phê miễn phí",
      "Dép đi trong nhà",
      "Rèm cửa",
    ],
    bathroomAmenities: [
      "Bồn rửa mặt kèm gương",
      "Vòi sen",
      "Bình nóng lạnh",
      "Máy sấy tóc",
      "Bộ KIT vệ sinh cá nhân",
      "Khăn tắm",
      "Sữa tắm/dầu gội",
      "Giấy vệ sinh và vòi xịt",
      "Thảm lau chân",
      "Máy hút mùi",
    ],
    images: [
      "/images/view/1.png",
      "/images/view/2.png",
      "/images/view/3.png",
      "/images/view/4.png",
    ],
  },
  {
    id: "hai-cau-vien",
    name: "Hải Cầu Viên",
    floor: 1,
    type: "Twin",
    category: "Deluxe",
    view: "Window",
    size: 35,
    maxCapacity: 2,
    price: 800000,
    available: true,
    description:
      "Phòng 'Hải Cầu Viên' lấy cảm hứng từ hình ảnh những cây cầu nối liền đất liền và biển cả, phản ánh sự hòa quyện của thiên nhiên, văn hóa và con người. Đà Nẵng – Thành phố của những cây cầu – được thể hiện qua thiết kế tinh tế của phòng, mang lại cảm giác yên bình giữa lòng thành phố.",
    story:
      "Phòng 'Hải Cầu Viên' mang đến không gian thư giãn với cảm hứng từ những cây cầu nổi tiếng của Đà Nẵng, giúp du khách cảm nhận được sự kết nối giữa quá khứ và hiện tại.",
    mainColors: ["Trắng", "Be", "Xanh dương pastel"],
    amenities: [
      "Điều hòa nhiệt độ",
      "Quạt trần",
      "Tủ quần áo",
      "Tủ đầu giường",
      "Đèn ngủ",
      "Wifi tốc độ cao",
      "Ấm siêu tốc",
      "Trà, cà phê miễn phí",
      "Dép đi trong nhà",
      "Rèm cửa",
    ],
    bathroomAmenities: [
      "Bồn rửa mặt kèm gương",
      "Vòi sen",
      "Bình nóng lạnh",
      "Máy sấy tóc",
      "Bộ KIT vệ sinh cá nhân",
      "Khăn tắm",
      "Sữa tắm/dầu gội",
      "Giấy vệ sinh và vòi xịt",
      "Thảm lau chân",
      "Máy hút mùi",
    ],
    images: [
      "/images/view/1.png",
      "/images/view/2.png",
      "/images/view/3.png",
      "/images/view/4.png",
    ],
  },
  {
    id: "lua-hoi",
    name: "Lụa Hội",
    floor: 1,
    type: "Double",
    category: "Deluxe",
    view: "Balcony",
    size: 35,
    maxCapacity: 2,
    price: 900000,
    available: true,
    description:
      "Phòng 'Lụa Hội' lấy cảm hứng từ nghệ thuật lụa và đèn lồng truyền thống Hội An, mang đến không gian ấm áp, tao nhã và đậm chất văn hóa địa phương. Mỗi chi tiết trong phòng phản ánh nét mộc mạc của nghề thủ công Việt, tạo nên một hành trình đắm chìm vào văn hóa truyền thống.",
    story:
      'Phòng "Lụa Hội" mở ra không gian đậm chất Hội An, nơi du khách cảm nhận sự ấm áp và thanh lịch của nghệ thuật lụa và đèn lồng truyền thống, đồng thời thưởng thức vẻ đẹp giản dị của cuộc sống địa phương.',
    mainColors: ["Trắng", "Be", "Xanh ngọc"],
    amenities: [
      "Ban công",
      "Điều hòa nhiệt độ",
      "Quạt trần",
      "Tủ quần áo",
      "Tủ đầu giường",
      "Đèn ngủ",
      "Wifi tốc độ cao",
      "Ấm siêu tốc",
      "Trà, cà phê miễn phí",
      "Dép đi trong nhà",
      "Rèm cửa",
    ],
    bathroomAmenities: [
      "Bồn rửa mặt kèm gương",
      "Vòi sen",
      "Bình nóng lạnh",
      "Máy sấy tóc",
      "Bộ KIT vệ sinh cá nhân",
      "Khăn tắm",
      "Sữa tắm/dầu gội",
      "Giấy vệ sinh và vòi xịt",
      "Thảm lau chân",
      "Máy hút mùi",
    ],
    images: [
      "/images/view/5.png",
      "/images/view/6.png",
      "/images/view/7.png",
      "/images/view/8.png",
      "/images/view/8.png",
    ],
  },
  {
    id: "ngu-binh",
    name: "Ngư Bình",
    floor: 1,
    type: "Dormitory",
    category: "Standard",
    view: "Window",
    size: 30,
    maxCapacity: 6,
    price: 300000,
    available: true,
    description:
      "Phòng 'Ngư Bình' gợi lên hình ảnh cuộc sống mộc mạc của làng chài ven biển, nơi con người và thiên nhiên hòa quyện trong nhịp điệu yên bình nhưng sôi động. Tại đây, du khách không chỉ được nghỉ ngơi mà còn khám phá vẻ đẹp giản dị của văn hóa miền biển.",
    story:
      "Phòng 'Ngư Bình' mở ra không gian gần gũi với cuộc sống làng chài, nơi du khách cảm nhận được sự giản dị và ấm áp của văn hóa miền biển.",
    mainColors: ["Xanh ngọc lam", "Trắng ngà", "Vàng cát nhạt"],
    amenities: [
      "Điều hòa nhiệt độ",
      "Quạt trần",
      "Tủ quần áo",
      "Wifi tốc độ cao",
      "Ấm siêu tốc",
      "Trà, cà phê miễn phí",
      "Dép đi trong nhà",
      "Rèm cửa",
    ],
    bathroomAmenities: [
      "Bồn rửa mặt kèm gương",
      "Vòi sen",
      "Bình nóng lạnh",
      "Máy sấy tóc",
      "Bộ KIT vệ sinh cá nhân",
      "Khăn tắm",
      "Sữa tắm/dầu gội",
      "Giấy vệ sinh và vòi xịt",
      "Thảm lau chân",
      "Máy hút mùi",
    ],
    images: [
      "/images/view/5.png",
      "/images/view/6.png",
      "/images/view/7.png",
      "/images/view/8.png",
      "/images/view/8.png",
    ],
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find(room => room.id === id);
}
