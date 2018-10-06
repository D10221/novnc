import passwordInput from "./components/password-input.js";
import { html } from "../node_modules/lit-html/lit-html.js";
import Label from "./components/label.js";

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
    <div class="flex-row justify-between border-bottom border-solid border-0A border-box py">
    ${Label({
          content: `${desktopName} ${connectionStatus} ${errMessage} ${reasonText}`,
          classes: ["flex", "center-items"]
        })}
      <div class="flex-10"></div>
      ${passwordInput({ submit: sendCredentials, hide: !!connected })}
    </div>
    <div id="screen" class="flex-10"></div>`;
};
export default App;
