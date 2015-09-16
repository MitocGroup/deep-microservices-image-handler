/**
 * Created by Stefan Hariton on 9/14/15.
 */


'use strict';

import DeepFramework                from '@mitocgroup/deep-framework';
import gm                           from 'gm';
import AWS                          from 'aws-sdk';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {

  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  handle(request) {
    let graphicsMagic = gm.subClass({imageMagick: true});
    let resizeWidth = request.data.Width;
    let resizeHeight = request.data.Height;
    let sourceName = request.data.Name;
    let s3 = new AWS.S3();

    let params = {Bucket: "dynim", Key: sourceName};

    s3.getObject(params, (err, data) => {
      graphicsMagic(data.Body).resize(resizeHeight, resizeWidth)
          .toBuffer('JPG', (err, buffer) => {
            let base64Image = buffer.toString('base64');
            params.Key = sourceName + '/' + resizeHeight + '/' + resizeWidth;
            params.Body = base64Image;
            s3.putObject(params, (err, response) => {
              this.createResponse(base64Image).send();
            })
          })
    });
  }
}