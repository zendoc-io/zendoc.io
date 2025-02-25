"use client";

import React from "react";
import ExpandableContainer from "./ExpandableContainer";

type Props = {
  containers: {
    title: string;
    color: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }[];
};

export default function ExpandableContainers({ containers }: Props) {
  const [expanded, setExpanded] = React.useState<number | null>(null);

  function expand(index: number) {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  }

  return (
    <div className="grid gap-4">
      {containers.map((container, index) => (
        <ExpandableContainer
          key={index}
          title={container.title}
          color={container.color}
          icon={container.icon}
          onOpen={() => expand(index)}
          expanded={expanded === index}
        >
          {container.children}
        </ExpandableContainer>
      ))}
    </div>
  );
}
