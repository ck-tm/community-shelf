const styles = {
  Pending:  "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  Approved: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Active:   "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  Returned: "bg-sand-100 text-sand-500 dark:bg-night-800 dark:text-night-400",
  Overdue:  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
        styles[status] || styles.Returned
      }`}
    >
      {status}
    </span>
  );
}
