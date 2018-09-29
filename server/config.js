const argv = require("./argv");
const Debug = require("debug");
const debug = Debug("@d10221/novnc/config");
const path = require("path");
const os = require("os");

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
/**
 *
 * @param {string} filePath
 * @return {string|undefined}
 */
function resolve(filePath) {
  return filePath && path.resolve(filePath.replace("~", os.homedir));
}

/** */
module.exports = {
  source: getArgs(argv._[0] || process.env.SOURCE || ""),
  target: getArgs(argv._[1] || process.env.TARGET || ""),
  webRoot: argv.webRoot || "../public",
  cert: resolve(argv.cert),
  key: resolve(argv.key),
};
