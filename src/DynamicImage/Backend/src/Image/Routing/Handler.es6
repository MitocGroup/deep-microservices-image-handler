/**
 * Created by Stefan Hariton on 9/14/15.
 */

'use strict';

import DeepFramework                from '@mitocgroup/deep-framework';
import AWS                          from 'aws-sdk';
import Hasher                       from './Hasher';

export default class extends DeepFramework.Core.AWS.Lambda.Runtime {

  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);

    console.log('constructing');
    this._s3 = new AWS.S3();
    let microserviceIdentifier = DeepFramework.Kernel.config.microserviceIdentifier;
    this._bucketName = DeepFramework.Kernel.config.microservices[microserviceIdentifier].parameters.s3Bucket;
    this._parameters = undefined;
    this._transcoderLambda = DeepFramework.Kernel.get('resource').get('@deep.mg.dynamic.image:image').action('transcoder');
    console.log('constructed');
  }

  get transcoderLambda() {
    return this._transcoderLambda;
  }

  get s3() {
    return this._s3;
  }

  get microserviceIdentifier() {
    return this._microserviceIdentifier;
  }

  get bucketName() {
    return this._bucketName;
  }

  get parameters() {
    if (this._parameters && Object.getOwnPropertyNames(this._parameters).length !== 0) {
      return this._parameters;
    } else {
      throw new Error('Init method was not called yet');
    }
  }

  /**
   * Initializes the parameters
   * @param request
   */
  init(request) {
    console.log('initializing');
    this._parameters = {};
    this._parameters.requestedFileName = request.data.FileName;
    this._parameters.originalFileName = this._parameters.requestedFileName.split('*')[0];
    this._parameters.originalFileType = this._parameters.originalFileName.split('.').pop();
    let splitFileName = this._parameters.requestedFileName.split('*');
    this._parameters.height = splitFileName.pop();
    this._parameters.width = splitFileName.pop();
    this._parameters.hashedFileName = Hasher.hash(
            this._parameters.originalFileName +
            this._parameters.width +
            this._parameters.height) +
        '.' +
        this._parameters.originalFileType;

    console.log('initialized');
  }

  /**
   * Tries to find the existing image by hash.
   * @param cb
   */
  tryToFindImage(cb) {
    console.log('findingImage');
    let params = {Bucket: this.bucketName, Key: this.parameters.hashedFileName};
    this.s3.getObject(params, cb);
  }

  /**
   * Invokes the lambda for transcoding
   * @param cb
   */
  invokeTranscodingLambda(cb) {
    console.log('invoking transcoding');
    let parameters = {
      OriginalFileName: this.parameters.originalFileName,
      OutputFileName: this.parameters.hashedFileName,
      Width: this.parameters.width,
      Height: this.parameters.height,
    };

    this.transcoderLambda.request(parameters, 'GET').send(cb);
  }

  /**
   * Handles the request
   * @param request
   * @param context
   */
  handle(request, context) {
    this.init(request, context);

    this.tryToFindImage((err, data) => {
      if (!err) {
        console.log('image found');
        this.createResponse(data.Body.toString('base64')).send();
      } else {
        this.invokeTranscodingLambda((response) => {
          console.log('image');
          console.log(err, response);
          if (response.isError) {
            this.createResponse(response.error).send();
          } else {
            this.createResponse(response.data).send();
          }
        });
      }
    });
  }
}
