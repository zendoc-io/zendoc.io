import React from "react";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  type?: "primary" | "secondary";
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
}: Props) {
  const classes = {
    primary:
      "w-fit flex items-center gap-3 rounded-lg bg-primary p-4 px-6 font-semibold text-white tracking-[0.016rem]",
    secondary:
      "w-fit flex items-center gap-3 rounded-lg bg-white p-4 px-6 font-semibold text-black border border-black tracking-[0.016rem]",
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
