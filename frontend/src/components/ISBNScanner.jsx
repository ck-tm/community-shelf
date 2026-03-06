import { useEffect, useRef, useState } from "react";
import { X, Camera, CheckCircle, Loader2 } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { useTranslation } from "react-i18next";

export default function ISBNScanner({ onScan, onClose }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [detected, setDetected] = useState(null); // ISBN string once scanned
  const scannerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let started = false;
    const scanner = new Html5Qrcode("isbn-scanner-region");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 280, height: 160 },
          formatsToSupport: [
            0, // QR_CODE
            4, // EAN_13
            3, // EAN_8
            2, // CODE_128
          ],
        },
        (decodedText) => {
          if (cancelled) return;
          const cleaned = decodedText.replace(/[^0-9Xx]/g, "");
          if (cleaned.length === 10 || cleaned.length === 13) {
            started = false;
            scanner.stop().catch(() => {});
            setDetected(cleaned);
            setTimeout(() => {
              if (!cancelled) onScan(cleaned);
            }, 1400);
          }
        },
      )
      .then(() => {
        if (cancelled) {
          scanner.stop().catch(() => {});
        } else {
          started = true;
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err?.message?.includes("NotAllowedError")
            ? t("scanner.cameraDenied")
            : t("scanner.cameraError"),
        );
      });

    return () => {
      cancelled = true;
      if (started) {
        started = false;
        scanner.stop().catch(() => {});
      }
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-5 shadow-xl dark:bg-night-800">
        {/* Detection overlay covers the whole modal card so it's visible even after scanner stops */}
        {detected && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-black/90">
            <CheckCircle className="size-12 text-emerald-400" />
            <p className="text-xl font-bold text-white">{detected}</p>
            <div className="flex items-center gap-2 text-sm text-emerald-300">
              <Loader2 className="size-4 animate-spin" />
              {t("scanner.lookingUp")}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-bold text-teal-900 dark:text-cream">
            <Camera className="size-5" /> {t("scanner.title")}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-sand-500 transition hover:bg-sand-100 dark:text-night-400 dark:hover:bg-night-700"
            aria-label={t("scanner.close")}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scanner area */}
        <div className="overflow-hidden rounded-xl bg-black">
          <div id="isbn-scanner-region" className="w-full" />
        </div>

        {error && (
          <p className="mt-3 text-center text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {!detected && (
          <p className="mt-3 text-center text-xs text-sand-500 dark:text-night-400">
            {t("scanner.instruction")}
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-xl border border-sand-200 px-4 py-2.5 text-sm font-medium text-sand-500 transition hover:bg-sand-100 dark:border-night-700 dark:text-night-400 dark:hover:bg-night-700"
        >
          {t("scanner.cancel")}
        </button>
      </div>
    </div>
  );
}
