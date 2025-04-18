import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { toggleBlogLike } from "@/services/blogService";
import { getCurrentUserId } from "@/services/userService";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LikeButtonProps {
  blogId: string;
  initialLikes: number;
  isLiked?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * LikeButton component for blogs
 * Displays the like count and allows users to toggle their like status
 */
export default function LikeButton({
  blogId,
  initialLikes = 0,
  isLiked = false,
  className,
  size = "md",
}: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);
  const [liked, setLiked] = useState<boolean>(isLiked);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const { toast } = useToast();

  // Get current user ID when component mounts
  useEffect(() => {
    // Only run in browser
    if (typeof window !== "undefined") {
      const currentUserId = getCurrentUserId();
      setUserId(currentUserId);

      // Use backend state (isLiked prop) if available, otherwise check localStorage
      if (isLiked) {
        setLiked(true);
      } else {
        const likedPosts = JSON.parse(
          localStorage.getItem("likedPosts") || "{}"
        );
        if (likedPosts[blogId]) {
          setLiked(true);
        }
      }
    }
  }, [blogId, isLiked]);

  // Size mappings
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const containerClasses = {
    sm: "space-x-1 px-2 py-1",
    md: "space-x-1.5 px-3 py-1.5",
    lg: "space-x-2 px-4 py-2",
  };

  const handleLikeToggle = async () => {
    if (isUpdating) return;

    // Ensure we have a user ID
    if (!userId && typeof window !== "undefined") {
      setUserId(getCurrentUserId());
    }

    setIsUpdating(true);
    try {
      // Optimistically update UI
      const newLikedState = !liked;
      setLiked(newLikedState);
      setLikes((prev) => (newLikedState ? prev + 1 : Math.max(0, prev - 1)));

      // Update local storage
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
      if (newLikedState) {
        likedPosts[blogId] = true;
      } else {
        delete likedPosts[blogId];
      }
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

      // Call API to update like status
      const updatedBlog = await toggleBlogLike(blogId);

      // Update with actual data from server
      setLikes(updatedBlog.likes?.count || 0);

      // Check if current user is in the liked users list
      const userLiked = updatedBlog.likes?.users?.includes(userId) || false;
      if (userLiked !== liked) {
        // If server state is different from our local state, update to match server
        setLiked(userLiked);
        // Also update localStorage to match
        const likedPosts = JSON.parse(
          localStorage.getItem("likedPosts") || "{}"
        );
        if (userLiked) {
          likedPosts[blogId] = true;
        } else {
          delete likedPosts[blogId];
        }
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      }
    } catch (error) {
      // Show authentication error as toast notification
      const errorMessage =
        error instanceof Error ? error.message : "Error toggling like";
      if (
        errorMessage.includes("Authentication required") ||
        errorMessage.includes("log in")
      ) {
        toast({
          title: "Yêu cầu xác thực",
          description: "Vui lòng đăng nhập để thích bài viết",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Lỗi",
          description: errorMessage,
          variant: "destructive",
        });
      }

      // Revert to previous state on error
      console.error("Error toggling like:", error);
      setLiked(liked);
      setLikes(likes);

      // Revert localStorage change
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
      if (liked) {
        likedPosts[blogId] = true;
      } else {
        delete likedPosts[blogId];
      }
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleLikeToggle}
      disabled={isUpdating}
      className={cn(
        "flex items-center rounded-full transition-colors",
        containerClasses[size],
        liked
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-gray-50 text-gray-500 hover:bg-gray-100",
        isUpdating && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      <Heart
        className={cn(
          iconSizes[size],
          liked ? "fill-red-500" : "fill-none",
          isUpdating && "animate-pulse"
        )}
      />
      <span className={sizeClasses[size]}>{likes.toLocaleString()}</span>
    </button>
  );
}
