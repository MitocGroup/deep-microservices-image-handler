'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/image/transcoding/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in deep-microservices-dynamic-image-transcoding module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
