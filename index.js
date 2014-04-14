var Q = require('q'),
    exec = require('child_process').exec;

exports.install = function(packageName) {
    var q = Q.defer();
    exec('npm install -g ' + packageName, function(error, stdout) {
        if (error) {
            q.reject(error);
        } else {
            q.resolve();
        }
    });
    return q.promise;
};

exports.search = function(packageName) {
    var q = Q.defer();
    exec('npm search ' + packageName, function(error, stdout) {
        if (error) {
            q.reject(error);
        } else {
            q.resolve(stdout);
        }
    });
    return q.promise;
};
