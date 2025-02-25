import React from "react";
import Image from "next/image";

type Props = {
  image: { src: string; alt: string; width: number; height: number };
  title: string;
  children: React.ReactNode;
};

export default function SideSection({ image, title, children }: Props) {
  return (
    <div>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="mx-auto mb-8"
      />
      <h3 className="mb-3 text-2xl font-semibold">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
