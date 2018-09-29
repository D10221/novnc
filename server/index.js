const express = require("express");
const { resolve } = require("path");
const WebSocketServer = require("ws").Server;
const Debug = require("debug");
const CreateServer = require("./create-server");
const pkg = require("../package.json");
const WsClient = require("./ws-client");
const help = require("./help");
const argv = require("./argv");
const info = require("./info");

const debug = Debug(pkg.name);
const { source, target, webRoot, cert, key } = require("./config");

if (argv.help || argv.h || argv["?"]) {
  console.log(help(pkg));
  process.exit();
}

/** Validate config */
if (!source.host || !source.port || !target.host || !target.port) {
  debug("config: ", source, target);
  console.log(help(pkg));
  process.exit(-1);
}

try {
  /**
   * Serve Client
   */
  const handler = express()
    .use("/", express.static(webRoot))
    .use(
      "/novnc",
      express.static(resolve(__dirname, "..", "node_modules/@novnc/novnc")),
    );
  /**
   * Start Websocket Proxy
   * @param {Function} success
   */
  function onListen(onSuccess) {
    return function listening() {
      const wsServer = new WebSocketServer({ server: this });
      wsServer.on("connection", WsClient(target.host, target.port));
      onSuccess && success();
    };
  }
  /**
   * display info if DEBUG= enabled
   */
  function success() {
    debug(info({ source, target, webRoot, cert, key }));
  }
  /**
   * Create & start server
   */
  CreateServer(cert, key)(handler).listen(source.port, onListen(success));
} catch (error) {
  debug(error);
  console.log(help(pkg));
  process.exit(-1);
}
