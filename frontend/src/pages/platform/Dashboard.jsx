import { useEffect, useState } from "react";
import {
  Library,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Plus,
  Loader2,
} from "lucide-react";
import { platformApi } from "../../api/endpoints";
import { useAuth } from "../../context/AuthContext";

const BASE_DOMAIN = import.meta.env.VITE_BASE_DOMAIN || "localhost";

function getTenantUrl(slug) {
  const { protocol, port } = window.location;
  const portSuffix = port && port !== "443" && port !== "80" ? `:${port}` : "";
  return `${protocol}//${slug}.${BASE_DOMAIN}${portSuffix}`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ organization_name: "", description: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      const res = await platformApi.getLibraryRequests();
      setRequests(res.results ?? res);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await platformApi.createLibraryRequest(form);
      setForm({ organization_name: "", description: "" });
      setShowForm(false);
      await loadRequests();
    } catch (err) {
      setError(err.body?.organization_name?.[0] || err.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  }

  const pending = requests.filter((r) => r.status === "pending");
  const approved = requests.filter((r) => r.status === "approved");
  const rejected = requests.filter((r) => r.status === "rejected");

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div
          className="mb-10"
          style={{ animation: "fade-up 0.6s ease-out both" }}
        >
          <h1 className="font-heading text-4xl text-teal-900 dark:text-cream">
            Dashboard
          </h1>
          <p className="mt-2 text-sand-500 dark:text-night-400">
            Welcome back, {user?.first_name || user?.username || user?.email}.
            Manage your library requests below.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl bg-sand-100 dark:bg-night-800"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Approved libraries */}
            {approved.length > 0 && (
              <div style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}>
                <h2 className="mb-4 flex items-center gap-2 font-heading text-xl text-teal-900 dark:text-cream">
                  <CheckCircle2 className="size-5 text-teal-700 dark:text-teal-400" />
                  Your Libraries
                </h2>
                <div className="space-y-3">
                  {approved.map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between rounded-2xl bg-teal-700/5 p-5 ring-1 ring-teal-700/10 dark:bg-teal-400/5 dark:ring-teal-400/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-teal-700 text-white dark:bg-teal-600">
                          <Library className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg text-teal-900 dark:text-cream">
                            {req.organization_name}
                          </h3>
                          {req.tenant_slug && (
                            <p className="text-xs text-sand-300 dark:text-night-500">
                              {req.tenant_slug}.{BASE_DOMAIN}
                            </p>
                          )}
                        </div>
                      </div>
                      {req.tenant_slug && (
                        <a
                          href={getTenantUrl(req.tenant_slug)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
                        >
                          Open
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pending requests */}
            {pending.length > 0 && (
              <div style={{ animation: "fade-up 0.6s ease-out 0.15s both" }}>
                <h2 className="mb-4 flex items-center gap-2 font-heading text-xl text-teal-900 dark:text-cream">
                  <Clock className="size-5 text-amber-500" />
                  Pending Requests
                </h2>
                <div className="space-y-3">
                  {pending.map((req) => (
                    <div
                      key={req.id}
                      className="rounded-2xl bg-warm p-5 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-heading text-lg text-teal-900 dark:text-cream">
                            {req.organization_name}
                          </h3>
                          {req.description && (
                            <p className="mt-1 text-sm text-sand-500 dark:text-night-400">
                              {req.description}
                            </p>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                          <Clock className="size-3" />
                          Under Review
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rejected requests */}
            {rejected.length > 0 && (
              <div style={{ animation: "fade-up 0.6s ease-out 0.2s both" }}>
                <h2 className="mb-4 flex items-center gap-2 font-heading text-xl text-teal-900 dark:text-cream">
                  <XCircle className="size-5 text-red-500" />
                  Declined
                </h2>
                <div className="space-y-3">
                  {rejected.map((req) => (
                    <div
                      key={req.id}
                      className="rounded-2xl bg-warm p-5 ring-1 ring-red-200/30 dark:bg-night-900 dark:ring-red-800/20"
                    >
                      <h3 className="font-heading text-lg text-teal-900 dark:text-cream">
                        {req.organization_name}
                      </h3>
                      {req.admin_notes && (
                        <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
                          {req.admin_notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New request form / button */}
            <div style={{ animation: "fade-up 0.6s ease-out 0.25s both" }}>
              {showForm ? (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl bg-warm p-6 ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
                >
                  <h2 className="mb-5 font-heading text-xl text-teal-900 dark:text-cream">
                    Request a New Library
                  </h2>

                  {error && (
                    <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.organization_name}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            organization_name: e.target.value,
                          }))
                        }
                        placeholder="e.g. Greenwood Neighborhood Library"
                        className="w-full rounded-xl border-0 bg-cream px-4 py-3 text-sm text-teal-900 ring-1 ring-sand-200 placeholder:text-sand-300 focus:outline-none focus:ring-2 focus:ring-teal-700/50 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-500 dark:focus:ring-teal-400/50"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                        Description{" "}
                        <span className="font-normal text-sand-300 dark:text-night-500">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        rows={3}
                        value={form.description}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, description: e.target.value }))
                        }
                        placeholder="Tell us about your community and what you'd like to share..."
                        className="w-full resize-none rounded-xl border-0 bg-cream px-4 py-3 text-sm text-teal-900 ring-1 ring-sand-200 placeholder:text-sand-300 focus:outline-none focus:ring-2 focus:ring-teal-700/50 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-500 dark:focus:ring-teal-400/50"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-700"
                    >
                      {submitting ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Send className="size-4" />
                      )}
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setError(null);
                      }}
                      className="rounded-xl px-5 py-2.5 text-sm font-medium text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-cream"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowForm(true)}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-sand-200 py-6 text-sm font-semibold text-sand-500 transition hover:border-teal-700/30 hover:text-teal-700 dark:border-night-700 dark:text-night-400 dark:hover:border-teal-400/30 dark:hover:text-teal-400"
                >
                  <Plus className="size-4" />
                  Request a New Library
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
