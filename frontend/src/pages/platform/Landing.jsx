import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Eye,
  HandHelping,
  Layers,
  Palette,
  Globe,
  ScanBarcode,
  ArrowRight,
  Library,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { platformApi } from "../../api/endpoints";
import { useAuth } from "../../context/AuthContext";

const BASE_DOMAIN = import.meta.env.VITE_BASE_DOMAIN || "localhost";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Catalog Management",
    desc: "Add books, games, music, and more — complete with cover art and details, auto-filled for you.",
    accent: "#0d7377",
  },
  {
    icon: ScanBarcode,
    title: "ISBN Scanner",
    desc: "Point your phone at a barcode to add a book in seconds. Got a big collection? Bulk-import it.",
    accent: "#0a5c5f",
  },
  {
    icon: Eye,
    title: "Availability Tracking",
    desc: "See which items are available, who has what, and where each copy lives — all in real time.",
    accent: "#074e52",
  },
  {
    icon: HandHelping,
    title: "Lending & Returns",
    desc: "Members request a borrow, you approve it, they return it. Due date reminders happen automatically.",
    accent: "#f5a623",
  },
  {
    icon: Layers,
    title: "Curated Lists",
    desc: "Build reading lists, seasonal picks, or \"staff favorites\" to help members find their next read.",
    accent: "#0d9488",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    desc: "Add your logo, pick your colors, and make the library feel like it belongs to your community.",
    accent: "#074e52",
  },
  {
    icon: Globe,
    title: "Your Own Space",
    desc: "Your library is completely yours — your own catalog, members, and settings, separate from everyone else.",
    accent: "#0d7377",
  },
];

function getTenantUrl(slug) {
  const { protocol, port } = window.location;
  const portSuffix = port && port !== "443" && port !== "80" ? `:${port}` : "";
  return `${protocol}//${slug}.${BASE_DOMAIN}${portSuffix}`;
}

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const [tenants, setTenants] = useState([]);
  const [tenantsLoading, setTenantsLoading] = useState(true);

  useEffect(() => {
    platformApi
      .getTenants()
      .then((res) => setTenants(res.results ?? res))
      .catch(() => {})
      .finally(() => setTenantsLoading(false));
  }, []);

  return (
    <div className="overflow-hidden">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8 lg:pb-40 lg:pt-32">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 size-[600px] rounded-full bg-teal-700/[0.04] blur-3xl dark:bg-teal-600/[0.06]" />
          <div className="absolute -bottom-20 -left-40 size-[500px] rounded-full bg-amber-500/[0.05] blur-3xl dark:bg-amber-500/[0.04]" />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-teal-700/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-teal-800 dark:bg-teal-400/10 dark:text-teal-400"
            style={{ animation: "fade-up 0.6s ease-out both" }}
          >
            <Sparkles className="size-3.5" />
            Free for every community
          </div>

          {/* Headline */}
          <h1
            className="font-heading text-5xl leading-[1.1] text-teal-900 sm:text-6xl lg:text-7xl dark:text-cream"
            style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
          >
            Your Neighborhood
            <br />
            <span className="text-teal-700 dark:text-teal-400">Library</span>,
            Online
          </h1>

          {/* Subtitle */}
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sand-500 sm:text-xl dark:text-night-400"
            style={{ animation: "fade-up 0.6s ease-out 0.2s both" }}
          >
            Share books, games, music, and more with your neighbors. Everything
            you need to run a beautiful lending library — no tech skills
            required.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            style={{ animation: "fade-up 0.6s ease-out 0.3s both" }}
          >
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="group inline-flex items-center gap-2 rounded-xl bg-teal-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 hover:shadow-xl hover:shadow-teal-700/25 dark:bg-teal-600 dark:shadow-teal-600/15 dark:hover:bg-teal-700"
            >
              {isAuthenticated ? "Go to Dashboard" : "Create Your Library"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#libraries"
              className="inline-flex items-center gap-2 rounded-xl bg-warm px-7 py-3.5 text-sm font-semibold text-teal-800 ring-1 ring-sand-200/60 transition hover:bg-sand-100 hover:text-teal-900 dark:bg-night-900 dark:text-night-300 dark:ring-night-600 dark:hover:bg-night-800 dark:hover:text-cream"
            >
              See It in Action
            </a>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div
            className="mb-16 text-center"
            style={{ animation: "fade-up 0.6s ease-out both" }}
          >
            <h2 className="font-heading text-4xl text-teal-900 sm:text-5xl dark:text-cream">
              Built for Community Librarians
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sand-500 dark:text-night-400">
              Catalog your collection, manage lending, and make your library
              feel like home.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => {
              const isLast = i === FEATURES.length - 1;
              const isOrphan = FEATURES.length % 3 === 1 && isLast;
              return (
                <div
                  key={feature.title}
                  className={`group rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-sand-200 dark:bg-night-900 dark:ring-night-700/50 dark:hover:ring-night-600${
                    isOrphan ? " sm:col-span-2 lg:col-span-3" : ""
                  }`}
                  style={{
                    animation: `fade-up 0.6s ease-out ${0.1 + i * 0.08}s both`,
                  }}
                >
                  <div
                    className="mb-4 inline-flex size-10 items-center justify-center rounded-xl text-white shadow-sm"
                    style={{ backgroundColor: feature.accent }}
                  >
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="mb-2 font-heading text-xl text-teal-900 dark:text-cream">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-sand-500 dark:text-night-400">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TENANT DIRECTORY ──────────────────────────────────── */}
      <section
        id="libraries"
        className="relative px-4 py-24 sm:px-6 lg:px-8"
      >
        {/* Subtle background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-teal-700/[0.02] to-transparent dark:via-teal-600/[0.03]" />

        <div className="relative mx-auto max-w-6xl">
          <div
            className="mb-16 text-center"
            style={{ animation: "fade-up 0.6s ease-out both" }}
          >
            <h2 className="font-heading text-4xl text-teal-900 sm:text-5xl dark:text-cream">
              Libraries Already Using Community Shelf
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sand-500 dark:text-night-400">
              See what other communities have built.
            </p>
          </div>

          {tenantsLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-2xl bg-sand-100 dark:bg-night-800"
                />
              ))}
            </div>
          ) : tenants.length === 0 ? (
            <div
              className="rounded-2xl bg-warm p-12 text-center ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
              style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
            >
              <Library className="mx-auto mb-4 size-10 text-sand-300 dark:text-night-500" />
              <p className="text-sand-500 dark:text-night-400">
                No public libraries yet. Be the first to{" "}
                <Link
                  to="/register"
                  className="font-semibold text-teal-700 underline decoration-teal-700/30 transition hover:decoration-teal-700 dark:text-teal-400"
                >
                  create one
                </Link>
                .
              </p>
            </div>
          ) : (
            <div
              className={
                tenants.length < 3
                  ? "mx-auto flex max-w-md flex-col gap-4"
                  : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {tenants.map((tenant, i) => (
                <a
                  key={tenant.id}
                  href={getTenantUrl(tenant.slug)}
                  className="group flex items-center justify-between rounded-2xl bg-warm p-5 ring-1 ring-sand-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-sand-200 dark:bg-night-900 dark:ring-night-700/50 dark:hover:ring-night-600"
                  style={{
                    animation: `fade-up 0.6s ease-out ${0.1 + i * 0.08}s both`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-white dark:bg-teal-700">
                      <Library className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-teal-900 dark:text-cream">
                        {tenant.name}
                      </h3>
                      <p className="text-xs text-sand-500 dark:text-night-400">
                        {tenant.slug}.{BASE_DOMAIN}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-5 text-sand-300 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-700 dark:text-night-500 dark:group-hover:text-teal-400" />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl rounded-3xl bg-teal-800 p-10 text-center shadow-2xl shadow-teal-900/20 sm:p-16 dark:bg-teal-900 dark:shadow-teal-950/30"
          style={{ animation: "fade-up 0.6s ease-out both" }}
        >
          <h2 className="font-heading text-3xl text-white sm:text-4xl">
            Ready to Share?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-teal-100/80">
            Create a free account and we'll have your library up and running
            in minutes.
          </p>
          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-teal-800 shadow-lg transition hover:bg-cream hover:shadow-xl"
          >
            {isAuthenticated ? "Go to Dashboard" : "Create Your Free Library"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
