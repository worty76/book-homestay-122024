import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function Button({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const baseStyles = "transition-colors";
  const variantStyles = {
    default: "",
    outline: "border border-yellow-500 text-yellow-500 ",
    ghost: "text-yellow-500 ",
  };
  const sizeStyles = {
    default: "px-4 py-2",
    sm: "px-2 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
