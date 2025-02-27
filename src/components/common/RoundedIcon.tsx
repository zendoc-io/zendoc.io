import React from "react";

type Props = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  background?: string;
  className?: string;
};

export default function RoundedIcon({
  children,
  size = "md",
  color = "text-white",
  background = "bg-primary",
  className = "",
}: Props) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div
      className={`grid shrink-0 place-content-center rounded-full ${sizeClasses[size]} ${color} ${background} ${className}`}
    >
      {children}
    </div>
  );
}
