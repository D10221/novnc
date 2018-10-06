import { fromQueryOrDefault, getUrl } from "./util.js";
const password = fromQueryOrDefault("password", "");
const url = getUrl();
const viewOnly = fromQueryOrDefault("view_only", false);
const scaleViewport = fromQueryOrDefault("scale", false);

const defaultState = {
  password,
  url,
  viewOnly,
  scaleViewport,
  loginCount: password && password.trim() ? 1 : 0,
};

export default defaultState;
