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

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _Hasher = require('./Hasher');

var _Hasher2 = _interopRequireDefault(_Hasher);

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
    value: function handle(request, context) {
      var _this = this;

      var microserviceIdentifier = _mitocgroupDeepFramework2['default'].Kernel.config.microserviceIdentifier;
      var requestedFileName = request.data.FileName;
      var originalFileName = requestedFileName.split('*')[0];
      var splittedFileName = requestedFileName.split('*');
      var height = splittedFileName.pop();
      var width = splittedFileName.pop();
      var bucketName = _mitocgroupDeepFramework2['default'].Kernel.config.microservices[microserviceIdentifier].parameters.s3bucket;
      var transformationLambdaName = _mitocgroupDeepFramework2['default'].Kernel.config.microservices[microserviceIdentifier].parameters.transformationLambdaName;
      var s3 = new _awsSdk2['default'].S3();
      var hashedFileName = _Hasher2['default'].hash(originalFileName + width + height);

      var params = { Bucket: bucketName, Key: hashedFileName };

      s3.getObject(params, function (err, data) {
        if (!err) {
          _this.createResponse(data.Body.toString('base-64')).send();
        } else {
          var lambda = new _awsSdk2['default'].Lambda({ apiVersion: '2015-03-31' });
          console.log('Invoking lambda');
          lambda.invoke({
            FunctionName: transformationLambdaName,
            ClientContext: JSON.stringify(context),
            InvocationType: 'RequestResponse',
            LogType: 'None',
            Payload: JSON.stringify({ "OriginalFileName": originalFileName, "OutputFileName": hashedFileName, "Width": width, "Height": height })
          }, function (err, response) {
            console.log(err, response);
            _this.createResponse(response).send();
          });
        }
      });
    }
  }]);

  return _default;
})(_mitocgroupDeepFramework2['default'].Core.AWS.Lambda.Runtime);

exports['default'] = _default;
module.exports = exports['default'];