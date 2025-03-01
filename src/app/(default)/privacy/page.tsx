import React from "react";

interface ThirdPartyService {
  name: string;
  url: string;
}

export default function PrivacyPolicy() {
  const thirdPartyServices: ThirdPartyService[] = [
    {
      name: "Google Analytics",
      url: "https://support.google.com/analytics/answer/7318509?hl=en",
    },
  ];

  return (
    <div>
      <div className="mx-auto max-w-4xl bg-white p-8 pb-12 pt-24 text-gray-800">
        <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

        <div className="mb-6">
          <p className="mb-2 text-sm">Last Updated: March 1, 2025</p>
          <p className="mb-4 italic">
            This Privacy Policy describes how Zendoc ("we", "us", or "our")
            collects, uses, and discloses your personal information when you
            visit or use https://zendoc.io (the "Website").
          </p>
        </div>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Information We Collect
          </h2>

          <div className="mb-4">
            <h3 className="mb-2 text-xl font-medium">Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li>
                Contact information (such as name, email address, mailing
                address, and phone number)
              </li>
              <li>
                Communication information (such as messages sent through our
                contact forms)
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-xl font-medium">
              Cookies and Similar Technologies
            </h3>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our Website and hold certain information. Cookies are files
              with a small amount of data which may include an anonymous unique
              identifier.
            </p>
            <p className="mt-2">
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our Website.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            How We Use Your Information
          </h2>
          <p>
            We use your personal information for various purposes, including to:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>
              Send administrative information, such as updates, security alerts,
              and support messages
            </li>
            <li>Respond to comments, questions, and requests</li>
            <li>
              Communicate about promotions, upcoming events, and other news
              about products and services
            </li>
            <li>
              Protect, investigate, and deter against fraudulent, unauthorized,
              or illegal activity
            </li>
            <li>Comply with our legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Third-Party Services</h2>
          <p>
            We may use third-party services that collect, monitor, and analyze
            data to improve our service's functionality. These third-party
            service providers have their own privacy policies addressing how
            they use such information.
          </p>

          {thirdPartyServices.length > 0 && (
            <div className="mt-2">
              <p>We currently use the following third-party services:</p>
              <ul className="ml-6 mt-2 list-disc space-y-1">
                {thirdPartyServices.map((service, index) => (
                  <li key={index}>
                    <a className="text-blue-700" href={service.url}>
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Data Retention</h2>
          <p>
            We will retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law. In general,
            we keep most data for approximately 1 year after your last use of
            our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Data Security</h2>
          <p>
            The security of your data is important to us. We strive to use
            commercially acceptable means to protect your personal information,
            but we cannot guarantee its absolute security. We employ various
            security measures to maintain the safety of your personal
            information when you enter, submit, or access your personal
            information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date at the top of this Privacy
            Policy.
          </p>
          <p className="mt-2">
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">GDPR Rights</h2>
          <p>
            If you are a resident of the European Union, you have the following
            data protection rights:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              The right to access, update, or delete the information we have on
              you
            </li>
            <li>
              The right of rectification—to have your information rectified if
              it is inaccurate or incomplete
            </li>
            <li>The right to object to our processing of your personal data</li>
            <li>
              The right of restriction—to request that we restrict the
              processing of your personal information
            </li>
            <li>
              The right to data portability—to receive a copy of your personal
              data in a structured, machine-readable format
            </li>
            <li>
              The right to withdraw consent at any time where we relied on your
              consent to process your personal information
            </li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, please contact us at
            contact@zendoc.io.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">CCPA Rights</h2>
          <p>
            If you are a California resident, you have the following rights
            under the California Consumer Privacy Act (CCPA):
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              The right to know about the personal information we collect, use,
              disclose, and sell
            </li>
            <li>The right to request deletion of your personal information</li>
            <li>
              The right to opt-out of the sale of your personal information
            </li>
            <li>
              The right to non-discrimination for exercising your CCPA rights
            </li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, please contact us at
            contact@zendoc.io .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <div className="mt-2">
            <p>Merckel & Witzdam GbR</p>
            <p>Email: contact@zendoc.io</p>
            <p>Website: https://zendoc.io</p>
          </div>
        </section>

        <footer className="mt-12 border-t border-gray-200 pt-4 text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Merckel u. Witzdam GbR. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
