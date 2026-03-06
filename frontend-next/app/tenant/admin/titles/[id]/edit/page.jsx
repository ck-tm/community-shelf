"use client";

import { use } from "react";
import { useData } from "@/context/DataContext";
import TitleForm from "@/components/TitleForm";

export default function EditTitlePage({ params }) {
  const { id } = use(params);
  const { titles } = useData();
  const title = titles.find((t) => String(t.id) === String(id));

  if (!title) {
    return (
      <div className="py-12 text-center text-sand-500 dark:text-night-400">
        Title not found.
      </div>
    );
  }

  return <TitleForm initialTitle={title} />;
}
