var Q = require('q'),
    _ = require('underscore'),
    npm = require('npm'),
    pub = module.exports;

pub.install = function(keywords, options){
    var q = Q.defer();
    if (!_.isArray(keywords)) {
        keywords = [keywords];
    }
    options = options || {};
    
    npm.load(function (err) {
        if (options.global){
            npm.config.set('global', true);
        }
        npm.commands.install(keywords, function(error, data){
            if (error) {
                q.reject(error);
            } else {
                q.resolve(data);
            }
        });
    });
    return q.promise;
};

pub.uninstall = function(keywords, options){
    var q = Q.defer();
    if (!_.isArray(keywords)) {
        keywords = [keywords];
    }
    options = options || {};
    
    npm.load(function (err) {
        if (options.global){
            npm.config.set('global', true);
        }
        npm.commands.uninstall(keywords, function(error, data){
            if (error) {
                q.reject(error);
            } else {
                q.resolve(data);
            }
        });
    });
    return q.promise;
};

pub.search = function(keywords) {
    var q = Q.defer();
    if (!_.isArray(keywords)) {
        keywords = [keywords];
    }

    npm.load(function(err) {
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
