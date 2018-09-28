const debug = require("debug")("@d10221/novnc/config");
const argv = require("minimist")(process.argv.slice(2));

/** @param {string} arg*/
function split(arg) {
  try {
    const parts = arg.split(":");
    return {
      host: (parts.length > 0 && parts[0]) || "localhost",
      port: parseInt(parts[parts.length > 0 ? 1 : 0], 10),
    };
  } catch (error) {
    debug.error(error);
    return {
      host: undefined,
      port: undefined,
    };
  }
}

/** */
module.exports = {
  source: split(argv._[0] || process.env.SOURCE || ""),
  target: split(argv._[1]),
  webRoot: argv.webRoot || "./public",
  cert: argv.cert,
  key: argv.key,
};
