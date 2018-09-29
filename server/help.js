/**
 *
 * @param {{name: {string}, version: {string}}} pkg
 * @returns {string}
 */
module.exports = pkg => `${pkg.name} version v${pkg.version}
Usage: 
\t novnc <[<SOURCE_ADDR>:]<SOURCE_PORT>> <[<TARGET_ADDR>:]<TARGET_PORT>>

Alt:
\tSOURCE=localhost:6080 TARGET=localhost:5901 novnc

Options:
\t--webRoot </path/to/static/dir> 
\t--cert </path/to/cert.pem> 'cert || cert && key'
\t--key </path/to/key.pem>

Debug:
\tDEBUG=${pkg.name}* novnc
  `;
