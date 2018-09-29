const cp = require("child_process");
/**
 *
 * @param cmd {string}
 * @param args {string[]}
 */
const spawnCmd = (cmd, args) => {
  return new Promise((resolve, reject) => {
    const exec = cp.spawn(cmd, args, {
      stdio: "inherit",
      shell: true,
    });

    exec.on("error", error => {
      reject(error);
    });
    exec.on("exit", code => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};
module.exports = spawnCmd;
