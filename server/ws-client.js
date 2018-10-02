const debug = require("debug")("@d10221/novnc/ws-client");
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

  function connect(ws) {

    function log(msg) {
      debug(`${ws._socket.remoteAddress}: ${msg}`);
    }

    const target = net.createConnection(target_port, target_host, function() {
      log("connected to target %s,%s", target_host, target_host);
    });

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

    function onError(e) {
      log("target connection error", e);
      target.end();
      ws.close();
    }

    function onEnd() {
      log("target disconnected");
      ws.close();
      target.removeListener("data", onData);
      target.removeListener("error", onData);
      target.removeListener("end", onData);
    }

    target.on("data", onData);
    target.on("error", onError);
    target.on("end", onEnd);

    return target;
  }

  /**
   * @param {import("ws")} ws
   *  */
  function onConnection(ws) {

    const target = connect(ws);

    var clientAddr = ws._socket.remoteAddress;

    function log(msg) {
      debug(`${clientAddr}: ${msg}`);
    }

    log(`ws connection (${ws.protocol})`);

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
      ws.removeListener("message", onMessage);
      ws.removeListener("onClose", onClose);
      ws.removeListener("error", onError);
    }

    function onError(a) {
      log(`WebSocket client error: ${a}`);
      target.end();    
    }

    ws.on("message", onMessage);
    ws.on("close", onClose);
    ws.on("error", onError);
  }

  wsServer.on("connection", onConnection);
};
