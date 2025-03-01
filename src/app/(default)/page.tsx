import BaseLink from "@/src/components/common/BaseLink";
import EyeIcon from "@/public/icons/eye.svg";
import RobotIcon from "@/public/icons/robot.svg";
import NetworkIcon from "@/public/icons/network.svg";
import LockIcon from "@/public/icons/lock.svg";
import ExpandableContainers from "@/src/components/informationDisplay/ExpandableContainers";
import CheckMarkText from "@/src/components/informationDisplay/CheckMarkText";
import GitHubIcon from "@/public/icons/github.svg";
import NewsletterSection from "@/src/components/sections/NewsletterSection";
import SideSection from "@/src/components/informationDisplay/SideSection";
import Button from "@/src/components/common/BaseButton";

export default function Home() {
  const style = {
    backgroundImage: 'url("/dotted-bg.svg")',
    backgroundPosition: "bottom",
  };

  return (
    <div>
      <section style={style} className="px-3 py-[112px]">
        <h1 className="mt-16 text-center text-4xl font-semibold">
          Automate your Documentation
        </h1>
        <p className="mt-4 text-center text-gray-600">
          Eliminate the hassle of manual documentation.
          <br /> Save time and nerves.
        </p>
        <div className="mx-auto mt-6 w-fit">
          <BaseLink href="https://github.com/zendoc-io" newTab>
            Zendoc on GitHub
          </BaseLink>
        </div>
      </section>
      <section className="mx-auto mb-10 max-w-6xl px-3">
        <ExpandableContainers
          className="flex flex-col gap-4 lg:flex-row"
          containers={[
            {
              title: "Always keep track of your infrastructure.",
              color: "#C8E6FE",
              icon: <EyeIcon height={26} />,
              children: (
                <p>
                  All of documentation combined <b>in one place.</b>
                </p>
              ),
            },
            {
              title: "Automatically maintain documentation",
              color: "#C9FFE2",
              icon: <RobotIcon height={26} />,
              children: (
                <p>
                  Keep your documentation up to date all the time thanks to
                  Zendoc Agents. Zero intervention required.
                </p>
              ),
            },
            {
              title: "Seamless integration with your tools",
              color: "#E5E1F8",
              icon: <NetworkIcon height={26} />,
              children: (
                <p>
                  Integrate Zendoc Service Agents into your existing programs
                  and docker containers.
                </p>
              ),
            },
            {
              title: "Keep your data internal.",
              color: "#D8FAFF",
              icon: <LockIcon height={26} />,
              children: (
                <p>
                  We collect nothing automatically. You can opt-in to share
                  anonymous statistics and crash reports to help improve Zendoc,
                  but your infrastructure data always remains completely under
                  your control.
                </p>
              ),
            },
          ]}
        />
      </section>
      <section className="relative mx-auto max-w-6xl overflow-hidden px-3 pb-10 md:overflow-x-auto">
        <h2 className="mb-7 text-3xl font-semibold">
          Open source is transparency
        </h2>
        <div className="mb-7 grid gap-3">
          <CheckMarkText>
            See every single line in our public repos.
          </CheckMarkText>
          <CheckMarkText>
            Zendoc works completely without an internet connection
          </CheckMarkText>
          <CheckMarkText>Self-hosted by design</CheckMarkText>
        </div>
        <BaseLink href="https://github.com/zendoc-io" newTab type="secondary">
          Zendoc on GitHub
        </BaseLink>
        <div className="absolute -bottom-4 -right-20 -z-10 text-[#F1F1F1] md:-top-0 md:right-0">
          <GitHubIcon height={230} />
        </div>
      </section>
      <section className="bg-primary py-7 text-white">
        <NewsletterSection />
      </section>
      <section className="bg-black px-3 py-7 text-center text-white">
        <h2 className="mb-14 text-3xl font-semibold">How Zendoc works</h2>
        <div className="mx-auto grid max-w-6xl gap-32">
          <SideSection
            title="Zendoc Agents"
            image={{
              src: "/images/zendoc-agents.png",
              alt: "Zendoc Agents diagram",
              width: 1412,
              height: 760,
            }}
          >
            <p>
              Each server runs a Zendoc Server Agent that collects data for
              documentation. Each service includes a Zendoc Service Agent that
              reports data about the service itself.
            </p>
          </SideSection>
          <SideSection
            title="Automated updates"
            image={{
              src: "/images/automated-updates.png",
              alt: "Diagram of how automated updates work",
              width: 1320,
              height: 1574,
            }}
            direction="right"
          >
            <p>
              The Zendoc Engine will automatically detect and manage any changes
              that would otherwise require manual labor.
            </p>
          </SideSection>
          <SideSection
            title="Zendoc Instance"
            image={{
              src: "/images/zendoc-instance.png",
              alt: "Accessing Zendoc Instance diagram",
              width: 904,
              height: 488,
            }}
          >
            <p>
              You can access the Zendoc instance and retrieve all your
              information on the spot.
            </p>
          </SideSection>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-3 py-7">
        <h2 className="mb-7 text-3xl font-semibold">Ready to try Zendoc?</h2>
        <p className="mb-7 max-w-xl">
          Enjoy our live demo (when available), or for those who are further
          interested, simply visit our repository and interact with us directly.
        </p>
        <Button type="comingsoon">
          <p>View Demo</p>
        </Button>
        <div className="h-4"></div>
        <BaseLink href="https://github.com/zendoc-io" newTab>
          Zendoc on GitHub
        </BaseLink>
      </section>
      <section className="bg-primary py-5 text-white">
        <NewsletterSection />
      </section>
      <div className="h-[2px] bg-white"></div>
    </div>
  );
}
