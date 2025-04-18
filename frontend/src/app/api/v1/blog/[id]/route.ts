import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function GET(
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

    // Fetch the blog from the real backend API
    const response = await axios.get(`${API_URL}/api/v1/blog/${id}`);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: error.response.data.error || "Failed to fetch blog" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
