import { axiosClient } from "./axios-client";

export interface HomestayData {
  name: string;
  location: string;
  description: string;
  price_per_night: number;
  available_rooms: number;
  images: string[];
}

export const homestayApi = {
  createHomestay: async (data: HomestayData) => {
    const response = await axiosClient.post("/api/homestay", data);
    return response.data;
  },
};
