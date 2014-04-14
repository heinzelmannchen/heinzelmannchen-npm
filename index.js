var Q,
    npm,
    pub = {};

module.exports = function($inject){
    Q = $inject.Q;
    npm = $inject.npm;

    return pub;
};

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
};
