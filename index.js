var Q = require('q'),
    _ = require('underscore'),
    npm = require('npm'),
    pub = module.exports;

//TODO: install error

pub.install = function(packageName) {
    var q = Q.defer();
    npm.load(npm.config, function(err) {
        npm.commands.install([packageName], function(data) {
            q.resolve(data);
        });
    });
    return q.promise;
};

pub.search = function(keywords) {
    var q = Q.defer();
    if (!_.isArray(keywords)) {
        keywords = [keywords];
    }

    npm.load(npm.config, function(err) {
        npm.commands.search(keywords, true, true, function(error, data) {
            if (error) {
                q.reject(error);
            } else {
                q.resolve(data);
            }
        });
    });
    return q.promise;
};
