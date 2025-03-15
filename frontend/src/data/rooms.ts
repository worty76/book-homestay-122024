export type RoomType = "Twin" | "Double" | "Dormitory";
export type ViewType = "Window" | "Balcony";
export type RoomCategory = "Deluxe" | "Standard";
export type RoomConcept =
  | "NonNuoc"
  | "PhongNam"
  | "HaiCauVien"
  | "LuaHoi"
  | "NguBinh";

export interface RoomBase {
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
}

export interface ConceptBase {
  name: string;
  description: string;
  story: string;
  mainColors: string[];
  amenities: string[];
  bathroomAmenities: string[];
  images: {
    floor1: string[];
    floor2: string[];
  };
}

export const concepts: Record<RoomConcept, ConceptBase> = {
  NonNuoc: {
    name: "Non Nước",
    description: "Lấy cảm hứng từ vẻ đẹp huyền bí của Ngũ Hành Sơn",
    story:
      "Phòng Non Nước được lấy cảm hứng từ vẻ đẹp huyền bí của Ngũ Hành Sơn. Ngọn núi này không chỉ là một danh lam thắng cảnh với các hang động và chùa chiền linh thiêng, mà còn là nơi lưu giữ những câu chuyện truyền thuyết về sự hình thành của các ngọn núi và sự kết nối giữa con người địa phương với thiên nhiên.",
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
    images: {
      floor1: [
        "/images/view/1.png",
        "/images/view/2.png",
        "/images/view/3.png",
        "/images/view/4.png",
        "/images/view/4.png",
      ],
      floor2: [
        "/images/view/5.png",
        "/images/view/6.png",
        "/images/view/7.png",
        "/images/view/8.png",
        "/images/view/8.png",
      ],
    },
  },
  PhongNam: {
    name: "Phong Nam",
    description:
      "Lấy cảm hứng từ làng cổ Phong Nam mang đậm nét làng quê Việt Nam chất phác",
    story:
      'Phòng "Phong Nam" được lấy cảm hứng từ "Làng cổ Phong Nam" mang đậm nét làng quê Việt Nam chất phác. Một ngôi làng cổ đã có tuổi đời hàng trăm năm và có từ thời Champa. Không gian mang đậm nét của thời gian, du khách có thể cảm nhận được sự bình yên của căn phòng thông qua hình ảnh cánh đồng lúa chín, cò bay, lũy tre xanh ngát.',
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
    images: {
      floor1: [
        "/images/view/9.png",
        "/images/view/1.png",
        "/images/view/2.png",
        "/images/view/3.png",
        "/images/view/3.png",
      ],
      floor2: [
        "/images/view/4.png",
        "/images/view/5.png",
        "/images/view/6.png",
        "/images/view/7.png",
        "/images/view/7.png",
      ],
    },
  },
  HaiCauVien: {
    name: "Hải Cầu Viên",
    description:
      "Lấy cảm hứng từ hình ảnh những cây cầu nổi tiếng nối liền đất liền và biển",
    story:
      'Phòng "Hải Cầu Viên" được lấy cảm hứng từ hình ảnh những cây cầu nổi tiếng nối liền đất liền và biển, phản ánh sự hòa quyện giữa thiên nhiên, văn hóa và con người. Được thiết kế như một không gian thư giãn, phòng mang đến cho du khách cảm giác yên bình giữa lòng thành phố Đà Nẵng.',
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
    images: {
      floor1: [
        "/images/view/1.png",
        "/images/view/2.png",
        "/images/view/3.png",
        "/images/view/4.png",
        "/images/view/4.png",
      ],
      floor2: [
        "/images/view/5.png",
        "/images/view/6.png",
        "/images/view/7.png",
        "/images/view/8.png",
        "/images/view/8.png",
      ],
    },
  },
  LuaHoi: {
    name: "Lụa Hội",
    description:
      "Lấy cảm hứng từ vẻ đẹp và sự tinh tế của nghệ thuật lụa và lồng đèn truyền thống của Hội An",
    story:
      'Căn phòng "Lụa Hội" trong boutique homestay được lấy cảm hứng từ vẻ đẹp và sự tinh tế của nghệ thuật lụa và lồng đèn truyền thống của Hội An. Khi bước vào, du khách sẽ ngay lập tức cảm nhận được không khí ấm áp và lôi cuốn, nơi mỗi chi tiết đều đậm chất mộc mạc của nghệ thuật Việt Nam.',
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
    images: {
      floor1: [
        "/images/view/5.png",
        "/images/view/6.png",
        "/images/view/7.png",
        "/images/view/8.png",
        "/images/view/8.png",
      ],
      floor2: [
        "/images/view/1.png",
        "/images/view/2.png",
        "/images/view/3.png",
        "/images/view/4.png",
        "/images/view/4.png",
      ],
    },
  },
  NguBinh: {
    name: "Ngư Bình",
    description: "Lấy cảm hứng từ cuộc sống mộc mạc của làng chài ven biển",
    story:
      'Đến với "Ngư Bình," bạn không chỉ nghỉ ngơi mà còn khám phá nét đẹp dung dị của văn hóa miền biển, nơi những câu chuyện của sóng, gió và con người hòa nhịp tạo nên một bản giao hưởng thanh bình.',
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
    images: {
      floor1: [
        "/images/view/5.png",
        "/images/view/6.png",
        "/images/view/7.png",
        "/images/view/8.png",
        "/images/view/8.png",
      ],
      floor2: [
        "/images/view/1.png",
        "/images/view/2.png",
        "/images/view/3.png",
        "/images/view/4.png",
        "/images/view/4.png",
      ],
    },
  },
};

export const rooms: Record<RoomConcept, RoomBase[]> = {
  NonNuoc: [
    {
      id: "non-nuoc-01",
      name: "Phòng Non Nước 01",
      floor: 1,
      type: "Twin",
      category: "Deluxe",
      view: "Window",
      size: 35,
      maxCapacity: 2,
      price: 800000,
      available: true,
    },
    {
      id: "non-nuoc-02",
      name: "Phòng Non Nước 02",
      floor: 2,
      type: "Twin",
      category: "Deluxe",
      view: "Window",
      size: 35,
      maxCapacity: 2,
      price: 850000,
      available: true,
    },
  ],
  PhongNam: [
    {
      id: "phong-nam-01",
      name: "Phòng Phong Nam 01",
      floor: 1,
      type: "Double",
      category: "Deluxe",
      view: "Balcony",
      size: 35,
      maxCapacity: 2,
      price: 900000,
      available: true,
    },
    {
      id: "phong-nam-02",
      name: "Phòng Phong Nam 02",
      floor: 2,
      type: "Double",
      category: "Deluxe",
      view: "Balcony",
      size: 35,
      maxCapacity: 2,
      price: 950000,
      available: true,
    },
  ],
  HaiCauVien: [
    {
      id: "hai-cau-vien-01",
      name: "Phòng Hải Cầu Viên 01",
      floor: 1,
      type: "Twin",
      category: "Deluxe",
      view: "Window",
      size: 35,
      maxCapacity: 2,
      price: 800000,
      available: true,
    },
    {
      id: "hai-cau-vien-02",
      name: "Phòng Hải Cầu Viên 02",
      floor: 2,
      type: "Twin",
      category: "Deluxe",
      view: "Window",
      size: 35,
      maxCapacity: 2,
      price: 850000,
      available: true,
    },
  ],
  LuaHoi: [
    {
      id: "lua-hoi-01",
      name: "Phòng Lụa Hội 01",
      floor: 1,
      type: "Double",
      category: "Deluxe",
      view: "Balcony",
      size: 35,
      maxCapacity: 2,
      price: 900000,
      available: true,
    },
    {
      id: "lua-hoi-02",
      name: "Phòng Lụa Hội 02",
      floor: 2,
      type: "Double",
      category: "Deluxe",
      view: "Balcony",
      size: 35,
      maxCapacity: 2,
      price: 950000,
      available: true,
    },
  ],
  NguBinh: [
    {
      id: "ngu-binh-01",
      name: "Phòng Ngư Bình 01",
      floor: 1,
      type: "Dormitory",
      category: "Standard",
      view: "Window",
      size: 45,
      maxCapacity: 6,
      price: 300000,
      available: true,
    },
    {
      id: "ngu-binh-02",
      name: "Phòng Ngư Bình 02",
      floor: 2,
      type: "Double",
      category: "Deluxe",
      view: "Window",
      size: 35,
      maxCapacity: 2,
      price: 850000,
      available: true,
    },
  ],
};

export interface Room extends RoomBase {
  concept: RoomConcept;
  description: string;
  story: string;
  mainColors: string[];
  amenities: string[];
  bathroomAmenities: string[];
  images: string[];
}

export const getCompleteRoom = (
  conceptKey: RoomConcept,
  roomId: string
): Room | undefined => {
  const roomBase = rooms[conceptKey].find((room) => room.id === roomId);
  if (!roomBase) return undefined;

  const conceptInfo = concepts[conceptKey];
  const floor = roomBase.floor;

  return {
    ...roomBase,
    concept: conceptKey,
    description: `${
      roomBase.type === "Twin"
        ? "Phòng đôi với 2 giường đơn"
        : roomBase.type === "Double"
        ? "Phòng đôi với 1 giường lớn"
        : "Phòng ngủ tập thể với 3 giường tầng"
    }, 
                  ${roomBase.view === "Window" ? "view cửa sổ" : "ban công"}, 
                  thiết kế lấy cảm hứng từ ${conceptInfo.name}`,
    story: conceptInfo.story,
    mainColors: conceptInfo.mainColors,
    amenities: [
      ...(roomBase.type === "Twin"
        ? ["2 giường đơn (1.2m x 2m)"]
        : roomBase.type === "Double"
        ? ["1 giường đôi (1.6m x 2m)"]
        : [
            "3 giường tầng có rèm che riêng tư (1.2m x 2m)",
            "Đèn đọc sách cá nhân tại mỗi giường",
            "Ổ cắm điện và khay để đồ cá nhân riêng biệt",
            "Tủ khóa an toàn cho mỗi khách",
          ]),
      ...conceptInfo.amenities,
    ],
    bathroomAmenities: conceptInfo.bathroomAmenities,
    images: conceptInfo.images[floor === 1 ? "floor1" : "floor2"],
  };
};

// Get all rooms as complete room objects
export const getAllRooms = (): Room[] => {
  const allRooms: Room[] = [];

  Object.keys(rooms).forEach((conceptKey) => {
    const concept = conceptKey as RoomConcept;
    rooms[concept].forEach((room) => {
      const completeRoom = getCompleteRoom(concept, room.id);
      if (completeRoom) {
        allRooms.push(completeRoom);
      }
    });
  });

  return allRooms;
};

// Helper functions to filter rooms
export const getRoomsByConcept = (concept: RoomConcept): Room[] => {
  return rooms[concept]
    .map((room) => getCompleteRoom(concept, room.id))
    .filter(Boolean) as Room[];
};

export const getRoomsByType = (type: RoomType): Room[] => {
  return getAllRooms().filter((room) => room.type === type);
};

export const getRoomsByFloor = (floor: number): Room[] => {
  return getAllRooms().filter((room) => room.floor === floor);
};

export const getRoomsByView = (view: ViewType): Room[] => {
  return getAllRooms().filter((room) => room.view === view);
};

export const getRoomById = (id: string): Room | undefined => {
  for (const conceptKey in rooms) {
    const concept = conceptKey as RoomConcept;
    const room = rooms[concept].find((r) => r.id === id);
    if (room) {
      return getCompleteRoom(concept, id);
    }
  }
  return undefined;
};

export const getAvailableRooms = (): Room[] => {
  return getAllRooms().filter((room) => room.available);
};

export const getRoomsByCapacity = (capacity: number): Room[] => {
  return getAllRooms().filter((room) => room.maxCapacity >= capacity);
};

export const getRoomsByPriceRange = (
  minPrice: number,
  maxPrice: number
): Room[] => {
  return getAllRooms().filter(
    (room) => room.price >= minPrice && room.price <= maxPrice
  );
};

export const getRoomsByCategory = (category: RoomCategory): Room[] => {
  return getAllRooms().filter((room) => room.category === category);
};

// Default export for convenience
export default {
  concepts,
  rooms,
  getCompleteRoom,
  getAllRooms,
  getRoomsByConcept,
  getRoomsByType,
  getRoomsByFloor,
  getRoomsByView,
  getRoomById,
  getAvailableRooms,
  getRoomsByCapacity,
  getRoomsByPriceRange,
  getRoomsByCategory,
};
