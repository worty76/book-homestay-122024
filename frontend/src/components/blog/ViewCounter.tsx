import { Eye } from "lucide-react";

interface ViewCounterProps {
  count: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ViewCounter({
  count,
  size = "md",
  className = "",
}: ViewCounterProps) {
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

  return (
    <div className={`flex items-center text-gray-600 ${className}`}>
      <Eye className={`${iconSizes[size]} mr-1`} />
      <span className={sizeClasses[size]}>{count.toLocaleString()} views</span>
    </div>
  );
}
