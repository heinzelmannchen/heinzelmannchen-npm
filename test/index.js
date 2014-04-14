var NpmUtils = require('../index'),
    proxyquire = require('proxyquire').noCallThru(),
    Q = require('q'),
    sinon = require('sinon'),
    inject = {
        Q: Q,
        npm: {
            load: function(config, fun) { fun(); },
            commands: {}
        }
    };

require('mocha-as-promised')();

describe('NpmUtils', function() {
    it('should offer install, search ', function() {
        new NpmUtils(inject).should.respondTo('install');
        new NpmUtils(inject).should.respondTo('search');
    });

    describe('#install', function() {
        var spy;
        beforeEach(function() {
            spy = sinon.spy();
        });

        it('should call npm install', function() {
            inject.npm.commands.install = spy;
            new NpmUtils(inject).install('heinzel-generator-pg');
            spy.should.have.been.calledWith(['heinzel-generator-pg']);
        });
    });

    describe('#search', function() {
        var spy;
        beforeEach(function() {
            spy = sinon.spy();
        });

        it('should call npm search', function() {
            inject.npm.commands.search = spy;
            new NpmUtils(inject).search('burnhub');
            spy.should.have.been.calledWith(['burnhub']);
        });
    });
});
