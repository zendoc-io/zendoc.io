import React from "react";
import BaseInput from "../common/BaseInput";
import BaseButton from "../common/BaseButton";
import RoundedIcon from "../common/RoundedIcon";
import GithubIcon from "@/public/icons/github.svg";
import RedditIcon from "@/public/icons/reddit.svg";
import DiscordIcon from "@/public/icons/discord.svg";
import Link from "next/link";

export default function NewsletterSection() {
  const id = Math.random().toString(16).substring(2);

  return (
    <div>
      <div className="px-3">
        <h2 className="mb-7 text-3xl font-semibold">Stay up to date</h2>
        <p className="mb-5">
          Get the latest updates and feature releases delivered straight to your
          inbox.
        </p>
        <div className="grid gap-4">
          <BaseInput placeholder="Your E-Mail" />
          <div className="flex items-center gap-2">
            <input type="checkbox" id={`more-info-${id}`} />
            <label htmlFor={`more-info-${id}`}>
              I also want non-release related information.
            </label>
          </div>
          <BaseButton type="secondary">Subscribe</BaseButton>
        </div>
      </div>
      <div className="my-4 h-[2px] bg-white"></div>
      <div className="px-3">
        <h2 className="mb-7 text-3xl font-semibold">Join the community</h2>
        <p className="mb-7">
          Engage with our community, ask questions and suggest features.
        </p>
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
      </div>
    </div>
  );
}
