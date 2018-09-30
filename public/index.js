// RFB holds the API to connect and communicate with a VNC server
import RFB from "/novnc/core/rfb.js";

function getUrl() {
  const host = fromQueryOrDefault("host", window.location.hostname);
  const port = fromQueryOrDefault("port", window.location.port);
  const path = fromQueryOrDefault("path", "websockify");
  const protocol = (window.location.protocol === "https:" && "wss") || "ws";
  // Build the websocket URL used to connect
  const url = `${protocol}://${host}${port && `:${port}`}/${path}`;
  return url;
}

class NoVnc {
  constructor(
    password,
    url,
    viewOnly,
    scaleViewport,
    desktopName,
    debugEnabled,
  ) {
    this.viewOnly = viewOnly;
    this.scaleViewport = scaleViewport;
    this.desktopName = desktopName;
    /** @type {RFB} */

    this.debugEnabled = debugEnabled;

    
    this.log = this.log.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onCredentialsRequired = this.onCredentialsRequired.bind(this);
    this.onDesktopname = this.onDesktopname.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.onSecurityFailure = this.onSecurityFailure.bind(this);
    this.status = this.status.bind(this);
    
    this.status("Connecting");
    // Creating a new RFB object will start a new connection
    const rfb = new RFB(document.getElementById("screen"), url, {
      credentials: { password: password },
    });
    // Set parameters that can be changed on an active connection
    rfb.viewOnly = this.viewOnly;
    rfb.scaleViewport = this.scaleViewport;
    // Add listeners to important events from the RFB module
    rfb.addEventListener("connect", this.onConnect);
    rfb.addEventListener("disconnect", this.onDisconnect);
    rfb.addEventListener("credentialsrequired", this.onCredentialsRequired);
    rfb.addEventListener("securityfailure", this.onSecurityFailure);
    rfb.addEventListener("desktopname", this.onDesktopname);
    this.rfb = rfb;
  }
  /**
   * When this function is called we have successfully connected to a server
   */
  onConnect(e) {
    this.log("connect");
    this.status("Connected to " + this.desktopName);
  }

  /** */
  onDisconnect(e) {
    log("disconnect");
    if (e.detail.clean) {
      this.status("Disconnected");
    } else {
      this.status("Something went wrong, connection is closed");
    }
  }
  /** */
  onCredentialsRequired(e) {
    let _ = this;
    const { detail } = e;
    if (detail.types.indexOf("password") !== -1) {
      _.password = prompt("Password Required:");
      _.rfb.sendCredentials({ password: this.password });
    }
  }
  /** */
  onSecurityFailure(e) {
    const { detail } = e;
    const { reason, status } = detail;
    log("securityfailure", detail);
  }
  /** */
  onDesktopname(e) {
    this.desktopName = e.detail.name;
  }

  log(...args) {
    this.debugEnabled && console.log(...args);
  }

  status(text) {
    document.title = `VNC: ${text}`;
  }
}

// query string. If the variable isn't defined in the URL
// it returns the default value instead.
function fromQueryOrDefault(name, defaultValue) {
  // Note that we use location.href instead of location.search
  // because Firefox < 53 has a bug w.r.t location.search
  const re = new RegExp(".*[?&]" + name + "=([^&#]*)");

  const match = document.location.href.match(re);
  if (match) {
    // We have to decode the URL since want the cleartext value
    return decodeURIComponent(match[1]);
  }

  if (typeof defaultValue === "undefined") {
    return null;
  }
  return defaultValue;
}

document.addEventListener("keyup", e => {
  log("keyup ", e);
});

window.$NoVnc = new NoVnc(
  /* password: */ fromQueryOrDefault("password", ""), //
  /* url: */ getUrl(), //
  /* viewOnly: */ fromQueryOrDefault("view_only", false), //
  /* scaleViewport: */ fromQueryOrDefault("scale", false),
  /* desktopName: */ "",
  /* debugEnabled: */ localStorage.getItem("$DEBUG") === "enabled",
);

// navigator.serviceWorker.register('service-worker.js');
