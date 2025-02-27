import React from "react";
import BaseButton from "./BaseButton";
import ArrowIcon from "@/public/icons/arrow.svg";

type Props = {
  href: string;
  newTab?: boolean;
  children?: React.ReactNode;
  type?: "primary" | "secondary";
  hideIcon?: boolean;
};

export default function BaseLink({
  href,
  newTab = false,
  children,
  type = "primary",
  hideIcon = false,
}: Props) {
  return (
    <BaseButton
      href={href}
      newTab={newTab}
      type={type}
      icon={
        hideIcon ? undefined : <ArrowIcon width={15} transform="rotate(-45)" />
      }
      iconPosition="right"
    >
      {children}
    </BaseButton>
  );
}
