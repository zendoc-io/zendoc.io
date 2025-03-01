import BaseLink from "@/src/components/common/BaseLink";
import React from "react";
import NewsletterSection from "@/src/components/sections/NewsletterSection";
import GitHubIcon from "@/public/icons/github.svg";

export default function FeatureRoadmapPage() {
  const style = {
    backgroundImage: 'url("/dotted-bg.svg")',
    backgroundPosition: "bottom",
  };

  return (
    <div>
      <section style={style} className="pb-20 pt-11">
        <div className="mx-auto max-w-6xl px-3">
          <h1 className="mt-16 text-4xl font-semibold">Transparency</h1>
          <p className="my-4 text-gray-600">
            We believe in open-source and general company transparency.
          </p>
          <BaseLink href="#stay-up-to-date" hideIcon>
            Stay up to date
          </BaseLink>
        </div>
      </section>
      <section className="mx-auto mb-10 grid max-w-6xl gap-12 px-3 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-3xl font-semibold">Data collection</h2>
          <div>
            We believe your infrastructure data belongs to you—not us. By
            design, our platform operates under the following principle: <br />
            <b>Zero automatic telemetry collection</b> We only offer a voluntary
            opt-in for <b>crash reports</b> and <b>anonymized statistics </b>
            such as: <br />
            <ol className="list-disc p-4">
              <li>20% of users have 32GB RAM</li>
              <li>The average homelab runs 15 services</li>
            </ol>
            The
            <b> crash/error reports</b> help us to improve Zendoc without you
            needing to open an issue.
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-3xl font-semibold">Future pricing</h2>
          <p>
            For personal use Zendoc will always stay free.
            <br />
            <br />
            For commercial use Zendoc will introduce a pricing model in the
            future. We think that this is a great opportunity for us to develop
            this project better.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-3xl font-semibold">Open-Source</h2>
          <p>
            Zendoc will stay open source forever.
            <br />
            <br />
            This allows us you to contribute directly to Zendoc. It’s also a key
            point for us to stay as transparent as possible.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-3xl font-semibold">Future ideas</h2>
          <p>
            🫵 You decide which features Zendoc should introduce next and what
            the projects focus should be.
          </p>
        </div>
      </section>
      <section className="bg-primary py-7 text-white" id="stay-up-to-date">
        <NewsletterSection />
      </section>
      <section className="relative mx-auto max-w-6xl overflow-hidden px-3 py-10 md:overflow-x-auto">
        <h2 className="mb-7 text-3xl font-semibold">Join us on GitHub</h2>
        <BaseLink href="https://github.com/zendoc-io" newTab type="secondary">
          Zendoc on GitHub
        </BaseLink>
        <div className="absolute -right-20 bottom-0 -z-10 text-[#F1F1F1] md:bottom-0 md:right-0">
          <GitHubIcon height={230} />
        </div>
      </section>
    </div>
  );
}
