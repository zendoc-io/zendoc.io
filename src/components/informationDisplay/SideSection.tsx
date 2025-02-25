import React from "react";
import Image from "next/image";

type Props = {
  image: { src: string; alt: string; width: number; height: number };
  title: string;
  children: React.ReactNode;
  direction?: "left" | "right";
};

export default function SideSection({
  image,
  title,
  children,
  direction = "left",
}: Props) {
  const classes = {
    left: "md:flex md:gap-12 md:text-left",
    right: "md:flex md:gap-12 md:text-left md:flex-row-reverse",
  }[direction];

  return (
    <div className={classes}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="mx-auto mb-8 max-h-[450px] w-full object-contain"
      />
      <div>
        <h3 className="mb-3 text-2xl font-semibold">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
}
