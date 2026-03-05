import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function MyDetails() {
  const { user, updateProfile } = useAuth();
  const [account, setAccount] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Populate form when user data is available
  useEffect(() => {
    if (user) {
      setAccount({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      await updateProfile({
        first_name: account.first_name,
        last_name: account.last_name,
        phone: account.phone,
        address: account.address,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const setField = (key) => (e) =>
    setAccount({ ...account, [key]: e.target.value });

  const inputClass =
    "w-full rounded-xl border-0 bg-cream px-3 py-2.5 text-sm ring-1 ring-sand-200/70 outline-none transition focus:ring-2 focus:ring-teal-600/30 dark:bg-night-800 dark:text-cream dark:ring-night-700";

  return (
    <div>
      {/* Header */}
      <div
        className="mb-8"
        style={{ animation: "fade-up 0.6s ease-out both" }}
      >
        <h1 className="font-heading text-3xl text-teal-900 dark:text-cream">
          My Details
        </h1>
        <p className="mt-1 text-sand-500 dark:text-night-400">
          Update your personal information.
        </p>
      </div>

      {/* Form */}
      <div
        className="overflow-hidden rounded-2xl bg-warm ring-1 ring-sand-200/50 dark:bg-night-900 dark:ring-night-700/50"
        style={{ animation: "fade-up 0.5s ease-out 0.08s both" }}
      >
        <div className="border-b border-sand-200/60 px-6 py-4 dark:border-night-700/50">
          <h2 className="font-heading text-lg text-teal-900 dark:text-cream">
            Personal Information
          </h2>
        </div>
        <form onSubmit={handleSave} className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
                First Name
              </label>
              <input
                type="text"
                value={account.first_name}
                onChange={setField("first_name")}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
                Last Name
              </label>
              <input
                type="text"
                value={account.last_name}
                onChange={setField("last_name")}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
              Email
            </label>
            <input
              type="email"
              value={account.email}
              disabled
              className={`${inputClass} opacity-60 cursor-not-allowed`}
            />
            <p className="mt-1 text-xs text-sand-300 dark:text-night-500">
              Email cannot be changed.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
                Phone
              </label>
              <input
                type="tel"
                value={account.phone}
                onChange={setField("phone")}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-sand-500 dark:text-night-400">
                Address
              </label>
              <input
                type="text"
                value={account.address}
                onChange={setField("address")}
                className={inputClass}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Save Changes
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-teal-700 dark:text-teal-400">
                <Check className="size-4" /> Saved!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
