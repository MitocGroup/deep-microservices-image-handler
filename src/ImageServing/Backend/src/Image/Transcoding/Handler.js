/**
 * Created by Stefan Hariton on 9/14/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mitocgroupDeepFramework = require('@mitocgroup/deep-framework');

var _mitocgroupDeepFramework2 = _interopRequireDefault(_mitocgroupDeepFramework);

var _gm = require('gm');

var _gm2 = _interopRequireDefault(_gm);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _default = (function (_DeepFramework$Core$AWS$Lambda$Runtime) {
  _inherits(_default, _DeepFramework$Core$AWS$Lambda$Runtime);

  /**
   * @param {Array} args
   */

  function _default() {
    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, args);
  }

  _createClass(_default, [{
    key: 'handle',
    value: function handle(request) {
      var _this = this;

      var graphicsMagic = _gm2['default'].subClass({ imageMagick: true });
      var resizeWidth = request.data.Width;
      var resizeHeight = request.data.Height;
      var sourceName = request.data.Name;
      var s3 = new _awsSdk2['default'].S3();

      var params = { Bucket: "dynim", Key: sourceName };

      s3.getObject(params, function (err, data) {
        graphicsMagic(data.Body).resize(resizeHeight, resizeWidth).toBuffer('JPG', function (err, buffer) {
          var base64Image = buffer.toString('base64');
          params.Key = sourceName + '/' + resizeHeight + '/' + resizeWidth;
          params.Body = base64Image;
          s3.putObject(params, function (err, response) {
            _this.createResponse(base64Image).send();
          });
        });
      });
    }
  }]);

  return _default;
})(_mitocgroupDeepFramework2['default'].Core.AWS.Lambda.Runtime);

exports['default'] = _default;
module.exports = exports['default'];