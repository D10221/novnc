const express = require("express");
const { resolve } = require("path");
const WebSocketServer = require("ws").Server;
const { source, target, webRoot, cert } = require("./config");
const createServer = require("./create-server");
const pkg = require("../package.json");
const WsClient = require("./ws-client");
const debug = require("debug")(pkg.name);

/** Validate config */
if (!source.host || !source.port || !target.host || !target.port) {
  debug("config: ", source, target);
  console.log(
    `${pkg.name} version v${pkg.version}
Usage: 
\t novnc <[<SOURCE_ADDR>:]<SOURCE_PORT>> <[<TARGET_ADDR>:]<TARGET_PORT>>

Alt:
\tSOURCE=localhost:6080 TARGET=localhost:5901 node .

Options:
\t--webRoot </path/to/static/dir> 
\t--cert </path/to/cert.pem> 'cert || cert && key'
\t--key </path/to/key.pem>
  `,
  );
  process.exit(-1);
}

/**
 * Serve Client
 */
const app = express();
app.use("/", express.static(webRoot));
app.use(
  "/novnc",
  express.static(resolve(__dirname, "..", "node_modules/@novnc/novnc")),
);

const server = createServer(app);

function onListen() {
  const wsServer = new WebSocketServer({ server });
  wsServer.on("connection", WsClient(target.host, target.port));
  debug(
    [
      `proxying from ${source.host}:${source.port} to ${target.host}:${
        target.port
      }`,
      webRoot && `Web server: Serving: ${webRoot}`,
      (cert && `Running in HTTPS (wss://) mode using: ${cert}, ${key}`) ||
      `Running in unencrypted HTTP (ws://) mode`,
    ]
    .filter(x => x)
    .join("\n"),
    );
  }
  
  /** Start */
  server.listen(source.port, onListen);
