const http = require("http");
const https = require("https");
const fs = require("fs");
const { cert, key } = require("./config");
/**
 *
 * @param {(req: import("http").IncomingMessage, res: import("http").ServerResponse)=> void} http_request
 * @returns {import("http").Server|import("https").Server}
 */
module.exports = http_request => {
  if (cert) {   
    return https.createServer(
      {
        cert: fs.readFileSync(cert),
        key: fs.readFileSync(key || cert),
      },
      http_request,
    );
  }  
  return http.createServer(http_request);
};
