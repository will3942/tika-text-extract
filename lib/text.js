'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extract = extract;

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _intoStream = require('into-stream');

var _intoStream2 = _interopRequireDefault(_intoStream);

var _isStream = require('is-stream');

var _isStream2 = _interopRequireDefault(_isStream);

var _getStream = require('get-stream');

var _getStream2 = _interopRequireDefault(_getStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL = 'http://localhost:9998/tika';

/**
 * Extract text from a document
 * @param {Buffer|String|Promise} input File to extract text from
 * @return {Promise.<String>} Extracted text
 */
function extract() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var type = arguments[1];

  var fileStream = (0, _isStream2.default)(input) ? input : (0, _intoStream2.default)(input);
  var tikaStream = _got2.default.stream.put(URL, {
    headers: { Accept: 'text/plain', 'Content-Type': type, 'X-Tika-PDFOcrStrategy': 'ocr_only' }
  });

  return (0, _getStream2.default)(fileStream.pipe(tikaStream));
}