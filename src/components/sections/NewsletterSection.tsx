"use client";

import React, { useState, useId } from "react";
import BaseInput from "../common/BaseInput";
import BaseButton from "../common/BaseButton";
import RoundedIcon from "../common/RoundedIcon";
import GithubIcon from "@/public/icons/github.svg";
import RedditIcon from "@/public/icons/reddit.svg";
import DiscordIcon from "@/public/icons/discord.svg";
import Link from "next/link";
import { useEffect } from "react";

export default function NewsletterSection() {
  const uniqueId = useId();
  const [email, setEmail] = useState("");
  const [extensive, setExtensive] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [toast, setToast] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
  }>({ visible: false, type: "success", message: "" });

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, visible: false });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({
      visible: true,
      type,
      message,
    });
  };

  const handleSubmit = async () => {
    if (!email) {
      showToast("error", "Please enter your email address");
      return;
    }

    setStatus({ type: "loading", message: "Subscribing..." });

    try {
      const response = await fetch("/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, extensive }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to subscribe");
      }

      setStatus({ type: "idle", message: "" });
      showToast("success", "Thank you for subscribing!");
      setEmail("");
      setExtensive(false);
    } catch (error) {
      setStatus({ type: "idle", message: "" });
      showToast(
        "error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <div className="md:mx-auto md:flex md:max-w-6xl">
      <div className="mx-auto max-w-6xl px-3 md:border-r-2 md:pr-8">
        <h2 className="mb-3 text-3xl font-semibold">Stay up to date</h2>
        <p className="mb-6">
          Get the latest updates and feature releases delivered straight to your
          inbox.
        </p>
        <div className="grid gap-4">
          <BaseInput
            placeholder="Your E-Mail"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`more-info-${uniqueId}`}
              checked={extensive}
              onChange={(e) => setExtensive(e.target.checked)}
            />
            <label htmlFor={`more-info-${uniqueId}`}>
              I also want non-release related information.
            </label>
          </div>
          <BaseButton
            type="secondary"
            onClick={handleSubmit}
            disabled={status.type === "loading"}
          >
            {status.type === "loading" ? "Subscribing..." : "Subscribe"}
          </BaseButton>
        </div>
      </div>
      <div className="my-4 h-[2px] bg-white md:hidden"></div>
      <div className="mx-auto max-w-6xl px-3 md:pl-8">
        <h2 className="mb-3 text-3xl font-semibold">Join the community</h2>
        <p className="mb-7">
          Engage with our community, ask questions and suggest features.
        </p>
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
      </div>

      {toast.visible && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green text-white"
              : "bg-red text-white"
          }`}
        >
          <div className="text-sm font-medium">{toast.message}</div>
          <button
            onClick={() => setToast({ ...toast, visible: false })}
            className="ml-2 grid h-5 w-5 place-content-center rounded-full bg-white bg-opacity-20 text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
