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
    let requestedFileName = request.data.FileName;
    let originalFileName = requestedFileName.split('*')[0];
    let splittedFileName = requestedFileName.split('*');
    let height = splittedFileName.pop();
    let width = splittedFileName.pop();
    let bucketName = DeepFramework.Kernel.get.parameter('s3bucket');
    let transformationLambdaName = DeepFramework.Kernel.get('transformationLambdaName');
    let s3 = new AWS.S3();
    let hashedFileName = Hasher.hash(originalFileName + width + height);

    let params = {Bucket: bucketName, Key: hashedFileName};

    s3.getObject(params, (err, data) => {
      if (!err) {
        this.createResponse(data.Body.toString('base-64')).send();
      } else {
        let lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
        console.log('Invoking lambda');
        lambda.invoke(
            {
              FunctionName: 'Resize',
              ClientContext: JSON.stringify(context),
              InvocationType: 'RequestResponse',
              LogType: 'None',
              Payload: JSON.stringify({"OriginalFileName": originalFileName, "OutputFileName": hashedFileName, "Width": width, "Height": height})
            },
            (err, response) => {
              console.log(response);
              this.createResponse(response).send();
            }
        );
      }
    });
  }
}