import { Link } from "react-router-dom";

const LAST_UPDATED = "March 5, 2026";

const sections = [
  {
    title: "1. What Community Shelf Is",
    paragraphs: [
      `Community Shelf is a free, hosted platform that lets anyone create and run a community lending library online. Each library (a "tenant") gets its own subdomain, catalog, and member base. Community Shelf provides the software; library administrators provide the content and manage their own communities.`,
    ],
  },
  {
    title: "2. Accounts & Eligibility",
    paragraphs: [
      `You must be at least 16 years old to create an account. You are responsible for keeping your login credentials secure. One person may operate multiple libraries, but each account must represent a real individual — automated or bot-created accounts are not permitted.`,
    ],
  },
  {
    title: "3. Creating & Running a Library",
    paragraphs: [
      `When you create a library you become its administrator. As an administrator you are responsible for the content you list, the members you accept, and the lending policies you set. Community Shelf does not verify, endorse, or guarantee the accuracy of any catalog entry, availability status, or item condition.`,
      `You may customize your library's name, branding, and public description. You may not use these features to impersonate another organization, spread misleading information, or promote illegal activity.`,
    ],
  },
  {
    title: "4. Acceptable Use",
    paragraphs: [
      `You agree not to: upload content that infringes on intellectual property rights; use the platform to harass, threaten, or discriminate against others; attempt to gain unauthorized access to other accounts or libraries; use automated tools to scrape data or overload the service; or list items that are illegal to lend in your jurisdiction.`,
      `We reserve the right to suspend or remove any library or account that violates these terms, with or without prior notice.`,
    ],
  },
  {
    title: "5. Content & Intellectual Property",
    paragraphs: [
      `You retain ownership of any content you upload (cover images, descriptions, logos). By uploading content you grant Community Shelf a non-exclusive license to display it within the platform. We will never sell your content or use it outside the service.`,
      `Community Shelf's software, design, and branding are owned by Community Shelf. You may not copy, modify, or redistribute them without permission.`,
    ],
  },
  {
    title: "6. Privacy & Data",
    paragraphs: [
      `We collect only the information needed to run the service: your email address, display name, and lending activity. Library administrators can see the names and email addresses of their members, plus lending history within their library.`,
      `We do not sell personal data to third parties. We use cookies only for authentication and theme preferences — no tracking or advertising cookies. You may request deletion of your account and associated data at any time by contacting us.`,
    ],
  },
  {
    title: "7. Liability & Disclaimers",
    paragraphs: [
      `Community Shelf is provided "as is" without warranties of any kind. We are not responsible for items that are lost, damaged, or not returned during lending. Disputes between library members and administrators should be resolved between those parties directly.`,
      `Our total liability to you for any claim arising from your use of the service is limited to the amount you have paid us — which, for the free tier, is zero.`,
    ],
  },
  {
    title: "8. Service Availability",
    paragraphs: [
      `We aim to keep the platform available around the clock but do not guarantee uninterrupted service. We may perform maintenance, update features, or — in rare cases — discontinue the service. If we plan to shut down, we will give at least 30 days' notice and provide an option to export your data.`,
    ],
  },
  {
    title: "9. Changes to These Terms",
    paragraphs: [
      `We may update these terms from time to time. When we do, we will revise the "Last updated" date at the top. Continued use of the platform after a change constitutes acceptance. For material changes we will make reasonable efforts to notify you via email or an in-app banner.`,
    ],
  },
  {
    title: "10. Contact",
    paragraphs: [
      `If you have questions about these terms or need to report a violation, reach out at hello@communityshelf.org.`,
    ],
  },
];

export default function PlatformTerms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div style={{ animation: "fade-up 0.6s ease-out both" }}>
        <h1 className="font-heading text-4xl tracking-tight text-teal-900 sm:text-5xl dark:text-cream">
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-sm text-sand-500 dark:text-night-400">
          Last updated: {LAST_UPDATED}
        </p>
        <p className="mt-6 leading-relaxed text-sand-500 dark:text-night-400">
          Welcome to Community Shelf. By creating an account or using the
          platform you agree to the following terms. They are written in plain
          language — no legalese traps.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {sections.map((s, i) => (
          <section
            key={s.title}
            style={{
              animation: "fade-up 0.5s ease-out both",
              animationDelay: `${0.1 + i * 0.04}s`,
            }}
          >
            <h2 className="font-heading text-xl text-teal-900 dark:text-cream">
              {s.title}
            </h2>
            {s.paragraphs.map((p, j) => (
              <p
                key={j}
                className="mt-3 leading-relaxed text-sand-500 dark:text-night-400"
              >
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      {/* Back link */}
      <div
        className="mt-14 border-t border-sand-200/60 pt-8 dark:border-night-800"
        style={{ animation: "fade-up 0.5s ease-out 0.6s both" }}
      >
        <Link
          to="/"
          className="text-sm font-medium text-teal-700 transition hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
        >
          &larr; Back to home
        </Link>
      </div>
    </div>
  );
}
