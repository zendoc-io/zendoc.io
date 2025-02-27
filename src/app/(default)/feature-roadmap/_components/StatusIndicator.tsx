import React from "react";

export type StatusIndicatorProps = {
  status: "planned" | "current-objective" | "done";
};

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const classes = {
    planned: "bg-red",
    "current-objective": "bg-yellow",
    done: "bg-green",
  }[status];

  return <div className={`h-4 w-4 rounded-full ${classes}`} />;
}
