const debug = require("debug")("@d10221/novnc/config");
const argv = require("minimist")(process.argv.slice(2));

/**
 * @param {string|number} arg
 * @returns {{ port?: number, host?: string}}
 * */
function getArgs(arg) {
  try {
    if (typeof arg === "number") return { port: arg, host: "localhost" };
    const parts = arg.split(":");
    return {
      host: (parts.length > 1 && parts[0]) || "localhost",
      port: parseInt(parts[parts.length > 1 ? 1 : 0], 10),
    };
  } catch (error) {
    debug(error);
    return {
      host: undefined,
      port: undefined,
    };
  }
}

/** */
module.exports = {
  source: getArgs(argv._[0] || process.env.SOURCE || ""),
  target: getArgs(argv._[1] || process.env.TARGET || ""),
  webRoot: argv.webRoot || "./public",
  cert: argv.cert,
  key: argv.key,
};
