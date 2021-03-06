/**
 * Created by Stefan Hariton on 09/18/15
 */

/* eslint no-unused-vars: 0 */
/* eslint no-use-before-define: 0 */
/* eslint no-extra-bind: 0 */

'use strict';

var AWS = require('aws-sdk');
var parameters = require('./.parameters.json');
var s3 = new AWS.S3();
var async = require('async');

var exports = module.exports = function(callback) {
  var bucketName = parameters.backend.s3Bucket;

  async.parallel([
    updateBucketWebsite,
    put1x1EmptyPixel,
  ], callback);

  function updateBucketWebsite(cb) {
    var apiGatewayHostname = parameters.backend.apiGatewayHostname;
    var apiGatewayPrefix = parameters.backend.apiGatewayPrefix;

    s3.getBucketWebsite({Bucket: bucketName}, function(err, existingWebsiteConfiguration) {
      if (err) {
        cb(err);
      }

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
        if (err) {
          cb(err);
        } else {
          cb(response);
        }
      });
    }.bind(this));
  }

  function put1x1EmptyPixel(cb) {
    var base64EmptyPixel =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=';
    var parameters = {
      Bucket: bucketName,
      Key: 'transparent1x1.png',
    };

    s3.getObject(parameters, function(err, response) {
      if (err) {
        parameters.Body = new Buffer(base64EmptyPixel, 'base64');
        s3.putObject(parameters, function(err, response) {
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
