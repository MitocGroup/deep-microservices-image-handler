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
  }

  handle(request, context) {
    let microserviceIdentifier = DeepFramework.Kernel.config.microserviceIdentifier;
    let requestedFileName = request.data.FileName;
    let originalFileName = requestedFileName.split('*')[0];
    let originalFileType = originalFileName.split('.').pop();
    let splittedFileName = requestedFileName.split('*');
    let height = splittedFileName.pop();
    let width = splittedFileName.pop();
    let bucketName = DeepFramework.Kernel.config.microservices[microserviceIdentifier].parameters.s3bucket;
    let transformationLambdaName = DeepFramework.Kernel.config.microservices[microserviceIdentifier].parameters.transformationLambdaName;
    let s3 = new AWS.S3();
    let hashedFileName = Hasher.hash(originalFileName + width + height) + '.' + originalFileType;

    let params = {Bucket: bucketName, Key: hashedFileName};

    s3.getObject(params, (err, data) => {
      if (!err) {
        this.createResponse(data.Body.toString('base64')).send();
      } else {
        let lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
        lambda.invoke(
            {
              FunctionName: transformationLambdaName,
              ClientContext: JSON.stringify(context),
              InvocationType: 'RequestResponse',
              LogType: 'None',
              Payload: JSON.stringify({
                OriginalFileName: originalFileName,
                OutputFileName: hashedFileName,
                Width: width,
                Height: height,
              }),
            },
            (err, response) => {
              if (err) {
                this.createResponse(err).send();
              }

              this.createResponse(response).send();
            }
        );
      }

    });
  }
}
