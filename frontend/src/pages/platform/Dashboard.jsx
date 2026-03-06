import { useEffect, useRef, useState } from "react";
import {
  Library,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Plus,
  Loader2,
  Globe,
  MapPin,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { platformApi } from "../../api/endpoints";
import { useAuth } from "../../context/AuthContext";

const BASE_DOMAIN = import.meta.env.VITE_BASE_DOMAIN || "localhost";

function getTenantUrl(slug) {
  const { protocol, port } = window.location;
  const portSuffix = port && port !== "443" && port !== "80" ? `:${port}` : "";
  return `${protocol}//${slug}.${BASE_DOMAIN}${portSuffix}`;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, "") // strip leading/trailing hyphens
    .slice(0, 63);
}

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ organization_name: "", slug: "", country: "", city: "", address: "", google_maps_url: "", description: "" });
  const [error, setError] = useState(null);
  const [slugError, setSlugError] = useState(null);
  const userEditedSlug = useRef(false);

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

  function handleOrgNameChange(e) {
    const name = e.target.value;
    setForm((f) => ({
      ...f,
      organization_name: name,
      slug: userEditedSlug.current ? f.slug : slugify(name),
    }));
  }

  function handleSlugChange(e) {
    userEditedSlug.current = true;
    setSlugError(null);
    const raw = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 63);
    setForm((f) => ({ ...f, slug: raw }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSlugError(null);
    setSubmitting(true);
    try {
      await platformApi.createLibraryRequest(form);
      setForm({ organization_name: "", slug: "", country: "", city: "", address: "", google_maps_url: "", description: "" });
      userEditedSlug.current = false;
      setShowForm(false);
      await loadRequests();
    } catch (err) {
      const body = err.body || {};
      if (body.slug) {
        setSlugError(body.slug[0] || body.slug);
      }
      if (body.organization_name) {
        setError(body.organization_name[0]);
      } else if (!body.slug) {
        setError(err.message || "Failed to submit request");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const pending = requests.filter((r) => r.status === "pending");
  const approved = requests.filter((r) => r.status === "approved");
  const rejected = requests.filter((r) => r.status === "rejected");

  const inputClass =
    "w-full rounded-xl border-0 bg-cream px-4 py-3 text-sm text-teal-900 ring-1 ring-sand-200 placeholder:text-sand-300 focus:outline-none focus:ring-2 focus:ring-teal-700/50 dark:bg-night-800 dark:text-cream dark:ring-night-700 dark:placeholder:text-night-500 dark:focus:ring-teal-400/50";

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div
          className="mb-10"
          style={{ animation: "fade-up 0.6s ease-out both" }}
        >
          <h1 className="font-heading text-4xl text-teal-900 dark:text-cream">
            {t("dashboard.title")}
          </h1>
          <p className="mt-2 text-sand-500 dark:text-night-400">
            {t("dashboard.welcome", { name: user?.first_name || user?.username || user?.email })}
            {" "}{t("dashboard.subtitle")}
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
                  {t("dashboard.yourLibraries")}
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
                          {t("dashboard.open")}
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
                  {t("dashboard.pendingRequests")}
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
                          {req.slug && (
                            <p className="mt-0.5 text-xs text-sand-300 dark:text-night-500">
                              {req.slug}.{BASE_DOMAIN}
                            </p>
                          )}
                          {req.description && (
                            <p className="mt-1 text-sm text-sand-500 dark:text-night-400">
                              {req.description}
                            </p>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                          <Clock className="size-3" />
                          {t("dashboard.underReview")}
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
                  {t("dashboard.declined")}
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
                    {t("dashboard.requestNew")}
                  </h2>

                  {error && (
                    <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                        {t("dashboard.orgName")}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.organization_name}
                        onChange={handleOrgNameChange}
                        placeholder={t("dashboard.orgPlaceholder")}
                        className={inputClass}
                      />
                    </div>

                    {/* Slug / Subdomain composite field */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                        {t("dashboard.slug")}
                      </label>
                      <div
                        className={`flex items-center overflow-hidden rounded-xl bg-cream ring-1 transition dark:bg-night-800 ${
                          slugError
                            ? "ring-red-400 dark:ring-red-500"
                            : "ring-sand-200 focus-within:ring-2 focus-within:ring-teal-700/50 dark:ring-night-700 dark:focus-within:ring-teal-400/50"
                        }`}
                      >
                        <input
                          type="text"
                          required
                          value={form.slug}
                          onChange={handleSlugChange}
                          placeholder={t("dashboard.slugPlaceholder")}
                          className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-teal-900 placeholder:text-sand-300 focus:outline-none dark:text-cream dark:placeholder:text-night-500"
                        />
                        <span className="flex shrink-0 items-center gap-1.5 border-l border-sand-200/60 bg-sand-50 px-3 py-3 text-sm text-sand-400 dark:border-night-700/60 dark:bg-night-900 dark:text-night-500">
                          <Globe className="size-3.5" />
                          .{BASE_DOMAIN}
                        </span>
                      </div>
                      {slugError ? (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                          {slugError}
                        </p>
                      ) : (
                        <p className="mt-1.5 text-xs text-sand-300 dark:text-night-500">
                          {t("dashboard.slugHint")}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                          {t("dashboard.country")}{" "}
                          <span className="font-normal text-sand-300 dark:text-night-500">
                            ({t("dashboard.optional")})
                          </span>
                        </label>
                        <input
                          type="text"
                          value={form.country}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, country: e.target.value }))
                          }
                          placeholder={t("dashboard.countryPlaceholder")}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                          {t("dashboard.city")}{" "}
                          <span className="font-normal text-sand-300 dark:text-night-500">
                            ({t("dashboard.optional")})
                          </span>
                        </label>
                        <input
                          type="text"
                          value={form.city}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, city: e.target.value }))
                          }
                          placeholder={t("dashboard.cityPlaceholder")}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                        {t("dashboard.address")}{" "}
                        <span className="font-normal text-sand-300 dark:text-night-500">
                          ({t("dashboard.optional")})
                        </span>
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, address: e.target.value }))
                        }
                        placeholder={t("dashboard.addressPlaceholder")}
                        className={inputClass}
                      />
                    </div>

                    {/* Google Maps Link */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                        {t("dashboard.googleMapsUrl")}{" "}
                        <span className="font-normal text-sand-300 dark:text-night-500">
                          ({t("dashboard.optional")})
                        </span>
                      </label>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-sand-300 dark:text-night-500" />
                        <input
                          type="url"
                          value={form.google_maps_url}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, google_maps_url: e.target.value }))
                          }
                          placeholder={t("dashboard.googleMapsPlaceholder")}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-teal-900 dark:text-cream">
                        {t("dashboard.description")}{" "}
                        <span className="font-normal text-sand-300 dark:text-night-500">
                          ({t("dashboard.optional")})
                        </span>
                      </label>
                      <textarea
                        rows={3}
                        value={form.description}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, description: e.target.value }))
                        }
                        placeholder={t("dashboard.descPlaceholder")}
                        className={`${inputClass} resize-none`}
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
                      {t("dashboard.submit")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setError(null);
                        setSlugError(null);
                      }}
                      className="rounded-xl px-5 py-2.5 text-sm font-medium text-sand-500 transition hover:text-teal-800 dark:text-night-400 dark:hover:text-cream"
                    >
                      {t("dashboard.cancel")}
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowForm(true)}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-sand-200 py-6 text-sm font-semibold text-sand-500 transition hover:border-teal-700/30 hover:text-teal-700 dark:border-night-700 dark:text-night-400 dark:hover:border-teal-400/30 dark:hover:text-teal-400"
                >
                  <Plus className="size-4" />
                  {t("dashboard.requestNew")}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
