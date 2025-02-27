import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  newTab?: boolean;
  children?: React.ReactNode;
};

export default function FooterLink({ href, newTab = false, children }: Props) {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : "_self"}
      className="underline-offset-2 hover:underline"
    >
      {children}
    </Link>
  );
}
