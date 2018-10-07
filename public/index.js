import { render } from "../node_modules/lit-html/lit-html.js";
import store, { actions, bindActions } from "./store/index.js";
import App from "./app.js";
import Rfb from "./rfb.js";

const rfb = Rfb({
  el: document.getElementById("screen"),
  ...bindActions(actions, store.dispatch) ,
  ...store.getState(),
});

/** user driver login */
const sendCredentials = password => {
  store.dispatch(actions.onSendCredentials());
  rfb.sendCredentials({ password });
};

store.onChange(state => {
  setTitle(
    `${state.connected ? "connected" : "disconnected"} ${state.desktopName ||
      ""}`,
  );
  render(
    App({ ...state, sendCredentials, ...bindActions(actions, store.dispatch) }),
    document.getElementById("app"),
  );
});

function setTitle(text) {
  document.title = `VNC: ${text}`;
}
// Start: initial render, or 'screen' doesn't exist
store.dispatch({ type: "!START" });



// navigator.serviceWorker.register('service-worker.js');
