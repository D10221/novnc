const http = require("http");
const https = require("https");
const fs = require("fs");
/**
 * 
 * @param {string} cert path to cert.pem
 * @param {string} key? path to cert.key 
 */
module.exports = (cert, key) =>
  /**
   *
   * @param {(req: import("http").IncomingMessage, res: import("http").ServerResponse)=> void} handler
   * @returns {import("http").Server|import("https").Server}
   */
  handler => {
    if (cert) {
      return https.createServer(
        {
          cert: fs.readFileSync(cert),
          key: fs.readFileSync(key || cert),
        },
        handler,
      );
    }
    return http.createServer(handler);
  };
