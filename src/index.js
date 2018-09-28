#!/usr/bin/env node
const debug = require("debug")("@d10221/novnc");
const createServer = require("./create-server");
const WebSocketServer = require("ws").Server;
const WsClient = require("./ws-client");
const express = require("express");
const { source, target, webRoot, cert } = require("./config");
const { resolve } = require("path");

/** Validate config */
if (!source.host || !source.port || !target.host || !target.port) {
  console.error(
    "usage: [source_addr:]source_port [target_addr:]target_port [--webRoot web_dir] [--cert cert.pem [--key key.pem]]",
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
/** Start */
const server = createServer(app);
server.listen(source.port, function onListen() {
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
});
