'use strict';
'format es6';

var deepAsset = DeepFramework.Kernel.container.get('asset');

export default {
  'dynamic-image': {
    url: '/dynamic-image',
    controller: 'DynamicImageController',
    controllerAs: 'dynamic-image',
    templateUrl: deepAsset.locate('@deep.dynamic.image:js/app/angular/views/image.html'),
    data: {
      pageTitle: 'Dynamic Image!',
    },
  },
};
