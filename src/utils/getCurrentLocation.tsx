// location.js
const DEFAULT_LOCATION = { lat: 28.6139, lng: 77.209 }; // New Delhi

/**
 * Prompt the user for geolocation permission and resolve with
 * `{ lat, lng }`.  Falls back to DEFAULT_LOCATION if:
 *   • the user explicitly denies permission
 *   • the browser doesn’t support the API
 *   • any other error (timeout, insecure context, etc.)
 *
 * @param {GeolocationPositionOptions} [options] – optional getCurrentPosition opts
 * @returns {Promise<{lat:number, lng:number}>}
 */
export async function getCurrentLocation(
  options = { enableHighAccuracy: true, timeout: 10_000 }
) {
  // Guard-clause: API not available (HTTP vs HTTPS, very old browser, etc.)
  if (!("geolocation" in navigator)) return DEFAULT_LOCATION;

  // Check current permission *before* showing the prompt.
  try {
    const status = await navigator.permissions?.query?.({
      name: "geolocation",
    });
    if (status && status.state === "denied") return DEFAULT_LOCATION; // user has already blocked
  } catch {
    /* permissions API not supported – keep going */
    return DEFAULT_LOCATION;
  }

  // Ask for the position
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      /* onError: bail out to default */
      () => resolve(DEFAULT_LOCATION),
      options
    );
  });
}
