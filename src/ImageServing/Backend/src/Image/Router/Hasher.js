/**
 * Created by Stefan Hariton on 9/16/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _crc32 = require('crc-32');

var _crc322 = _interopRequireDefault(_crc32);

var Hasher = (function () {
  function Hasher() {
    _classCallCheck(this, Hasher);
  }

  _createClass(Hasher, null, [{
    key: 'hash',
    value: function hash(string) {
      return _crc322['default'].str(string).toString();
    }
  }]);

  return Hasher;
})();

exports['default'] = Hasher;
module.exports = exports['default'];