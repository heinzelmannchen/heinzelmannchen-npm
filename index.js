var Q = require('q'),
    npm = require('npm'),
    pub = module.exports;

//TODO: install error

pub.install = function(packageName){
    var q = Q.defer();
    npm.load(npm.config, function (err) {
        npm.commands.install([packageName], function(data){
            q.resolve(data);
        });
    });
    return q.promise;
};

pub.search = function(packageName){
    var q = Q.defer();
    npm.load(npm.config, function (err) {
        npm.commands.search([packageName], function(data){
            q.resolve(data);
        });
    });
    return q.promise;
};
