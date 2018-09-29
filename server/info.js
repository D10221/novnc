/**
 *
 * @param {import("./config")} param0
 * @returns {string}
 */
module.exports = function info({ source, target, webRoot, cert, key }) {
  return [
    `proxying from ${source.host}:${source.port} to ${target.host}:${
      target.port
    }`,
    webRoot && `Web server: Serving: ${webRoot}`,
    `Running in ${(cert && "HTTPS") || "HTTP"} (${(cert && "wss") ||
      "ws"}://) mode`,
    cert && `Using cert:\t${cert}`,
    key && `Using key:\t${key}`,
  ]
    .filter(x => x)
    .join("\n");
};
