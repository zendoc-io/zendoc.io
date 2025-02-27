import React from "react";
import Link from "next/link";
import RoundedIcon from "@/src/components/common/RoundedIcon";
import GithubIcon from "@/public/icons/github.svg";
import RedditIcon from "@/public/icons/reddit.svg";
import DiscordIcon from "@/public/icons/discord.svg";
import FooterLink from "@/src/components/footer/FooterLink";
import Header from "@/src/components/header/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const paths: {
    name: string;
    link: string;
    subpaths?: {
      name: string;
      link: string;
      description?: string;
    }[];
  }[] = [
    { name: "Home", link: "/" },
    { name: "Feature roadmap", link: "/feature-roadmap" },
    { name: "Transparency", link: "/transparency" },
  ];

  return (
    <div>
      <header>
        <Header paths={paths} />
      </header>
      <main>{children}</main>
      <footer className="bg-primary px-3 py-5 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="mb-3 text-lg font-semibold">Zendoc</p>
            <ul className="grid gap-2">
              <li>
                <FooterLink href="/feature-roadmap">Feature roadmap</FooterLink>
              </li>
              <li>
                <FooterLink href="/transparency">Transparency</FooterLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <Link href="https://www.reddit.com/r/Zendoc/" target="_blank">
              <RoundedIcon
                size="lg"
                background="bg-white"
                color="text-primary"
                className="hover:border-2 hover:border-white hover:bg-primary hover:text-white"
              >
                <RedditIcon width={24} />
              </RoundedIcon>
            </Link>
            <Link href="https://discord.gg/RSpKEwDdeA" target="_blank">
              <RoundedIcon
                size="lg"
                background="bg-white"
                color="text-primary"
                className="hover:border-2 hover:border-white hover:bg-primary hover:text-white"
              >
                <DiscordIcon width={24} />
              </RoundedIcon>
            </Link>
            <Link href="https://github.com/zendoc-io" target="_blank">
              <RoundedIcon
                size="lg"
                background="bg-white"
                color="text-primary"
                className="hover:border-2 hover:border-white hover:bg-primary hover:text-white"
              >
                <GithubIcon width={24} />
              </RoundedIcon>
            </Link>
          </div>
          <div>
            <p className="mb-3 mt-5 text-sm">
              © 2023 Zendoc. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <FooterLink href="/legal/imprint">Imprint</FooterLink>
              <FooterLink href="/legal/privacy-policy">
                Privacy policy
              </FooterLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
