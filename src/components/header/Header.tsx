"use client";

import Link from "next/link";
import React, { useRef, useEffect } from "react";
import LogoIcon from "@/public/logo.svg";
import BurgerIcon from "@/public/icons/burger.svg";
import BurgerMenu from "@/src/components/header/BurgerMenu";
import BaseLink from "../common/BaseLink";

type path = {
  name: string;
  link: string;
  subpaths?: {
    name: string;
    link: string;
    description?: string;
  }[];
};

type Props = {
  paths: path[];
};

export default function Header({ paths }: Props) {
  const [showBurger, setShowBurger] = React.useState(false);
  const [currentHover, setCurrentHover] = React.useState<path | null>(null);
  const linkRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleMouseLeave = (e: MouseEvent) => {
    if (
      linkRef.current &&
      dropdownRef.current &&
      !linkRef.current.contains(e.relatedTarget as Node) &&
      !dropdownRef.current.contains(e.relatedTarget as Node)
    ) {
      setCurrentHover(null);
    }
  };

  useEffect(() => {
    return () => {
      if (linkRef.current) {
        linkRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (dropdownRef.current) {
        dropdownRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.addEventListener("mouseleave", handleMouseLeave);
    }
    if (dropdownRef.current) {
      dropdownRef.current.addEventListener("mouseleave", handleMouseLeave);
    }
  }, [currentHover]);

  return (
    <div>
      <div
        className={`fixed left-1/2 top-0 z-10 mt-3 flex w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 transform justify-between rounded-lg border bg-white px-3 ${
          currentHover ? "rounded-b-none" : ""
        }`}
      >
        <Link href="/" className="my-auto py-3 md:py-0">
          <LogoIcon width={130} />
        </Link>
        <nav className="hidden items-center md:flex">
          {paths.map((path, index) => (
            <div key={index}>
              {path.subpaths ? (
                <div
                  ref={linkRef}
                  onMouseOver={() => setCurrentHover(path)}
                  className={`relative px-3 py-4 transition-colors hover:text-primary ${
                    currentHover === path ? "text-primary" : ""
                  }`}
                >
                  <div className="link--dropdown mr-1 cursor-pointer">
                    {path.name}
                  </div>
                </div>
              ) : (
                <Link
                  key={path.link}
                  href={path.link}
                  className="block px-3 py-4 transition-colors hover:text-primary"
                >
                  {path.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        {currentHover && (
          <div
            ref={dropdownRef}
            onMouseOver={() => setCurrentHover(currentHover)}
            className={`absolute bottom-0 left-0 right-0 top-0 z-40 mt-[53.8px] h-80 w-full rounded-b-lg border-t-2 border-primary bg-white p-2 pt-4 text-black shadow-lg`}
          >
            <div className="flex flex-wrap">
              {currentHover.subpaths?.map((subpath, index) => (
                <Link
                  key={index}
                  href={subpath.link}
                  className="w-fit px-6 pb-6 text-lg transition-colors hover:text-primary"
                >
                  {subpath.name}
                  <div>
                    {subpath.description && (
                      <p className="text-sm text-gray-500">
                        {subpath.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
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
