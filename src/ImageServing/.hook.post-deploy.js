/**
 * Created by Stefan Hariton on 09/18/15
 */

'use strict';

var AWS = require('aws-sdk');
var parameters = require('.parameters.json');
var s3 = new AWS.S3();

var exports = module.exports = function(callback) {
  var microservice = this.microservice;
  var provisioning = this.provisioning;
  var base64EmptyPixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=';
  var bucketName = provisioning.config.s3.buckets.public.name;
  var apiGatewayHostname = parameters.backend.apiGatewayHostname;
  var apiGatewayPrefix = parameters.backend.apiGatewayPrefix;

  function updateS3WebsiteRedirectRules() {
    s3.getBucketWebsite({Bucket: bucketName}, function(err, response) {
      if (err) {
        throw new Error(err);
      }

      response.RoutingRules = [
        {
          Redirect: {
            HostName: parameters.backend.apiGatewayHostname,
            HttpRedirectCode: 301,
            Protocol: 'https',
            ReplaceKeyPrefixWith: parameters.backend.apiGatewayPrefix,
          },
          Condition: {
            HttpErrorCodeReturnedEquals: '404',
          },
        },
        {
          Redirect: {
            HostName: parameters.backend.apiGatewayHostname,
            HttpRedirectCode: 301,
            Protocol: 'https',
            ReplaceKeyPrefixWith: parameters.backend.apiGatewayPrefix,
          },
          Condition: {
            HttpErrorCodeReturnedEquals: '403',
          },
        },
      ];
    }.bind(this));

    s3.putBucketWebsite(websiteConfiguration);
  }

  function put1x1EmptyPixel() {
    var parameters = {
      Bucket: bucketName,
      Key: 'transparent1x1.png',
    };

    s3.getObject(parameters, function(err, response) {
      if (err) {
        parameters.Body = new Buffer(base64EmptyPixel, 'base64');
        s3.putObject(parameters, function(err, response) {
          if (err) {
            throw new Error(err);
          }

          return callback();
        });
      } else {
        return callback();
      }
    }.bind(this));
  }

  function async(array, cb) {
    var pending = array.length;
    function functionDone() {
      pending = pending - 1;
    }

    for (var i = 0; i < pending; i++) {
      array[i](functionDone());
    }

    //Not finished
  }

};
