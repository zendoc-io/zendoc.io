"use client";

import React from "react";
import ExtendIcon from "@/public/icons/extend-plus.svg";

type Props = {
  title: string;
  color: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onOpen: () => void;
  expanded: boolean;
};

export default function ExpandableContainer({
  title,
  color,
  icon,
  children,
  onOpen,
  expanded,
}: Props) {
  return (
    <button
      onClick={onOpen}
      className="overflow-hidden rounded-lg border border-gray-200 p-3 text-left"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="grid h-12 w-12 shrink-0 place-content-center rounded-lg bg-black"
            style={{ color: color }}
          >
            {icon}
          </div>
          <div className="font-medium">{title}</div>
        </div>
        <div>
          <ExtendIcon
            height={26}
            transform={expanded ? "rotate(45)" : undefined}
            className="transition-transform"
            color={color}
          />
        </div>
      </div>
      <div
        className={`${expanded ? "mt-4 max-h-[200px]" : "max-h-0"} overflow-hidden text-gray-500 transition-all duration-300`}
      >
        {children}
      </div>
    </button>
  );
}
