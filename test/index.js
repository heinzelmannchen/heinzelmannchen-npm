var npmUtils = require('../index'),
    proxyquire = require('proxyquire').noCallThru(),
    Q = require('q'),
    sinon = require('sinon'),
    npmMock = {
        commands: {},
        load: function(config, cb) { cb(); }
    };

require('mocha-as-promised')();

describe('NpmUtils', function() {
    it('should offer install, search ', function() {
        npmUtils.should.respondTo('install');
        npmUtils.should.respondTo('search');
    });

    describe('#install', function() {
        var installSpy, mocked;
        beforeEach(function() {
            installSpy = sinon.spy();
            npmMock.commands.install = installSpy;
            mocked = proxyquire('../index', {
                npm: npmMock
            });
        });

        it('should call npm install', function() {
            mocked.install('heinzel-generator-pg');
            return installSpy.should.have.been.calledWith(['heinzel-generator-pg']);
        });
    });

    describe('#search', function() {
        var searchSpy, mocked;
        beforeEach(function() {
            searchSpy = sinon.spy();
            npmMock.commands.search = searchSpy;
            mocked = proxyquire('../index', {
                npm: npmMock
            });
        });

        it('should call npm search', function() {
            mocked.search('burnhub');
            return searchSpy.should.have.been.calledWith(['burnhub']);
        });
        it('should call npm search with keywords', function() {
            mocked.search(['key', 'word']);
            return searchSpy.should.have.been.calledWith(['key', 'word']);
        });
    });
});
