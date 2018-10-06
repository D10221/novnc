import passwordInput from "./components/password-input.js";
import { html } from "../node_modules/lit-html/lit-html.js";
import Label from "./components/label.js";

const ClosePanelButton = ({ hide, onClick }) => {
  return !!hide
    ? html``
    : html`
  <button class="border-pill bg07 color08  mx" @click=${onClick}>
    <i class="material-icons">close</i>
  </button>`;
};

const App = ({
  reason,
  desktopName,
  connected,
  error,
  passwordRequired,
  sendCredentials,
  closePanel,
  panelOpen,
}) => {
  const connectionStatus = !!connected ? "connected" : "disconnected";
  const passwordRequiredText = "Password Required:";
  const errMessage =
    (!connected && passwordRequired && passwordRequiredText) ||
    (error && "Something went wrong") ||
    "";
  const reasonText = reason || "";
  const Panel = () => {
    return !panelOpen ? (
      html``
    ) : html`
    <div class="flex-row justify-between border-bottom border-solid border-0A border-box py">
    ${Label({
      content: `${desktopName ||
        ""} ${connectionStatus} ${errMessage} ${reasonText}`,
      classes: ["flex", "center-items"],
    })}
    <div class="flex-10" />
    ${passwordInput({ submit: sendCredentials, hide: !!connected })}
    ${ClosePanelButton({ hide: !connected, onClick: closePanel })}
  </div>`;
  };
  return html`
    ${Panel()}
    <div id="screen" class="flex-10"></div>`;
};
export default App;
