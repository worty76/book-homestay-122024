import { useEffect, useState } from "react";
import { incrementBlogViews } from "@/services/blogService";
import ViewCounter from "./ViewCounter";

interface BlogViewTrackerProps {
  blogId: string;
  initialViews: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Component that tracks and displays blog view counts
 * This component handles incrementing the view count and displaying it
 */
export default function BlogViewTracker({
  blogId,
  initialViews = 0,
  className,
  size = "md",
}: BlogViewTrackerProps) {
  const [viewCount, setViewCount] = useState<number>(initialViews);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to safely access sessionStorage (only available in browser)
    const getViewedBlogs = () => {
      if (typeof window === "undefined") return {};
      try {
        return JSON.parse(sessionStorage.getItem("viewedBlogs") || "{}");
      } catch (e) {
        console.error("Error parsing viewedBlogs from sessionStorage", e);
        return {};
      }
    };

    // Function to safely set sessionStorage
    const setViewedBlogs = (blogs: Record<string, boolean>) => {
      if (typeof window === "undefined") return;
      try {
        sessionStorage.setItem("viewedBlogs", JSON.stringify(blogs));
      } catch (e) {
        console.error("Error setting viewedBlogs in sessionStorage", e);
      }
    };

    const incrementViews = async () => {
      // Only increment if we have a valid blog ID and haven't already started updating
      if (blogId && !isUpdating) {
        // Check if we've already incremented views for this blog in this session
        const viewedBlogs = getViewedBlogs();

        // If we've already viewed this blog, don't increment again
        if (viewedBlogs[blogId]) {
          console.log(`Blog ${blogId} already viewed in this session`);
          return;
        }

        setIsUpdating(true);
        try {
          console.log(`Incrementing views for blog: ${blogId}`);
          const updatedBlog = await incrementBlogViews(blogId);
          console.log(`View count updated: ${updatedBlog.views}`);
          setViewCount(updatedBlog.views);

          // Mark this blog as viewed in this session
          viewedBlogs[blogId] = true;
          setViewedBlogs(viewedBlogs);

          setError(null);
        } catch (err) {
          console.error("Error incrementing view count:", err);
          setError("Failed to update view count");
        } finally {
          setIsUpdating(false);
        }
      }
    };

    // Increment views when component mounts
    incrementViews();
  }, [blogId]);

  return (
    <div className={className}>
      <ViewCounter count={viewCount} size={size} />
      {error && <span className="text-red-500 text-xs ml-2">{error}</span>}
    </div>
  );
}
