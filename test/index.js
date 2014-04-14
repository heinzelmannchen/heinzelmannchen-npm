var NpmUtils = require('../index'),
    proxyquire = require('proxyquire').noCallThru(),
    Q = require('q'),
    sinon = require('sinon');

require('mocha-as-promised')();

describe('NpmUtils', function() {
    it('should offer install, search ', function() {
        NpmUtils.should.respondTo('install');
        NpmUtils.should.respondTo('search');
    });

    describe('#install', function() {
        var installSpy, mocked;
        beforeEach(function() {
            installSpy = sinon.spy();
            mocked = proxyquire('../index', {
                child_process: {
                    exec: installSpy
                }
            });
        });

        it('should call npm install', function() {
            mocked.install('heinzel-generator-pg');
            return installSpy.should.have.been.calledWith('npm install -g heinzel-generator-pg');
        });
    });

    describe('#search', function() {
        var installSpy, mocked;
        beforeEach(function() {
            installSpy = sinon.spy();
            mocked = proxyquire('../index', {
                child_process: {
                    exec: installSpy
                }
            });
        });

        it('should call npm search', function() {
            mocked.search('burnhub');
            return installSpy.should.have.been.calledWith('npm search burnhub');
        });
    });
});
