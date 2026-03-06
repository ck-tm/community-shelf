"use client";

import { use } from "react";
import { useData } from "@/context/DataContext";
import ListForm from "@/components/ListForm";

export default function EditListPage({ params }) {
  const { id } = use(params);
  const { curatedLists } = useData();
  const list = curatedLists.find((l) => String(l.id) === String(id));

  if (!list) {
    return (
      <div className="py-12 text-center text-sand-500 dark:text-night-400">
        List not found.
      </div>
    );
  }

  return <ListForm initialList={list} />;
}
