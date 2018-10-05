// RFB holds the API to connect and communicate with a VNC server
import RFB from "./node_modules/@novnc/novnc/core/rfb.js";
import { fromQueryOrDefault, getUrl } from "./util.js";
import { render, html } from "../node_modules/lit-html/lit-html.js";
import store from "./store/index.js";

const App = ({
  status,
  reason,
  desktopName,
  connected,
  clean,
  credentialsRequired,
  credentialTypes,
}) => {
  const isConnected= !!connected;
  const connectionStatus = isConnected ? "connected" : "disconnected";
  const passwordRequired = !isConnected && 
    credentialsRequired && (credentialTypes || []).indexOf("password") !== -1;
  const passwordRequiredText = "Password Required:";
  const err = !isConnected && !clean;
  const errMessage =
    (passwordRequired && passwordRequiredText) ||
    (err && "Something went wrong") ||
    "";
  const statusText = status && `status: ${status}` || "";
  const reasonText = reason || "";
  
  const passwordInput = () => {
    if(isConnected) return html``;
    const onClick = () => {
      rfb.sendCredentials({
        password: document.getElementById("password").value,
      });
    };
    return html`<div>
      <label>Password</label>
      <input id="password" type="password" />
      <button @click=${onClick}> Submit </button>
    </div>`;
  };
  return html`
  <div id="toolbar" class="flex-row space-between">
    <div id="status" class="">${desktopName} ${connectionStatus} ${errMessage} ${statusText} ${reasonText}</div>
    <div class="flex-grow"></div>
    ${passwordInput()}
  </div>
  <div id="screen" class="flex-10"></div>`;
};

store.subscribe(() => {
  const state = store.getState();
  setTitle(
    `${state.connected ? "connected" : "disconnected"} ${state.desktopName ||
      ""}`,
  );
  render(App(state), document.body);
});
store.dispatch({ type: "!START" });

const password = fromQueryOrDefault("password", "");
const url = getUrl();
const viewOnly = fromQueryOrDefault("view_only", false);
const scaleViewport = fromQueryOrDefault("scale", false);
const debugEnabled = localStorage.getItem("$DEBUG") === "enabled";

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
function onConnect() {
  store.setState({ connected: true });
}

/** */
function onDisconnect(e) {
  console.log(e.detail);
  store.setState({
    connected: false,
    clean: e.detail.clean,
  });
}
/** */
function onCredentialsRequired(e) {
  const { detail } = e;
  store.setState({
    credentialsRequired: true,
    credentialTypes: detail.types,
  });
}
/** No need to set connected, onDisconnect is called after */
function onSecurityFailure(e) {
  const { detail } = e;
  const { reason, status } = detail;
  store.setState({
    reason,
    status,
    event: "securityfailure",
  });
}
/** */
function onDesktopname(e) {
  store.setState({
    desktopName: e.detail.name,
  });
}

function log(...args) {
  debugEnabled && console.log(...args);
}

function setTitle(text) {
  document.title = `VNC: ${text}`;
}

window.$NoVnc = rfb;

// navigator.serviceWorker.register('service-worker.js');
