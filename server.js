/* Node.js host file.
 * To run locally
 * 1. Install Node.js
 * At a command prompt:
 * a. npm install connect
 * b. npm server.js
 *
 * Access via localhost:8080/index.html
 */
var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(8080);