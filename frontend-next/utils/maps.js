/**
 * Extract lat/lng from a Google Maps URL.
 */
export function extractCoords(url) {
  if (!url) return null;
  let m = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (m) return [parseFloat(m[1]), parseFloat(m[2])];
  m = url.match(/[?&](?:q|ll|center)=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (m) return [parseFloat(m[1]), parseFloat(m[2])];
  m = url.match(/place\/(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (m) return [parseFloat(m[1]), parseFloat(m[2])];
  return null;
}

/**
 * Build a Google Maps URL that always drops a visible red pin.
 */
export function pinFriendlyUrl(googleMapsUrl) {
  if (!googleMapsUrl) return "";
  const coords = extractCoords(googleMapsUrl);
  if (coords) {
    return `https://www.google.com/maps/search/?api=1&query=${coords[0]},${coords[1]}`;
  }
  return googleMapsUrl;
}
