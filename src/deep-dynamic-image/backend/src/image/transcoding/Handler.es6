'use strict';

import DeepFramework from 'deep-framework';
import gm from 'gm';
import AWS from 'aws-sdk';
import fileType from 'file-type';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {

  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);

    this._graphicsMagic = gm.subClass({imageMagick: true});
    this._s3 = new AWS.S3();
    this._microserviceIdentifier = DeepFramework.Kernel.config.microserviceIdentifier;
    this._s3BucketName = DeepFramework.Kernel.config.microservices[this.microserviceIdentifier].parameters.s3Bucket;
  }

  get graphicsMagic() {
    return this._graphicsMagic;
  }

  get s3() {
    return this._s3;
  }

  get microserviceIdentifier() {
    return this._microserviceIdentifier;
  }

  get s3BucketName() {
    return this._s3BucketName;
  }

  get parameters() {
    if (this._parameters && Object.getOwnPropertyNames(this._parameters).length !== 0) {
      return this._parameters;
    } else {
      throw new Error('Init method was not called yet');
    }
  }

  init(request) {
    this._parameters = {};
    this._parameters.resizeWidth = request.data.Width;
    this._parameters.resizeHeight = request.data.Height;
    this._parameters.sourceName = request.data.OriginalFileName;
    this._parameters.outputName = request.data.OutputFileName;
  }

  handle(request) {
    this.init(request);

    let params = {
      Bucket: this.s3BucketName,
      Key: this.parameters.sourceName,
    };

    this.s3.getObject(params, (err, data) => {
      if (err) {
        this.createResponse(err).send();
      }

      this.graphicsMagic(data.Body).resize(this.parameters.resizeHeight, this.parameters.resizeWidth)
          .toBuffer('JPG', (err, buffer) => {
            //let base64Image = buffer.toString('base64');
            params.Key = this.parameters.outputName;
            params.Body = buffer;
            params.ContentType = fileType(buffer).mime;
            this.s3.putObject(params, (err, response) => {
              console.log(err, response);
              if (err) {
                throw new Error(err);
              }

              this.createResponse('Success').send();
            });
          });
    });
  }
}
