"use client";

import Link from "next/link";
import React from "react";
import LogoIcon from "@/public/logo.svg";
import BurgerIcon from "@/public/icons/burger.svg";
import BurgerMenu from "@/src/components/header/BurgerMenu";

type Props = {
  paths: {
    name: string;
    link: string;
    subpaths?: {
      name: string;
      link: string;
      description?: string;
    }[];
  }[];
};

export default function Header({ paths }: Props) {
  const [showBurger, setShowBurger] = React.useState(false);

  return (
    <div>
      <div className="fixed left-1/2 top-0 z-10 mt-3 flex w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 transform justify-between rounded-lg border bg-white p-3">
        <Link href="/">
          <LogoIcon width={130} />
        </Link>
        <button onClick={() => setShowBurger(true)}>
          <BurgerIcon width={27} />
        </button>
      </div>
      <BurgerMenu
        paths={paths}
        show={showBurger}
        close={() => setShowBurger(false)}
      />
    </div>
  );
}
