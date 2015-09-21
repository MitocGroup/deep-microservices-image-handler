/**
 * Created by Stefan Hariton on 09/18/15
 */

'use strict';

var AWS = require('aws-sdk');
var parameters = require('./.parameters.json');
var s3 = new AWS.S3();
var async = require('async');

var exports = module.exports = function(callback) {
  var bucketName = parameters.backend.s3Bucket;

  console.log(bucketName);
  async.parallel([
    updateBucketWebsite,
    put1x1EmptyPixel,
  ], callback);

  function updateBucketWebsite(cb) {
    console.log('updating bucket website');
    var apiGatewayHostname = parameters.backend.apiGatewayHostname;
    var apiGatewayPrefix = parameters.backend.apiGatewayPrefix;

    s3.getBucketWebsite({Bucket: bucketName}, function(err, existingWebsiteConfiguration) {
      if (err) {
        console.log(err);
        cb(err);
      };

      existingWebsiteConfiguration.RoutingRules = [
        {
          Redirect: {
            HostName: apiGatewayHostname,
            HttpRedirectCode: '302',
            Protocol: 'https',
            ReplaceKeyPrefixWith: apiGatewayPrefix,
          },
          Condition: {
            HttpErrorCodeReturnedEquals: '404',
          },
        },
        {
          Redirect: {
            HostName: apiGatewayHostname,
            HttpRedirectCode: '302',
            Protocol: 'https',
            ReplaceKeyPrefixWith: apiGatewayPrefix,
          },
          Condition: {
            HttpErrorCodeReturnedEquals: '403',
          },
        },
      ];

      var websiteConfiguration = {
        Bucket: bucketName,
        WebsiteConfiguration: existingWebsiteConfiguration,
      };

      s3.putBucketWebsite(websiteConfiguration, function(err, response) {
        console.log('put new configuration');
        if (err) {
          console.log(err);
          cb(err);
        } else {
          console.log(response);
          cb(response);
        }
      });
    }.bind(this));
  }

  function put1x1EmptyPixel(cb) {
    console.log('putting 1x1 pixel');
    var base64EmptyPixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=';
    var parameters = {
      Bucket: bucketName,
      Key: 'transparent1x1.png',
    };

    s3.getObject(parameters, function(err, response) {
      if (err) {
        console.log('pixel not found');
        parameters.Body = new Buffer(base64EmptyPixel, 'base64');
        s3.putObject(parameters, function(err, response) {
          console.log('pixel put');
          if (err) {
            cb(err);
          } else {
            cb(response);
          }
        });
      } else {
        cb(response);
      }
    }.bind(this));
  }
};
