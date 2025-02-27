"use client";

import Link from "next/link";
import React from "react";
import LogoIcon from "@/public/logo.svg";
import BurgerIcon from "@/public/icons/burger.svg";
import BurgerMenu from "@/src/components/header/BurgerMenu";
import BaseLink from "../common/BaseLink";

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
      <div className="fixed left-1/2 top-0 z-10 mt-3 flex w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 transform justify-between rounded-lg border bg-white px-3">
        <Link href="/" className="my-auto py-3 md:py-0">
          <LogoIcon width={130} />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {paths.map((path, index) => (
            <div key={index}>
              {path.subpaths ? (
                <div className="group relative py-4 transition-colors hover:text-primary">
                  <div className="link--dropdown mr-4 cursor-pointer">
                    {path.name}
                  </div>
                  <div className="pointer-events-none absolute left-0 top-full w-64 border-t-2 border-primary bg-white px-2 pt-[17px] text-black opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="grid">
                      {path.subpaths.map((subpath) => (
                        <Link
                          key={subpath.link}
                          href={subpath.link}
                          className="w-fit px-3 pb-3 hover:text-primary"
                        >
                          {subpath.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={path.link}
                  href={path.link}
                  className="block py-4 transition-colors hover:text-primary"
                >
                  {path.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setShowBurger(true)}>
          <BurgerIcon width={27} />
        </button>
        <div className="hidden items-center gap-2 md:flex">
          <BaseLink href="https://github.com/zendoc-io" newTab type="small">
            GitHub
          </BaseLink>
        </div>
      </div>
      <BurgerMenu
        paths={paths}
        show={showBurger}
        close={() => setShowBurger(false)}
      />
    </div>
  );
}
