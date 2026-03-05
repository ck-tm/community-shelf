import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-sand-200/60 dark:border-night-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-xs text-sand-500 dark:text-night-400">
          &copy; {new Date().getFullYear()} Community Shelf
        </p>
        <Link
          to="/terms"
          className="text-xs font-medium text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-teal-400"
        >
          Terms &amp; Conditions
        </Link>
      </div>
    </footer>
  );
}
