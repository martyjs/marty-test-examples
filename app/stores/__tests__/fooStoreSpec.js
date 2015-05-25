let sinon = require('sinon');
let { expect } = require('chai');
let Application = require('../../index');
let FooConstants = require('../../constants/fooConstants');
let {
  dispatch,
  hasDispatched,
  createApplication
} = require('marty/test-utils');

describe('FooStore', () => {
  let server, app, fetch, expectedId, storeChanged;

  beforeEach(() => {
    expectedId = 1;
    storeChanged = sinon.stub();
    server = sinon.fakeServer.create();
  });

  afterEach(() => server.restore());

  describe('#deleteFoo(id)', () => {
    beforeEach(() => {
      app = createApplication(Application, {
        include: ['fooStore']
      });

      app.fooStore.addChangeListener(storeChanged);
      app.fooStore.state[expectedId] = { id: expectedId };

      dispatch(app, FooConstants.DELETE_FOO, expectedId);
    });

    it('should delete the foo from the store', () => {
      expect(app.fooStore.state[expectedId]).to.not.exist;
    });

    it('should say the store has changed', () => {
      expect(storeChanged).to.be.calledOnce;
    });
  });

  describe('#getFoo(id)', () => {
    beforeEach(() => {
      app = createApplication(Application, {
        include: ['fooStore', 'fooQueries', 'fooAPI']
      });
    });

    describe('when the foo is not in the store', () => {
      let expectedFoo;

      beforeEach(() => {
        expectedFoo = {
          id: expectedId,
          name: 'FOO'
        };

        server.respondWith(`GET`, `/foos/${expectedId}`, [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify(expectedFoo)
        ]);

        fetch = app.fooStore.getFoo(expectedId);

        server.respond();

        return fetch.toPromise();
      });

      it('should get the foo from the server', () => {
        expect(app.fooStore.getFoo(expectedId).result).to.eql(expectedFoo);
      });
    });
  });
});