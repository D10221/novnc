export function getUrl() {
  const host = fromQueryOrDefault("host", window.location.hostname);
  const port = fromQueryOrDefault("port", window.location.port);
  const path = fromQueryOrDefault("path", "websockify");
  const protocol = (window.location.protocol === "https:" && "wss") || "ws";
  // Build the websocket URL used to connect
  const url = `${protocol}://${host}${port && `:${port}`}/${path}`;
  return url;
}

// query string. If the variable isn't defined in the URL
// it returns the default value instead.
export function fromQueryOrDefault(name, defaultValue) {
  // Note that we use location.href instead of location.search
  // because Firefox < 53 has a bug w.r.t location.search
  const re = new RegExp(".*[?&]" + name + "=([^&#]*)");

  const match = document.location.href.match(re);
  if (match) {
    // We have to decode the URL since want the cleartext value
    return decodeURIComponent(match[1]);
  }

  if (typeof defaultValue === "undefined") {
    return null;
  }
  return defaultValue;
}
