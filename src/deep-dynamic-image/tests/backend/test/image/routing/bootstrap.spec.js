'use strict';

import chai from 'chai';
import bootstrap from '../../../../../backend/src/image/routing/bootstrap';

suite('Bootstraps', () => {
  test(' bootstrap exists in deep-microservices-dynamic-image-routing module', () => {
    chai.expect(bootstrap).to.be.an('object');
  });
});
