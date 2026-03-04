import { BookOpen, ArrowRight, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

const steps = [
  {
    icon: BookOpen,
    title: "Browse the collection",
    text: "Explore what your community has to share — books, films, music, games, and more.",
  },
  {
    icon: ArrowRight,
    title: "Request an item",
    text: "Found something you like? Submit a request and we'll hold it for you.",
  },
  {
    icon: Heart,
    title: "Pick up & enjoy",
    text: "Collect your item, enjoy it at your own pace, and return it when you're done.",
  },
];

export default function About() {
  const { siteConfig } = useData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Hero */}
      <div
        className="mb-14 max-w-2xl"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <h1 className="font-heading text-4xl tracking-tight text-teal-900 sm:text-5xl dark:text-cream">
          About {siteConfig.title}
        </h1>
        <p className="mt-3 font-heading text-lg italic text-sand-400 dark:text-night-400">
          {siteConfig.description}
        </p>
      </div>

      {/* Mission */}
      <div
        className="mb-14 rounded-2xl bg-warm p-8 ring-1 ring-sand-200/50 sm:p-10 dark:bg-night-900 dark:ring-night-700/50"
        style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
      >
        <div className="flex items-start gap-4">
          <Users className="mt-1 size-6 shrink-0 text-teal-700 dark:text-teal-400" />
          <div>
            <h2 className="font-heading text-2xl text-teal-900 dark:text-cream">
              Our Mission
            </h2>
            <p className="mt-3 leading-relaxed text-sand-400 dark:text-night-400">
              {siteConfig.title} connects people with the things their community
              has to share. Instead of buying new, borrow from your neighbors.
              Instead of collecting dust, let your books find new readers. We
              believe that sharing builds stronger communities — and saves a few
              trees along the way.
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ animation: "fade-up 0.6s ease-out 0.2s both" }}>
        <h2 className="mb-8 font-heading text-2xl text-teal-900 dark:text-cream">
          How it works
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
              style={{
                animation: "fade-up 0.5s ease-out both",
                animationDelay: `${0.3 + i * 0.08}s`,
              }}
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-teal-700/10 dark:bg-teal-400/10">
                <step.icon className="size-5 text-teal-700 dark:text-teal-400" />
              </div>
              <h3 className="font-semibold text-teal-900 dark:text-cream">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sand-400 dark:text-night-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="mt-14 text-center"
        style={{ animation: "fade-up 0.6s ease-out 0.5s both" }}
      >
        <h2 className="font-heading text-2xl text-teal-900 dark:text-cream">
          Ready to explore?
        </h2>
        <p className="mt-2 text-sand-400 dark:text-night-400">
          Browse what your community has to offer.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-800 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-teal-900 dark:bg-teal-700 dark:hover:bg-teal-600"
        >
          Browse the Collection
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
