'use strict';

import moduleName from '../name';

export class DynamicImageController {
  constructor($scope) {
    // @todo: inject this using ng DI
    //this._dynamicImageResource = DeepFramework.Kernel.get('resource').get('@deep.dynamic.image:dynamicImage');

    this._$scope = $scope;
  }
}

angular.module(moduleName).controller('DynamicImageController',
  ['$scope', function(...args) {
    return new DynamicImageController(...args);
  },]

);