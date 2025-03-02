"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BaseLink from "../../../../components/common/BaseLink";
import BaseInput from "../../../../components/common/BaseInput";
import BaseButton from "../../../../components/common/BaseButton";
import { checkEmailRegEx } from "../../../../lib/validation";

export default function UnsubscribeNewsletter() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error" | "not-found";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  useEffect(() => {
    if (statusParam) {
      switch (statusParam) {
        case "success":
          setStatus({
            type: "success",
            message:
              "You have been successfully unsubscribed from the Zendoc newsletter.",
          });
          break;
        case "invalid":
          setStatus({
            type: "error",
            message:
              "Invalid unsubscribe token. Please try entering your email address below.",
          });
          break;
        case "not-found":
          setStatus({
            type: "not-found",
            message: "No active subscription was found for this email address.",
          });
          break;
        case "error":
          setStatus({
            type: "error",
            message:
              "An error occurred while processing your request. Please try again.",
          });
          break;
        default:
          setStatus({
            type: "idle",
            message: "",
          });
      }
    }
  }, [searchParams, statusParam]);

  const handleEmailUnsubscribe = async () => {
    if (!email) {
      setStatus({
        type: "error",
        message: "Please enter your email address",
      });
      return;
    }

    if (!checkEmailRegEx(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setStatus({ type: "loading", message: "Processing your request..." });

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 404) {
        setStatus({
          type: "not-found",
          message: "No active subscription was found for this email address.",
        });
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to unsubscribe");
      }

      setStatus({
        type: "success",
        message:
          "You have been successfully unsubscribed from the Zendoc newsletter.",
      });
      setEmail("");
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-[calc(76vh)]">
      <div className="mx-auto max-w-4xl bg-white px-4 pb-12 pt-24 text-gray-800">
        <h1 className="mb-6 text-3xl font-bold">Unsubscribe from Newsletter</h1>

        <div className="mb-8">
          <p className="mb-4">
            If you wish to unsubscribe from the Zendoc newsletter, you can do so
            using the form below.
          </p>
          <p className="italic text-gray-600">
            Once unsubscribed, you will no longer receive any communications
            from us.
          </p>
        </div>

        {status.type === "loading" && (
          <div className="mb-8 rounded-md bg-blue-100 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">
                  {status.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {status.type === "success" && (
          <div className="mb-8 rounded-md bg-green p-4 text-white">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium text-white">{status.message}</p>
              </div>
            </div>
          </div>
        )}

        {(status.type === "error" || status.type === "not-found") && (
          <div className="mb-8 rounded-md bg-red p-4 text-white">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium text-white">{status.message}</p>
              </div>
            </div>
          </div>
        )}

        {status.type !== "success" && (
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email Address
              </label>
              <BaseInput
                placeholder="Your Email"
                value={email}
                onChange={setEmail}
              />
              <p className="mt-2 text-sm text-gray-500">
                Enter the email address you used to subscribe to our newsletter.
              </p>
            </div>

            <BaseButton
              type="primary"
              onClick={handleEmailUnsubscribe}
              disabled={status.type === "loading"}
            >
              {status.type === "loading" ? "Processing..." : "Unsubscribe"}
            </BaseButton>
          </div>
        )}

        {status.type === "success" && (
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Thank you for being a subscriber
            </h2>
            <p className="mb-4">
              Your email address has been removed from our newsletter mailing
              list. You will no longer receive updates from Zendoc.
            </p>
            <p className="mb-6">
              If you ever want to resubscribe, you're welcome to sign up again
              through our website.
            </p>

            <div className="flex flex-wrap gap-4">
              <BaseLink href="/" type="primary">
                Return to Homepage
              </BaseLink>
              <BaseLink href="/#stay-up-to-date" type="secondary">
                Subscribe Again
              </BaseLink>
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-gray-200 pt-6 text-sm text-gray-600">
          <p>
            If you have any questions or need assistance, please contact our
            support team at{" "}
            <a href="mailto:contact@zendoc.io" className="text-primary">
              contact@zendoc.io
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
