"use client";

import React, { useState, useEffect } from "react";
import LogoIcon from "@/public/logo.svg";
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
  show: boolean;
  close(): void;
};
export default function BurgerMenu({ paths, show, close }: Props) {
  const [expandedPaths, setExpandedPaths] = useState<Record<string, boolean>>(
    {},
  );
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setAnimationReady(true);
      }, 50);
    } else {
      setAnimationReady(false);
    }
  }, [show]);

  const toggleSubpaths = (pathName: string) => {
    setExpandedPaths((prev) => ({
      ...prev,
      [pathName]: !prev[pathName],
    }));
  };

  return (
    <div
      className={`fixed right-0 top-0 z-50 h-full w-full bg-white transition-all duration-500 ease-in-out ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="mb-4 flex justify-between px-4 pt-4">
        <LogoIcon width={130} />
        <button
          className="ml-auto grid h-12 w-12 place-content-center rounded-full bg-primary text-white"
          onClick={close}
        >
          <span className="block text-2xl font-extralight">✕</span>
        </button>
      </div>
      <h2 className="ml-6 mt-10 text-xs uppercase opacity-60">Navigation</h2>
      <div className="mt-4 h-[1px] w-full bg-gray-500"></div>
      <nav className="px-6">
        {paths.map((path, pathIndex) =>
          path.subpaths ? (
            <div className="block text-3xl" key={`path-${pathIndex}`}>
              <button
                className={`link--dropdown flex w-full items-center justify-between py-4 font-medium transition-transform duration-500 ease-out ${
                  animationReady ? "translate-x-0" : "translate-x-full"
                }`}
                style={{
                  transitionDelay: animationReady
                    ? `${pathIndex * 100}ms`
                    : "0ms",
                }}
                onClick={() => toggleSubpaths(path.name)}
              >
                <span>{path.name}</span>
              </button>
              <div className={expandedPaths[path.name] ? "block" : "hidden"}>
                {path.subpaths.map((subpath, subpathIndex) => (
                  <a
                    className={`block px-4 py-3 text-xl font-light transition-transform duration-500 ease-out ${
                      expandedPaths[path.name]
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
                    style={{
                      transitionDelay: expandedPaths[path.name]
                        ? `${(pathIndex + subpathIndex + 1) * 100}ms`
                        : "0ms",
                    }}
                    href={subpath.link}
                    key={`subpath-${pathIndex}-${subpathIndex}`}
                  >
                    {subpath.name}
                    {subpath.description && (
                      <span className="mt-1 block text-sm text-gray-500">
                        {subpath.description}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a
              className={`block py-4 text-3xl font-medium transition-transform duration-500 ease-out ${
                animationReady ? "translate-x-0" : "translate-x-full"
              }`}
              style={{
                transitionDelay: animationReady
                  ? `${pathIndex * 100}ms`
                  : "0ms",
              }}
              href={path.link}
              key={`path-${pathIndex}`}
            >
              {path.name}
            </a>
          ),
        )}
      </nav>
    </div>
  );
}
