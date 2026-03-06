import { Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useData } from "../context/DataContext";
import ListCard from "../components/ListCard";

export default function Lists() {
  const { curatedLists } = useData();
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Hero */}
      <div
        className="mb-12 max-w-2xl"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <h1 className="font-heading text-4xl tracking-tight text-teal-900 sm:text-5xl dark:text-cream">
          {t("listsPage.title")}
        </h1>
        <p className="mt-3 font-heading text-lg italic text-sand-500 dark:text-night-400">
          {t("listsPage.subtitle")}
        </p>
      </div>

      {curatedLists.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {curatedLists.map((list, i) => (
            <div
              key={list.id}
              style={{
                animation: "fade-up 0.5s ease-out both",
                animationDelay: `${0.15 + i * 0.08}s`,
              }}
            >
              <ListCard list={list} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="py-28 text-center"
          style={{ animation: "fade-in 0.4s ease-out both" }}
        >
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-warm dark:bg-night-800">
            <Layers className="size-7 text-sand-300 dark:text-night-400" />
          </div>
          <h3 className="font-heading text-xl text-teal-900 dark:text-cream">
            {t("listsPage.noLists")}
          </h3>
          <p className="mt-2 text-sm text-sand-500 dark:text-night-400">
            {t("listsPage.noListsHint")}
          </p>
        </div>
      )}
    </div>
  );
}
