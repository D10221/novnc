const debug = require("debug")("@d10221/novnc/websocket-client");
const net = require("net");
const WebSocketServer = require("ws").Server;
/**
 *
 * @param {string} target_host
 * @param {number} target_port
 * @param {import("http").Server|import("https").Server} server
 * @description Create WsClient
 */
module.exports = function WsClient(target_host, target_port, server) {
  const wsServer = new WebSocketServer({ server });

  /**
   * @param {import("ws")} ws
   *  */
  function onConnection(ws) {
    
    var clientAddr = ws._socket.remoteAddress;

    function log(msg) {
      debug(` ${clientAddr}: ${msg}`);
    }
    log("WebSocket connection");
    log(`Version: ${ws.protocolVersion}, subprotocol: ${ws.protocol}`);

    function onData(data) {
      try {
        if (ws.protocol === "base64") {
          ws.send(new Buffer(data).toString("base64"));
        } else {
          ws.send(data, { binary: true });
        }
      } catch (e) {
        log("Client closed, cleaning up target");
        target.end();
      }
    }
    function onEnd() {
      log("target disconnected");
      ws.close();
    }

    function onError() {
      log("target connection error");
      target.end();
      ws.close();
    }

    var target = net.createConnection(target_port, target_host, function() {
      log("connected to target");
    });

    function onMessage(msg) {
      if (ws.protocol === "base64") {
        target.write(new Buffer(msg, "base64"));
      } else {
        target.write(msg, "binary");
      }
    }
    function onClose(code, reason) {
      log(`WebSocket client disconnected: ${code} [${reason}]`);
      target.end();
    }

    function onWsError(a) {
      log(`WebSocket client error: ${a}`);
      target.end();
    }

    target.on("data", onData);

    target.on("end", onEnd);

    target.on("error", onError);

    ws.on("message", onMessage);

    ws.on("close", onClose);

    ws.on("error", onWsError);
  }

  wsServer.on("connection", onConnection);
};
