import React from "react";
import LogoIcon from "@/public/logo.svg";
import BurgerIcon from "@/public/icons/burger.svg";
import Link from "next/link";
import RoundedIcon from "@/src/components/common/RoundedIcon";
import GithubIcon from "@/public/icons/github.svg";
import RedditIcon from "@/public/icons/reddit.svg";
import DiscordIcon from "@/public/icons/discord.svg";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <div className="fixed left-1/2 top-0 z-10 mt-3 flex w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 transform justify-between rounded-lg border bg-white p-3">
          <Link href="/">
            <LogoIcon width={130} />
          </Link>
          <button>
            <BurgerIcon width={27} />
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-primary px-3 py-5 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="mb-3 text-lg font-semibold">Zendoc</p>
            <ul className="grid gap-2">
              <li>
                <Link href="/feature-roadmap">Feature roadmap</Link>
              </li>
              <li>
                <Link href="/transparency">Transparency</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <Link href="https://www.reddit.com/r/Zendoc/" target="_blank">
              <RoundedIcon size="lg" background="bg-white" color="text-primary">
                <RedditIcon width={24} />
              </RoundedIcon>
            </Link>
            <Link href="https://discord.gg/RSpKEwDdeA" target="_blank">
              <RoundedIcon size="lg" background="bg-white" color="text-primary">
                <DiscordIcon width={24} />
              </RoundedIcon>
            </Link>
            <Link href="https://github.com/zendoc-io" target="_blank">
              <RoundedIcon size="lg" background="bg-white" color="text-primary">
                <GithubIcon width={24} />
              </RoundedIcon>
            </Link>
          </div>
          <div>
            <p className="mb-3 mt-5 text-sm">
              © 2023 Zendoc. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <Link href="/legal/imprint">Imprint</Link>
              <Link href="/legal/privacy-policy">Privacy policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
