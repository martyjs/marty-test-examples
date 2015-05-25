let sinon = require('sinon');
let { expect } = require('chai');
let Application = require('../../index');
let FooConstants = require('../../constants/fooConstants');
let { hasDispatched, createApplication } = require('marty/test-utils');

describe('FooActionCreators', () => {
  let server, app, req;

  describe('#deleteFoo(id)', () => {
    let expectedId;

    beforeEach(() => server = sinon.fakeServer.create());
    afterEach(() => server.restore());

    beforeEach(() => {
      expectedId = 1;
      app = createApplication(Application, {
        include: ['fooActionCreators', 'fooAPI']
      });
    });

    describe('when there are no errors', () => {
      beforeEach(() => {
        server.respondWith(`DELETE`, `/foos/${expectedId}`, [204, {}, '']);
        req = app.fooActionCreators.deleteFoo(expectedId);
        server.respond();

        return req;
      });

      it('should dispatch DELETE_FOO(id)', () => {
        expect(hasDispatched(app, FooConstants.DELETE_FOO, expectedId)).to.be.true;
      });
    });

    describe('when the server failed', () => {
      beforeEach(() => {
        server.respondWith(`DELETE`, `/foos/${expectedId}`, [500, {}, '']);
        req = app.fooActionCreators.deleteFoo(expectedId);
        server.respond();

        return req;
      });

      it('should dispatch DELETE_FOO(id)', () => {
        expect(hasDispatched(app, FooConstants.DELETE_FOO_FAILED, expectedId)).to.be.true;
      });
    });
  });
});