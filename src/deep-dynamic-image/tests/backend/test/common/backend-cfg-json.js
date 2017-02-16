export default {
  'env': 'dev',
  'deployId': 'a44dd54d',
  'awsRegion': 'us-west-2',
  'models': [
    {
      'name': {
        'Name': 'string'
      }
    }
  ],
  'identityPoolId': 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xx0123456789',
  'identityProviders': '',
  'microservices': {
    'deep-dynamic-image': {
      'isRoot': false,
      'parameters': {
        's3Bucket': 'deep.dev.public.dfsfsd454',
        'apiGatewayHostname': 'gf54fg4354.execute-api.us-east-1.amazonaws.com',
        'apiGatewayPrefix': 'prod/image/'
      },
      'resources': {
        'image': {
          'router': {
            'type': 'lambda',
            'methods': [
              'GET'
            ],
            'forceUserIdentity': true,
            'apiCache': {
              'enabled': false,
              'ttl': -1
            },
            'region': 'us-west-2',
            'scope': 'public',
            'source': {
              'api': '/deep-dynamic-image/image/router',
              'original': 'arn:aws:lambda:::function:deep-dynamic-image-image-router',
              '_localPath': './src/deep-dynamic-image/backend/src/image/routing/bootstrap.js'
            }
          },
          'transcoder': {
            'type': 'lambda',
            'methods': [
              'GET'
            ],
            'forceUserIdentity': true,
            'apiCache': {
              'enabled': false,
              'ttl': -1
            },
            'region': 'us-west-2',
            'scope': 'public',
            'source': {
              'api': '/deep-dynamic-image/image/transcoder',
              'original': 'arn:aws:lambda:::function:deep-dynamic-image-image-transcoder',
              '_localPath': './src/deep-dynamic-image/backend/src/image/transcoding/bootstrap.js'
            }
          }
        }
      }
    },
    'deep-root-angular': {
      'isRoot': true,
      'parameters': {},
      'resources': {
        'async-config': {
          'dump': {
            'type': 'lambda',
            'methods': [
              'GET'
            ],
            'forceUserIdentity': false,
            'apiCache': {
              'enabled': false,
              'ttl': -1
            },
            'region': 'us-west-2',
            'scope': 'private',
            'source': {
              'api': null,
              'original': 'arn:aws:lambda:::function:deep-root-angular-async-config-dump',
              '_localPath': './src/deep-root-angular/backend/src/async-config/dump/bootstrap.js'
            }
          }
        },
        'scheduler': {
          'rule': {
            'type': 'lambda',
            'methods': [
              'GET'
            ],
            'forceUserIdentity': false,
            'apiCache': {
              'enabled': false,
              'ttl': -1
            },
            'region': 'us-west-2',
            'scope': 'private',
            'source': {
              'api': null,
              'original': 'arn:aws:lambda:::function:deep-root-angular-scheduler-rule',
              '_localPath': './src/deep-root-angular/backend/src/scheduler/rule/bootstrap.js'
            }
          }
        },
        'ddb-eventual-consistency': {
          'listen-queues': {
            'type': 'lambda',
            'methods': [
              'GET'
            ],
            'forceUserIdentity': false,
            'apiCache': {
              'enabled': false,
              'ttl': -1
            },
            'region': 'us-west-2',
            'scope': 'private',
            'source': {
              'api': null,
              'original': 'arn:aws:lambda:::function:deep-root-angular-ddb-eventual-consistency-listen-queues',
              '_localPath': './src/deep-root-angular/backend/src/ddb-eventual-consistency/listen-queues/bootstrap.js'
            }
          },
          'pool-queue': {
            'type': 'lambda',
            'methods': [
              'GET'
            ],
            'forceUserIdentity': false,
            'apiCache': {
              'enabled': false,
              'ttl': -1
            },
            'region': 'us-west-2',
            'scope': 'private',
            'source': {
              'api': null,
              'original': 'arn:aws:lambda:::function:deep-root-angular-ddb-eventual-consistency-pool-queue',
              '_localPath': './src/deep-root-angular/backend/src/ddb-eventual-consistency/pool-queue/bootstrap.js'
            }
          }
        }
      }
    }
  },
  'globals': {
    'security': {
      'identityProviders': {
        'www.amazon.com': 'amzn1.application.465464565fdhgfhgfhgf'
      }
    },
    'favicon': '@deep-root-angular:img/favicon.ico',
    'pageLoader': {
      'src': '@deep-root-angular:img/loader.gif',
      'alt': 'Loading...'
    },
    'engine': {
      'ngRewrite': '/'
    }
  },
  'searchDomains': {},
  'validationSchemas': [],
  'modelsSettings': [],
  'validationSchemas': [
    'name-data'
  ],
  'modelsSettings': [
    {
      'name': {
        'readCapacity': 1,
        'writeCapacity': 1,
        'maxReadCapacity': 10000,
        'maxWriteCapacity': 10000
      }
    }
  ],
  'forceUserIdentity': false,
  'microserviceIdentifier': 'deep-dynamic-image',
  'awsAccountId': 123456789012,
  'apiVersion': 'v1',
  'appIdentifier': 'fsdgfdsghfdghgdf56765876876876ghjhg',
  'timestamp': 1469784760493,
  'buckets': {
    'temp': {
      'name': 'dfhgfh56566556dfhgfhgfhf5546gfgfg-temp'
    },
    'public': {
      'name': 'dfhgfh56566556dfhgfhgfhf5546gfgfg-public'
    },
    'private': {
      'name': 'dfhgfh56566556dfhgfhgfhf5546gfgfg-private'
    },
    'shared': {
      'name': 'dfhgfh56566556dfhgfhgfhf5546gfgfg-shared'
    }
  },
  'tablesNames': {
    'name': 'DeepDevName4a7dbaed'
  },
  'cacheDsn': '',
  'name': 'deep-dynamic-image-image-router',
  'path': './src/deep-dynamic-image/backend/src/image/routing/bootstrap.js'
};