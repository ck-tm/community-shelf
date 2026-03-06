import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Crosshair } from "lucide-react";
import { useTranslation } from "react-i18next";
import { extractCoords } from "../utils/maps";

// Custom teal marker icon using SVG
const markerIcon = L.divIcon({
  className: "",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38" fill="none">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.268 21.732 0 14 0z" fill="#0d7377"/>
    <circle cx="14" cy="13" r="5.5" fill="white"/>
  </svg>`,
  iconSize: [28, 38],
  iconAnchor: [14, 38],
  popupAnchor: [0, -38],
  tooltipAnchor: [0, -38],
});

// Smaller blue marker for user location
const userIcon = L.divIcon({
  className: "",
  html: `<span style="display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#3b82f6;box-shadow:0 0 0 4px rgba(59,130,246,.25);border:2px solid #fff"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

/** Internal component that flies the map to the user location */
function FlyToUser({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.2 });
    }
  }, [map, position]);
  return null;
}

export default function LibraryMap({ tenants, getTenantUrl }) {
  const { t } = useTranslation();
  const mapRef = useRef(null);
  const [userPos, setUserPos] = useState(null);
  const [locating, setLocating] = useState(false);

  // Filter tenants that have parseable coordinates
  const pins = useMemo(() => {
    return tenants
      .map((tenant) => {
        const coords = extractCoords(tenant.googleMapsUrl);
        if (!coords) return null;
        return { ...tenant, lat: coords[0], lng: coords[1] };
      })
      .filter(Boolean);
  }, [tenants]);

  // Compute bounds to fit all pins
  const bounds = useMemo(() => {
    if (pins.length === 0) return null;
    if (pins.length === 1) return null; // single pin, use center + zoom
    return L.latLngBounds(pins.map((p) => [p.lat, p.lng]));
  }, [pins]);

  const center = useMemo(() => {
    if (pins.length === 0) return [48, 14]; // Europe center
    if (pins.length === 1) return [pins[0].lat, pins[0].lng];
    return bounds.getCenter();
  }, [pins, bounds]);

  // Fit bounds when map is ready
  useEffect(() => {
    const map = mapRef.current;
    if (map && bounds && pins.length > 1) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [bounds, pins.length]);

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }, []);

  if (pins.length === 0) return null;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center" style={{ animation: "fade-up 0.6s ease-out both" }}>
          <h2 className="font-heading text-3xl text-teal-900 sm:text-4xl dark:text-cream">
            {t("landing.mapTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sand-500 dark:text-night-400">
            {t("landing.mapSubtitle")}
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl ring-1 ring-sand-200/50 dark:ring-night-700/50"
          style={{ animation: "fade-up 0.6s ease-out 0.1s both" }}
        >
          {/* Locate me button */}
          <button
            onClick={handleLocate}
            disabled={locating}
            className="absolute right-3 top-3 z-[1000] flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-2 text-xs font-medium text-teal-800 shadow-md ring-1 ring-sand-200/60 backdrop-blur-sm transition hover:bg-white hover:shadow-lg disabled:opacity-50 dark:bg-night-900/90 dark:text-cream dark:ring-night-700/50 dark:hover:bg-night-800"
            aria-label={t("landing.locateMe")}
          >
            <Crosshair className={`size-3.5 ${locating ? "animate-pulse" : ""}`} />
            {t("landing.locateMe")}
          </button>

          <MapContainer
            ref={mapRef}
            center={center}
            zoom={pins.length === 1 ? 13 : 5}
            scrollWheelZoom={false}
            style={{ height: 420, width: "100%" }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />

            {pins.map((pin) => (
              <Marker key={pin.id} position={[pin.lat, pin.lng]} icon={markerIcon}>
                <Tooltip direction="top" offset={[0, -6]} className="library-tooltip">
                  {pin.name}
                </Tooltip>
                <Popup>
                  <div className="text-center">
                    <p className="font-heading text-sm font-bold text-teal-900">{pin.name}</p>
                    {(pin.city || pin.country) && (
                      <p className="text-xs text-gray-500">
                        {[pin.city, pin.country].filter(Boolean).join(", ")}
                      </p>
                    )}
                    {pin.address && (
                      <p className="mt-0.5 text-xs text-gray-400">{pin.address}</p>
                    )}
                    <a
                      href={getTenantUrl(pin.slug)}
                      className="mt-1.5 inline-block text-xs font-semibold text-teal-700 hover:text-teal-900"
                    >
                      {t("landing.mapVisit")} &rarr;
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* User location marker */}
            {userPos && (
              <Marker position={userPos} icon={userIcon}>
                <Tooltip direction="top" offset={[0, -6]} permanent>
                  {t("landing.you")}
                </Tooltip>
              </Marker>
            )}

            <FlyToUser position={userPos} />
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
