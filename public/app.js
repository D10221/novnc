import passwordInput from "./components/password-input.js";
import { html } from "../node_modules/lit-html/lit-html.js";

const App = ({
  reason,
  desktopName,
  connected,
  error,
  passwordRequired,
  sendCredentials,
}) => {  
  const connectionStatus = !!connected ? "connected" : "disconnected";
  const passwordRequiredText = "Password Required:";
  const errMessage =
    (passwordRequired && passwordRequiredText) ||
    (error && "Something went wrong") ||
    "";
  const reasonText = reason || "";

  return html`
    <div class="flx-row jty-btwn m1">
      <div class="">${desktopName} ${connectionStatus} ${errMessage} ${reasonText}</div>
      <div class="flx-10"></div>
      ${passwordInput({ submit: sendCredentials, hide: !!connected })}
    </div>
    <div id="screen" class="flx-10"></div>`;
};
export default App;
