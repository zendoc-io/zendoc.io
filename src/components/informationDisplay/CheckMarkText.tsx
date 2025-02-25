import React from "react";
import CheckMarkIcon from "@/public/icons/checkmark.svg";
import RoundedIcon from "../common/RoundedIcon";

type Props = {
  children: React.ReactNode;
};

export default function CheckMarkText({ children }: Props) {
  return (
    <div className="flex gap-2">
      <RoundedIcon size="sm">
        <CheckMarkIcon width={12} />
      </RoundedIcon>
      <div>{children}</div>
    </div>
  );
}
