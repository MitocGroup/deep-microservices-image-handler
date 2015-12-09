'use strict';

import moduleName from '../name';

export class DeepDynamicImageController {
  constructor($scope) {
    // @todo: inject this using ng DI
    //this._dynamicImageResource = DeepFramework.Kernel.get('resource').get('@deep.dynamic.image:dynamicImage');

    this._$scope = $scope;
  }
}

angular.module(moduleName).controller('DeepDynamicImageController',
  ['$scope', function(...args) {
    return new DeepDynamicImageController(...args);
  },]

);