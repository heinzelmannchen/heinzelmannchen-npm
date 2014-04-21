var Q = require('q'),
    npm = require('npm'),
    pub = module.exports;

pub.install = function(packageName, options){
    var q = Q.defer();

    options = options || {};
    
    npm.load(function (err) {
        if (options.global){
            npm.config.set('global', true);
        }
        npm.commands.install([packageName], function(data){
            q.resolve(data);
        });
    });
    return q.promise;
};

pub.search = function(packageName){
    var q = Q.defer();
    npm.load(function (err) {
        npm.commands.search([packageName], function(data){
            q.resolve(data);
        });
    });
    return q.promise;
};
