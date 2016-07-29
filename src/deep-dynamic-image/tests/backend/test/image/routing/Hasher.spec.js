// THIS TEST WAS GENERATED AUTOMATICALLY ON Thu Jul 28 2016 18:48:58 GMT+0300 (EEST)

'use strict';

import chai from 'chai';
import Hasher from '../../../../../backend/src/image/routing/Hasher';

suite('Hasher', () => {
  let hasher;

  test('Class Hasher exists', () => {
    chai.expect(Hasher).to.be.an('function');
  });

  test('Check hasher constructor', () => {
    hasher = new Hasher();

    chai.expect(hasher).to.be.an.instanceof(Hasher);
  });

  test('Check hash method', () => {
    chai.expect(Hasher.hash('test')).to.be.an('string');
  });
});
