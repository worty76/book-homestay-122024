import { Room } from "@/types/room";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchRooms(): Promise<Room[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/room`);

    if (!response.ok) {
      throw new Error(`Failed to fetch rooms: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchRooms service:", error);
    throw error;
  }
}

export async function fetchRoomById(id: string): Promise<Room> {
  try {
    const response = await fetch(`${API_URL}/api/v1/room/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch room: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching room with ID ${id}:`, error);
    throw error;
  }
}
