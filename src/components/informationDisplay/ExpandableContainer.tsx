"use client";

import React from "react";
import ExtendIcon from "@/public/icons/extend-plus.svg";

type Props = {
  title: string;
  color: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onOpen(): void;
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
      className={`h-[200px] flex-1 overflow-hidden rounded-lg border border-gray-200 p-3 text-left transition-all lg:flex lg:flex-col ${expanded ? "" : "flex-1"}`}
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center justify-between gap-3 lg:items-start">
        <div className="flex items-center gap-3 lg:flex-col lg:items-start">
          <div
            className={`grid h-12 w-12 shrink-0 place-content-center rounded-lg bg-black ${expanded && "lg:h-0"} transition-all duration-300`}
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
        className={`${expanded ? "mt-4 h-[100px]" : "h-0 w-0"} overflow-hidden text-gray-500 transition-all duration-300`}
      >
        {children}
      </div>
    </button>
  );
}
