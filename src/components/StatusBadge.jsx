const styles = {
  Pending:  "bg-amber-100 text-amber-800",
  Approved: "bg-blue-100 text-blue-800",
  Active:   "bg-emerald-100 text-emerald-800",
  Returned: "bg-gray-100 text-gray-600",
  Overdue:  "bg-red-100 text-red-800",
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
