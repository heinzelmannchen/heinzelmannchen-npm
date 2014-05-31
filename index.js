var Q = require('q'),
    _ = require('underscore'),
    npm = require('npm'),
    pub = module.exports;

pub.install = function(keywords, options){
    return npmCommand('install', keywords, options);
};

pub.uninstall = function (keywords, options) {
    return npmCommand('uninstall', keywords, options);
};

pub.update = function (keywords, options) {
    return npmCommand('update', keywords, options);
};

function npmCommand(command, keywords, options) {
    var q = Q.defer();
    options = options || {};

    npm.load(function (err) {
        npm.config.set('global', !!options.global);

        if(options.silent){
            setSilent(npm);
        }

        if (keywords) {
            keywords = ensureArray(keywords);
            npm.commands[command](keywords, function (error, data) {
                if (error) {
                    q.reject(error);
                } else {
                    q.resolve(data);
                }
            });
        } else {
            npm.commands[command](function (error, data) {
                if (error) {
                    q.reject(error);
                } else {
                    q.resolve(data);
                }
            });
        }
    });
    return q.promise;
}

function setSilent(npm) {
    npm.config.set('loglevel', 'silent');
    disableSpinner();
}

function disableSpinner() {
    npm.spinner.start = function () { };
    npm.spinner.stop = function () { };
}

function ensureArray(objOrArray) {
    if (!_.isArray(objOrArray)) {
        objOrArray = [objOrArray];
    }
    return objOrArray;
}

pub.search = function(keywords) {
    var q = Q.defer();
    keywords = ensureArray(keywords);

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
