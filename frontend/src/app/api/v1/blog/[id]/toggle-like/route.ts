import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    // Get the request body with user ID
    const body = await request.json().catch(() => ({}));

    // Get headers from the incoming request
    const cookieHeader = request.headers.get("cookie");
    const authHeader = request.headers.get("authorization");

    // Build headers to send to the backend
    const headers: Record<string, string> = {};
    if (cookieHeader) headers["cookie"] = cookieHeader;
    if (authHeader) headers["authorization"] = authHeader;

    // Call the backend API
    const response = await axios.post(
      `${API_URL}/api/v1/blog/${id}/toggle-like`,
      // Forward the user ID
      { userId: body.userId },
      {
        headers,
        withCredentials: true, // Important: forward cookies
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error toggling blog like:", error);

    if (axios.isAxiosError(error) && error.response) {
      // If it's an authentication error, return a user-friendly message
      if (error.response.status === 401) {
        return NextResponse.json(
          { error: "Vui lòng đăng nhập để thích bài viết" },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: error.response.data.error || "Failed to toggle blog like" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: "Failed to toggle blog like" },
      { status: 500 }
    );
  }
}
