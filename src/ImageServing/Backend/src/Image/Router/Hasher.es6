/**
 * Created by Stefan Hariton on 9/16/15.
 */

'use strict';

import CRC32 from 'crc-32';

export default class Hasher {
  constructor() {

  }

  static hash(string) {
    return CRC32.str(string);
  }
}