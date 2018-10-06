// RFB holds the API to connect and communicate with a VNC server
import RFB from "./node_modules/@novnc/novnc/core/rfb.js";

export default ({ el, setState, password, url, viewOnly, scaleViewport }) => {

  const rfb = new RFB(el, url, {
    credentials: { password },
  });
  // Set parameters that can be changed on an active connection
  rfb.viewOnly = viewOnly;
  rfb.scaleViewport = scaleViewport;

  /**
   * When this function is called we have successfully connected to a server
   */
  function onConnect() {
    setState({ connected: true });
  }

  /** */
  function onDisconnect(e) {
    console.log(e.detail);
    setState({
      connected: false,
      clean: e.detail.clean,
    });
  }
  /** */
  function onCredentialsRequired(e) {
    const { detail } = e;
    setState({
      credentialsRequired: true,
      credentialTypes: detail.types,
    });
  }
  /** No need to set connected, onDisconnect is called after */
  function onSecurityFailure(e) {
    const { detail } = e;
    const { reason, status } = detail;
    setState({
      reason,
      status,
      event: "securityfailure",
    });
  }
  /** */
  function onDesktopname(e) {
    setState({
      desktopName: e.detail.name,
    });
  }

  // Add listeners to important events from the RFB module
  rfb.addEventListener("connect", onConnect);
  rfb.addEventListener("disconnect", onDisconnect);
  rfb.addEventListener("credentialsrequired", onCredentialsRequired);
  rfb.addEventListener("securityfailure", onSecurityFailure);
  rfb.addEventListener("desktopname", onDesktopname);

  window.$noVnc = rfb;

  return rfb;
};
