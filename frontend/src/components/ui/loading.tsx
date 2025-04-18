import React from "react";
import { cn } from "@/lib/utils";

type LoadingProps = {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "white";
  className?: string;
  text?: string;
  fullscreen?: boolean;
};

export function Loading({
  size = "md",
  variant = "default",
  className,
  text,
  fullscreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  const variantClasses = {
    default: "border-muted-foreground/30 border-t-muted-foreground/90",
    primary: "border-primary/30 border-t-primary",
    white: "border-white/30 border-t-white",
  };

  const containerClasses = fullscreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
    : "flex flex-col items-center justify-center";

  return (
    <div className={cn(containerClasses, className)}>
      <div
        className={cn(
          "animate-spin rounded-full",
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
      {text && (
        <p
          className={cn(
            "mt-3 text-sm font-medium",
            variant === "white" ? "text-white" : "text-muted-foreground"
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export function LoadingDots({
  size = "md",
  variant = "default",
  className,
}: Omit<LoadingProps, "text" | "fullscreen">) {
  const dotSizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  };

  const dotVariantClasses = {
    default: "bg-muted-foreground/70",
    primary: "bg-primary",
    white: "bg-white",
  };

  return (
    <div className={cn("flex items-center space-x-1.5", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse rounded-full",
            dotSizeClasses[size],
            dotVariantClasses[variant],
            {
              "animation-delay-200": i === 1,
              "animation-delay-400": i === 2,
            }
          )}
          style={{
            animationDelay: i * 200 + "ms",
          }}
        />
      ))}
    </div>
  );
}

export function LoadingBar({
  height = "h-1",
  variant = "primary",
  className,
}: {
  height?: string;
  variant?: "default" | "primary" | "white";
  className?: string;
}) {
  const barVariantClasses = {
    default: "bg-muted-foreground/70",
    primary: "bg-primary",
    white: "bg-white",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-muted/30",
        height,
        className
      )}
    >
      <div
        className={cn(
          "absolute left-0 h-full w-1/3 animate-loading-bar rounded-full",
          barVariantClasses[variant]
        )}
      />
    </div>
  );
}
