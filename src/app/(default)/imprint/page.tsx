import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Imprint - Zendoc",
  description:
    "Use Zendoc to automate your documentation and keep track of your infrastructure.",
};

export default function Imprint() {
  const companyData = {
    name: "Merckel u. Witzdam GbR",
    legalForm: "Gesellschaft bürgerlichen Rechts",
    streetAddress: "Im Winkel 23",
    city: "45896 Gelsenkirchen",
    country: "Germany",
    phone: "+491759521503",
    email: "contact@zendoc.io",
    website: "https://zendoc.io",
    vatId: "DE354662415",
    managingDirectors: ["Pierre-Maurice Merckel", "Tim Witzdam"],
    responsibleForContent: "Pierre-Maurice Merckel",
    lastUpdated: "March 1, 2025",
  };

  return (
    <div className="mx-auto max-w-4xl bg-white p-8 pt-24 text-gray-800">
      <h1 className="mb-6 text-3xl font-bold">Imprint</h1>

      <div className="mb-6">
        <p className="mb-2 text-sm">Last Updated: {companyData.lastUpdated}</p>
        <p className="mb-4 italic">
          Information provided according to legal requirements.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Company Information</h2>

        <div className="space-y-2">
          <p>
            <strong>{companyData.name}</strong>
          </p>
          <p>{companyData.legalForm}</p>
          <p>{companyData.streetAddress}</p>
          <p>{companyData.city}</p>
          <p>{companyData.country}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>

        <div className="space-y-2">
          <p>
            <strong>Phone:</strong> {companyData.phone}
          </p>
          <a className="block" href={`mailto:${companyData.email}`}>
            <strong>Email:</strong> {companyData.email}
          </a>
          <a className="block" href={companyData.website}>
            <strong>Website:</strong> {companyData.website}
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Registration Information
        </h2>

        <div className="space-y-2">
          <p>
            <strong>VAT Identification Number:</strong> {companyData.vatId}
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Legally Represented By</h2>

        <div className="space-y-2">
          <p>Managing Directors:</p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            {companyData.managingDirectors.map((director, index) => (
              <li key={index}>{director}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Responsibility for Content
        </h2>

        <div className="space-y-2">
          <p>
            <strong>
              Responsible for content according to § 55 Abs. 2 RStV:
            </strong>
          </p>
          <p>{companyData.responsibleForContent}</p>
          <p>{companyData.streetAddress}</p>
          <p>{companyData.city}</p>
          <p>{companyData.country}</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Disclaimer</h2>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-xl font-medium">Liability for Content</h3>
            <p>
              The contents of our pages have been created with the utmost care.
              However, we cannot guarantee the contents' accuracy, completeness,
              or topicality. According to statutory provisions, we are
              furthermore responsible for our own content on these web pages. In
              this matter, please note that we are not obliged to monitor the
              transmitted or saved information of third parties, or investigate
              circumstances pointing to illegal activity. Our obligations to
              remove or block the use of information under generally applicable
              laws remain unaffected by this as per §§ 8 to 10 of the Telemedia
              Act (TMG).
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-medium">Liability for Links</h3>
            <p>
              Our offer includes links to external third-party websites, the
              content of which we have no influence over. Therefore, we cannot
              assume any liability for these external contents. The respective
              provider or operator of the pages is always responsible for the
              contents of the linked pages. The linked pages were checked for
              possible legal violations at the time of linking. Illegal contents
              were not recognizable at the time of linking. However, a permanent
              control of the contents of the linked pages is not reasonable
              without concrete evidence of a violation of law. Upon notification
              of violations, we will remove such links immediately.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-medium">Copyright</h3>
            <p>
              The contents and works created by the site operators on these
              pages are subject to German copyright law. The reproduction,
              processing, distribution, and any kind of exploitation outside the
              limits of copyright require the written consent of the respective
              author or creator. Downloads and copies of this site are only
              permitted for private, non-commercial use. Insofar as the content
              on this site was not created by the operator, the copyrights of
              third parties are respected. In particular, third-party content is
              marked as such. Should you nevertheless become aware of a
              copyright infringement, please inform us accordingly. Upon
              notification of violations, we will remove such contents
              immediately.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-12 border-t border-gray-200 pt-4 text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} {companyData.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
