'use strict';

var _server = require('./server');

var _text = require('./text');

module.exports = {
  extract: _text.extract,
  startServer: _server.startServer
};