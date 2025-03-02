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
      const response = await fetch("/api/newsletter/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, extensive }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to subscribe");
      }

      const body = await response.json();
      if (!body.message) {
        console.error("Couldn't find body.message from /api/newsletter/signup");
      }

      setStatus({ type: "idle", message: "" });
      showToast(
        "success",
        body.message || "Verification email sent. Please check your inbox.",
      );
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
            <div className="relative">
              <input
                type="checkbox"
                id={`more-info-${uniqueId}`}
                checked={extensive}
                onChange={(e) => setExtensive(e.target.checked)}
                className="peer flex h-5 w-5 cursor-pointer appearance-none items-center justify-center rounded border-2 border-white bg-transparent transition-all checked:border-white checked:bg-white"
              />
              <div className="pointer-events-none absolute left-[2px] top-[2px] flex h-4 w-4 items-center justify-center text-black opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 14 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5L5 9.5L13 1.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

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
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg transition-all duration-300 ${toast.type === "success"
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
