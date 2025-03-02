"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BaseLink from "@/src/components/common/BaseLink";

export default function VerifyNewsletter() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const statusParam = searchParams.get("status");

  const [status, setStatus] = useState<{
    type: "loading" | "success" | "error" | "expired" | "already-verified";
    message: string;
  }>({
    type: "loading",
    message: token
      ? "Processing your verification..."
      : "Waiting for verification information...",
  });

  useEffect(() => {
    if (statusParam) {
      switch (statusParam) {
        case "success":
          setStatus({
            type: "success",
            message:
              "Your email has been successfully verified! You are now subscribed to the Zendoc newsletter.",
          });
          break;
        case "invalid":
          setStatus({
            type: "error",
            message:
              "Invalid verification token. Please check your email and try again.",
          });
          break;
        case "expired":
          setStatus({
            type: "expired",
            message:
              "This verification link has expired. Please request a new verification email.",
          });
          break;
        case "already-verified":
          setStatus({
            type: "already-verified",
            message:
              "Your email is already verified and subscribed to our newsletter.",
          });
          break;
        case "error":
          setStatus({
            type: "error",
            message:
              "Verification failed. Please try again or contact support.",
          });
          break;
        default:
          setStatus({
            type: "error",
            message:
              "An unknown error occurred. Please try again or contact support.",
          });
      }
      return;
    }

    // If no status parameter but we have a token, it means the user accessed
    // this page directly with a token instead of through the redirect
    if (token) {
      window.location.href = `/api/newsletter/verify?token=${token}`;
      return;
    }

    // If no token and no status, show an error
    if (!token && !statusParam) {
      setStatus({
        type: "error",
        message:
          "No verification information provided. Please check your email for the verification link.",
      });
    }
  }, [token, statusParam]);

  return (
    <div className="min-h-[calc(76vh)]">
      <div className="mx-auto max-w-4xl bg-white px-4 pb-12 pt-24 text-gray-800">
        <h1 className="mb-6 text-3xl font-bold">Email Verification</h1>

        <div className="mb-10">
          {status.type === "loading" && (
            <div className="rounded-md bg-blue-100 p-4">
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
            <div className="rounded-md bg-green p-4 text-white">
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

          {status.type === "error" && (
            <div className="rounded-md bg-red p-4 text-white">
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
        </div>

        {status.type === "success" && (
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">What to expect next</h2>
            <p className="mb-4">
              You'll start receiving our newsletter with updates on:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Product updates and release notifications</li>
              <li>News about new features and improvements</li>
              <li>Tips for getting the most out of Zendoc</li>
              <li>Other news and announcements from our team</li>
            </ul>

            <div className="mt-6">
              <BaseLink href="/" type="primary">
                Return to Homepage
              </BaseLink>
            </div>
          </div>
        )}

        {status.type === "error" && (
          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="mb-4 text-xl font-semibold">What can you do?</h2>
            <ul className="ml-6 list-disc space-y-2">
              <li>Check if you clicked the correct link from your email</li>
              <li>Try signing up again with the same email address</li>
              <li>
                If you continue having issues, please contact our support team
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-4">
              <BaseLink href="/#stay-up-to-date" type="primary">
                Try Again
              </BaseLink>
              <BaseLink href="/" type="secondary">
                Return to Homepage
              </BaseLink>
            </div>
          </div>
        )}

        {status.type === "loading" && (
          <div className="flex h-40 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
}
