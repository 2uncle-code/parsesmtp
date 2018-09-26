# parsesmtp
    This is an smtp email adapter for parse server.
# quick start
    npm i parsesmtp --save

    var express = require('express');
    var ParseServer = require('parse-server').ParseServer;
    var app = express();

    var api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
    cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
    appId: 'myAppId',
    masterKey: 'myMasterKey', // Keep this key secret!
    fileKey: 'optionalFileKey',
    serverURL: 'http://localhost:1337/parse', // Don't forget to change to https if needed
    emailAdapter: {
        module: 'parsesmtp',
            options: {
                host: yourHost.com,
                port: 25,
                secureConnection:true,
                user: admin,
                pass: nicePwd,
            }
    }
    });

    // Serve the Parse API on the /parse URL prefix
    app.use('/parse', api);

    app.listen(1337, function() {
    console.log('parse-server-example running on port 1337.');
    });    