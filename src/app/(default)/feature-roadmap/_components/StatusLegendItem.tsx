import React from "react";
import StatusIndicator from "./StatusIndicator";
import type { StatusIndicatorProps } from "./StatusIndicator";

type Props = {
  status: StatusIndicatorProps["status"];
  children?: React.ReactNode;
};

export default function StatusLegendItem({ status, children }: Props) {
  return (
    <div className="flex items-center gap-2">
      <StatusIndicator status={status} />
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
