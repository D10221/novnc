import passwordInput from "./components/password-input.js";
import { html } from "../node_modules/lit-html/lit-html.js";

const App = ({
  status,
  reason,
  desktopName,
  connected,
  clean,
  credentialsRequired,
  credentialTypes,
  sendCredentials,
}) => {
  
  const isConnected = !!connected;
  const connectionStatus = isConnected ? "connected" : "disconnected";
  const passwordRequired =
    !isConnected &&
    credentialsRequired &&
    (credentialTypes || []).indexOf("password") !== -1;
  const passwordRequiredText = "Password Required:";
  const err = !isConnected && !clean;
  const errMessage =
    (passwordRequired && passwordRequiredText) ||
    (err && "Something went wrong") ||
    "";
  const statusText = (status && `status: ${status}`) || "";
  const reasonText = reason || "";

  return html`
    <div class="flx-row jty-btwn m1">
      <div class="">${desktopName} ${connectionStatus} ${errMessage} ${statusText} ${reasonText}</div>
      <div class="flx-10"></div>
      ${passwordInput({ submit: sendCredentials, hide: isConnected })}
    </div>
    <div id="screen" class="flx-10"></div>`;
};
export default App;
