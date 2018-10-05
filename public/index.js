// RFB holds the API to connect and communicate with a VNC server
import RFB from "./node_modules/@novnc/novnc/core/rfb.js";
import { fromQueryOrDefault, getUrl } from "./util.js";

const password = fromQueryOrDefault("password", "");
const url = getUrl();
const viewOnly = fromQueryOrDefault("view_only", false);
const scaleViewport = fromQueryOrDefault("scale", false);
const debugEnabled = localStorage.getItem("$DEBUG") === "enabled";
let desktopName = "";

const rfb = new RFB(document.getElementById("screen"), url, {
  credentials: { password },
});
// Set parameters that can be changed on an active connection
rfb.viewOnly = viewOnly;
rfb.scaleViewport = scaleViewport;
// Add listeners to important events from the RFB module
rfb.addEventListener("connect", onConnect);
rfb.addEventListener("disconnect", onDisconnect);
rfb.addEventListener("credentialsrequired", onCredentialsRequired);
rfb.addEventListener("securityfailure", onSecurityFailure);
rfb.addEventListener("desktopname", onDesktopname);

/**
 * When this function is called we have successfully connected to a server
 */
function onConnect(e) {
  log("connect");
  status("Connected to " + desktopName);
}

/** */
function onDisconnect(e) {
  log("disconnect");
  if (e.detail.clean) {
    status("Disconnected");
  } else {
    status("Something went wrong, connection is closed");
  }
}
/** */
function onCredentialsRequired(e) {
  const { detail } = e;
  if (detail.types.indexOf("password") !== -1) {
    const password = prompt("Password Required:");
    rfb.sendCredentials({ password });
  }
}
/** */
function onSecurityFailure(e) {
  const { detail } = e;
  const { reason, status } = detail;
  log("securityfailure", detail);
}
/** */
function onDesktopname(e) {
  desktopName = e.detail.name;
}

function log(...args) {
  debugEnabled && console.log(...args);
}

function status(text) {
  document.title = `VNC: ${text}`;
}

window.$NoVnc = rfb;

// navigator.serviceWorker.register('service-worker.js');
