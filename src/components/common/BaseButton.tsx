import React from "react";
import Link from "next/link";

export type BaseButtonProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  type?: "primary" | "secondary" | "small";
  href?: string;
  newTab?: boolean;
};

export default function Button({
  children,
  icon,
  iconPosition = "left",
  type = "primary",
  href,
  newTab = false,
}: BaseButtonProps) {
  const classes = {
    primary:
      "w-fit flex items-center gap-3 rounded-lg bg-primary p-4 px-6 font-semibold text-white tracking-[0.016rem] hover:bg-primary-dark",
    secondary:
      "w-fit flex items-center gap-3 rounded-lg bg-white p-4 px-6 font-semibold text-black border border-black tracking-[0.016rem] hover:bg-black hover:text-white",
    small:
      "w-fit flex items-center gap-3 rounded-lg bg-primary p-2 px-4 font-medium text-white tracking-[0.014rem] hover:bg-primary-dark",
  }[type];

  return href ? (
    <Link href={href} className={classes} target={newTab ? "_blank" : "_self"}>
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </Link>
  ) : (
    <button className={classes}>
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </button>
  );
}
