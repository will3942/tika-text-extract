'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = startServer;

var _child_process = require('child_process');

/**
 * Starts a Tika Server on a default localhost:9998
 * @param {String} artifactPath Full path to .jar file of Tika Server
 * @return {Promise.<void>} Resolves when server is started
 */
function startServer(artifactPath) {
  if (!artifactPath) {
    throw new Error('Please provide path to Tika Server Artifact');
  }

  var startCommand = `java -Duser.home=/tmp -jar ${artifactPath}`;

  return new Promise(function (resolve, reject) {
    (0, _child_process.exec)(startCommand).stderr.on('data', function (data) {
      var isStarted = data.indexOf('INFO: Started') > -1;
      var isError = data.match(/java.*Exception|error/i);

      if (isStarted) {
        resolve();
      }

      if (isError) {
        reject(new Error(data));
      }
    });
  });
}