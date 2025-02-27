"use client";

import React from "react";
import ExpandableContainer from "@/src/components/informationDisplay/ExpandableContainer";

type Props = {
  className?: string;
  containers: {
    title: React.ReactNode;
    color: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    defaultExpanded?: boolean;
  }[];
};

export default function ExpandableContainers({ className, containers }: Props) {
  const [expanded, setExpanded] = React.useState<number | null>(null);

  React.useEffect(() => {
    for (const [index, container] of containers.entries()) {
      if (container.defaultExpanded) {
        setExpanded(index);
        break;
      }
    }
  }, [containers]);

  function expand(index: number) {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  }

  return (
    <div className={className}>
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
