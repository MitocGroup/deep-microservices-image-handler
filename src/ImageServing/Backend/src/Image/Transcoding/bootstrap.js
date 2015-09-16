/**
 * Created by Stefan Hariton on 7/29/15.
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mitocgroupDeepFramework = require('@mitocgroup/deep-framework');

var _mitocgroupDeepFramework2 = _interopRequireDefault(_mitocgroupDeepFramework);

var _Handler = require('./Handler');

var _Handler2 = _interopRequireDefault(_Handler);

if (typeof Symbol === 'undefined') {
  require('babel-core/polyfill');
}

exports.handler = function (event, context) {
  _mitocgroupDeepFramework2['default'].Kernel.loadFromFile('_config.json', function () {
    return new _Handler2['default']().run(event, context);
  });
};