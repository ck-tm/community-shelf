/**
 * Extract lat/lng from a Google Maps URL.
 * Supports formats like:
 *   https://maps.google.com/?q=46.7712,23.6236
 *   https://www.google.com/maps/@46.7712,23.6236,15z
 *   https://www.google.com/maps/place/.../@46.7712,23.6236,...
 */
export function extractCoords(url) {
  if (!url) return null;
  // Match @lat,lng pattern (most common)
  let m = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (m) return [parseFloat(m[1]), parseFloat(m[2])];
  // Match ?q=lat,lng or ?ll=lat,lng
  m = url.match(/[?&](?:q|ll|center)=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (m) return [parseFloat(m[1]), parseFloat(m[2])];
  // Match place/lat,lng
  m = url.match(/place\/(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (m) return [parseFloat(m[1]), parseFloat(m[2])];
  return null;
}

/**
 * Build a Google Maps URL that always drops a visible red pin.
 * Falls back to the original URL if coords can't be parsed.
 */
export function pinFriendlyUrl(googleMapsUrl) {
  if (!googleMapsUrl) return "";
  const coords = extractCoords(googleMapsUrl);
  if (coords) {
    return `https://www.google.com/maps/search/?api=1&query=${coords[0]},${coords[1]}`;
  }
  return googleMapsUrl;
}
