import passwordInput from "./components/password-input.js";
import { html } from "../node_modules/lit-html/lit-html.js";
import Label from "./components/label.js";
import classNames from "./class-names.js";
import icon from "./components/icon.js";
import IconButton from "./components/icon-button.js";

const ClosePanelButton = ({ hide, onClick }) => {
  return html`${IconButton({
    icon: icon("close"),
    onClick,
    className: classNames("bg07 color08", hide && "display-none"),
  })}`;
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
  const status = `${desktopName ||
    ""} ${connectionStatus} ${errMessage} ${reasonText}`;

  const classes = classNames(
    "flex-wrap justify-between py mx",
    !panelOpen && "display-none",
  );
  return html`
  <div class=${classes}>
  ${Label({
    content: status,
    classes: ["flex", "center-items"],
  })}
  <div class="flex-10"><!--spacer --></div> 
  ${passwordInput({ submit: sendCredentials, hide: !!connected })}
  <div class="flex-10"><!--spacer --></div> 
  ${ClosePanelButton({ onClick: closePanel })}
</div>`;
};
export default App;
