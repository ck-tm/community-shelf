import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

const LAST_UPDATED = "March 5, 2026";
const PLATFORM_URL = import.meta.env.VITE_PLATFORM_URL || "https://library.costico.eu";

export default function Terms() {
  const { siteConfig } = useData();
  const libraryName = siteConfig.title || "this library";

  const sections = [
    {
      title: "1. About This Library",
      paragraphs: [
        `${libraryName} is a community lending library powered by Community Shelf. The library is independently managed by its administrator(s). Community Shelf provides the hosting and software; the administrator manages the catalog, members, and lending policies.`,
      ],
    },
    {
      title: "2. Membership",
      paragraphs: [
        `By creating an account on ${libraryName} you agree to these terms and to the platform-wide Community Shelf Terms & Conditions. Your account gives you access to this library only — it is separate from accounts on other Community Shelf libraries.`,
      ],
    },
    {
      title: "3. Borrowing & Returns",
      paragraphs: [
        `When you request an item, the library administrator decides whether to approve or decline the request. Approved loans have a due date; please return items on time so others can enjoy them. Repeated failure to return items may result in suspension of your borrowing privileges.`,
        `You are responsible for items in your possession. If an item is lost or damaged, you should contact the library administrator directly to arrange a resolution.`,
      ],
    },
    {
      title: "4. Your Responsibilities",
      paragraphs: [
        `Treat the library and its community with respect. Do not submit fraudulent borrow requests, misrepresent item conditions, or use the platform to harass other members. The administrator reserves the right to remove members who violate these expectations.`,
      ],
    },
    {
      title: "5. Privacy",
      paragraphs: [
        `Your name, email address, and borrowing history within this library are visible to the library administrator. This information is used solely to manage lending and will not be shared with third parties. For details on how the platform handles your data, see the Community Shelf Privacy section in the platform terms.`,
      ],
    },
    {
      title: "6. Limitation of Liability",
      paragraphs: [
        `${libraryName} and its administrator provide this service voluntarily and in good faith. Neither the library administrator nor Community Shelf is liable for any loss, damage, or dispute arising from the lending of items. All items are lent as-is, without warranty.`,
      ],
    },
    {
      title: "7. Changes",
      paragraphs: [
        `The library administrator or Community Shelf may update these terms at any time. Continued use after a change constitutes acceptance.`,
      ],
    },
  ];

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
          These terms apply to your use of <strong className="text-teal-900 dark:text-cream">{libraryName}</strong>.
          They work alongside the{" "}
          <a
            href={`${PLATFORM_URL}/terms`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-teal-700 underline decoration-teal-700/30 transition hover:text-teal-900 hover:decoration-teal-900/50 dark:text-teal-400 dark:decoration-teal-400/30 dark:hover:text-teal-300"
          >
            Community Shelf Platform Terms
          </a>{" "}
          which govern the overall service.
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
        style={{ animation: "fade-up 0.5s ease-out 0.5s both" }}
      >
        <Link
          to="/"
          className="text-sm font-medium text-teal-700 transition hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300"
        >
          &larr; Back to browsing
        </Link>
      </div>
    </div>
  );
}
