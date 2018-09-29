const debug = require("debug")("@d10221/novnc/websocket-client");
const net = require("net");
/**
 * 
 * @param {string} target_host 
 * @param {number} target_port 
 * @description Create WsClient
 */
module.exports = function WsClient(target_host, target_port) {

  return function wsClient(client) {

    var clientAddr = client._socket.remoteAddress;

    function log(msg) {
      debug(` ${clientAddr}: ${msg}`);
    }
    log("WebSocket connection");
    log(`Version: ${client.protocolVersion}, subprotocol: ${client.protocol}`);

    var target = net.createConnection(target_port, target_host, function() {
      log("connected to target");
    });

    target.on("data", (data) => {      
      try {
        if (client.protocol === "base64") {
          client.send(new Buffer(data).toString("base64"));
        } else {
          client.send(data, { binary: true });
        }
      } catch (e) {
        log("Client closed, cleaning up target");
        target.end();
      }
    });

    target.on("end", () => {
      log("target disconnected");
      client.close();
    });

    target.on("error", () => {
      log("target connection error");
      target.end();
      client.close();
    });

    client.on("message", msg => {
      if (client.protocol === "base64") {
        target.write(new Buffer(msg, "base64"));
      } else {
        target.write(msg, "binary");
      }
    });

    client.on("close", (code, reason) => {
      log(`WebSocket client disconnected: ${code} [${reason}]`);
      target.end();
    });

    client.on("error", a => {
      log(`WebSocket client error: ${a}`);
      target.end();
    });
  };
};
