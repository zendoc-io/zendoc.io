import BaseLink from "@/src/components/common/BaseLink";
import React from "react";
import StatusLegendItem from "./_components/StatusLegendItem";
import ExpandableContainers from "@/src/components/informationDisplay/ExpandableContainers";
import StatusIndicator from "./_components/StatusIndicator";
import NewsletterSection from "@/src/components/sections/NewsletterSection";
import GitHubIcon from "@/public/icons/github.svg";

export default function FeatureRoadmapPage() {
  const style = {
    backgroundImage: 'url("/dotted-bg.svg")',
    backgroundPosition: "bottom",
  };

  const featureRoadmap: {
    title: string;
    status: "planned" | "current-objective" | "done";
    description: string;
    expanded?: boolean;
  }[] = [
      {
        title: "A solid project base",
        status: "current-objective",
        description:
          "This is more of a necessity than a feature. Zendoc needs a solid foundation including secure authentication, efficient data access and lots more.",
        expanded: true,
      },
      {
        title: "File storage",
        status: "planned",
        description: "test",
      },
      {
        title: "Custom markdown documents",
        status: "planned",
        description: "test",
      },
      {
        title: "Uptime monitoring",
        status: "planned",
        description: "test",
      },
    ];

  return (
    <div>
      <section style={style} className="pb-20 pt-11">
        <div className="mx-auto max-w-6xl px-3">
          <h1 className="mt-16 text-4xl font-semibold">Feature Roadmap</h1>
          <p className="my-4 text-gray-600">
            Here you can see which features already exist and which ones are
            coming in the future.
          </p>
          <BaseLink href="#stay-up-to-date" hideIcon>
            Stay up to date
          </BaseLink>
        </div>
      </section>
      <section className="mx-auto mb-10 max-w-6xl px-3">
        <div className="mb-6 grid gap-2">
          <StatusLegendItem status="planned">Planned</StatusLegendItem>
          <StatusLegendItem status="current-objective">
            Current objective
          </StatusLegendItem>
          <StatusLegendItem status="done">Done</StatusLegendItem>
        </div>
        <div>
          <ExpandableContainers
            className="flex flex-col gap-4"
            containers={featureRoadmap.map((feature) => ({
              title: (
                <div className="flex items-center gap-2">
                  <StatusIndicator status={feature.status} />
                  <div>{feature.title}</div>
                </div>
              ),
              color: "white",
              children: <p>{feature.description}</p>,
              defaultExpanded: feature.expanded,
            }))}
          />
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
