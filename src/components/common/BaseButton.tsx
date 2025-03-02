import React from "react";
import Link from "next/link";

export type BaseButtonProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  type?: "primary" | "secondary" | "small" | "comingsoon";
  href?: string;
  newTab?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export default function BaseButton({
  children,
  icon,
  iconPosition = "left",
  type = "primary",
  href,
  newTab = false,
  onClick,
  disabled = false,
}: BaseButtonProps) {
  const baseClasses = {
    primary:
      "w-fit flex items-center gap-3 rounded-lg bg-primary p-4 px-6 font-semibold text-white tracking-[0.016rem] hover:bg-primary-dark",
    secondary:
      "w-fit flex items-center gap-3 rounded-lg bg-white p-4 px-6 font-semibold text-black border border-black tracking-[0.016rem] hover:bg-black hover:text-white",
    small:
      "w-fit flex items-center gap-3 rounded-lg bg-primary p-2 px-4 font-medium text-white tracking-[0.014rem] hover:bg-primary-dark",
    comingsoon:
      "w-fit flex items-center gap-3 rounded-lg bg-gray-300 p-4 px-6 font-semibold text-gray-500 tracking-[0.016rem] cursor-not-allowed relative overflow-hidden",
  }[type];

  const disabledClass =
    disabled && type !== "comingsoon" ? "opacity-50 cursor-not-allowed" : "";
  const classes = `${baseClasses} ${disabledClass}`;

  if (type === "comingsoon") {
    return (
      <div className={classes} title="Coming soon" aria-label="Coming soon">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 10px, #888 10px, #888 20px)",
              zIndex: 1,
            }}
          ></div>
        </div>
        <span className="relative z-10">{children}</span>
      </div>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={newTab ? "_blank" : "_self"}
      >
        {iconPosition === "left" && icon}
        {children}
        {iconPosition === "right" && icon}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </button>
  );
}
