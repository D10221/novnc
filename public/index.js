import { render } from "../node_modules/lit-html/lit-html.js";
import store from "./store/index.js";
import App from "./app.js";
import Rfb from "./rfb.js";
let rfb;

const sendCredentials = password => {
   rfb.sendCredentials({ password });
};

store.onChange(state => {
  setTitle(
    `${state.connected ? "connected" : "disconnected"} ${state.desktopName ||
      ""}`,
  );
  render(App({ ...state, sendCredentials }), document.body);
});

function setTitle(text) {
  document.title = `VNC: ${text}`;
}
// Start: initial render, or 'screen' doesn't exist
store.dispatch({ type: "!START" });

rfb = Rfb({
  el: document.getElementById("screen"),
  setState: store.setState,
  ...store.getState()
});



// navigator.serviceWorker.register('service-worker.js');
