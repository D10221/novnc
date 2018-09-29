const cp = require("child_process");
/**
 *
 * @param {string} cmd
 * @returns {Promise<string>}
 */
async function runCmd(cmd) {
  const { stdout, stderr } = await new Promise((resolve, reject) => {
    cp.exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err);
      return resolve({
        stdout,
        stderr,
      });
    });
  });
  if (stderr) {
    return Promise.reject(new Error(stderr));
  }
  return Promise.resolve(stdout);
}
module.exports = runCmd;