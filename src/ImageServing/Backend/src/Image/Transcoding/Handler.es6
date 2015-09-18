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
    let microserviceIdentifier = DeepFramework.Kernel.config.microserviceIdentifier;
    let resizeWidth = request.data.Width;
    let resizeHeight = request.data.Height;
    let sourceName = request.data.OriginalFileName;
    let outputName = request.data.OutputFileName;
    let s3 = new AWS.S3();
    let s3BucketName = DeepFramework.Kernel.config.microservices[microserviceIdentifier].parameters.s3bucket;

    let params = {Bucket: s3BucketName, Key: sourceName};

    s3.getObject(params, (err, data) => {
      if (err) {
        this.createResponse(err).send();
      }

      graphicsMagic(data.Body).resize(resizeHeight, resizeWidth)
          .toBuffer('JPG', (err, buffer) => {
            let base64Image = buffer.toString('base64');
            params.Key = outputName;
            params.Body = buffer;
            s3.putObject(params, (err, response) => {
              this.createResponse(base64Image).send();
            });
          });
    });
  }
}
