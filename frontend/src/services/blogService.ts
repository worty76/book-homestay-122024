import { Blog } from "@/types/blog";
import Cookies from "js-cookie";
import { getCurrentUserId } from "@/services/userService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/blog`);

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchBlogs service:", error);
    throw error;
  }
}

export async function fetchBlogById(id: string): Promise<Blog> {
  try {
    const response = await fetch(`${API_URL}/api/v1/blog/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw error;
  }
}

export async function incrementBlogViews(id: string): Promise<Blog> {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/blog/${id}/increment-views`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to increment blog views: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error incrementing views for blog ID ${id}:`, error);
    throw error;
  }
}

export async function toggleBlogLike(id: string): Promise<Blog> {
  try {
    // Get all possible token locations
    const token =
      localStorage.getItem("token") ||
      Cookies.get("token") ||
      localStorage.getItem("access_token") ||
      Cookies.get("access_token") ||
      sessionStorage.getItem("token");

    // Get current user ID
    const userId = getCurrentUserId();

    // Use our own Next.js API route instead of calling backend directly
    const response = await fetch(`/api/v1/blog/${id}/toggle-like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      // Send the user ID in the request body
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Authentication required to like blogs. Please log in."
        );
      }
      throw new Error(`Failed to toggle blog like: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error toggling like for blog ID ${id}:`, error);

    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to toggle like for blog ID ${id}`);
    }
  }
}
