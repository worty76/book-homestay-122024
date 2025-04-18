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

    // Call the real backend API to increment views
    const response = await axios.post(
      `${API_URL}/api/v1/blog/${id}/increment-views`
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error incrementing blog views:", error);

    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          error: error.response.data.error || "Failed to increment blog views",
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: "Failed to increment blog views" },
      { status: 500 }
    );
  }
}
