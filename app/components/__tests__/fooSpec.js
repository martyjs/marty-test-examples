let Foo = require('../foo');
let sinon = require('sinon');
let React = require('react');
let { fetch } = require('marty');
let { expect } = require('chai');
let Application = require('../../index');
let { createStore, createApplication } = require('marty/test-utils');

let testTree = require('react-test-tree');

describe('Foo', () => {
  let element, expectedFoo, context, app, getFoo;

  beforeEach(() => {
    getFoo = sinon.stub();
    expectedFoo = { name: 'Bar' };
    app = createApplication(Application, {
      stub: {
        fooStore: createStore({
          getFoo: getFoo
        })
      }
    })
  });

  describe('InnerComponent', () => {
    let expectedFoo;

    beforeEach(() => {
      expectedFoo = { name: 'Bar' };
      element = testTree(<Foo.InnerComponent foo={expectedFoo} />);
    });

    it('should show foos name', () => {
      expect(element.name.innerText).to.equal(expectedFoo.name);
    });
  });

  describe('when the fetch is done', () => {
    beforeEach(() => {
      getFoo.returns(fetch.done(expectedFoo));
      element = testTree(<Foo id={1} />, {
        context: { app: app }
      });
    });

    it('should render the inner component', () => {
      expect(element.innerComponent).to.exist;
    });
  });

  describe('when the fetch is pending', () => {
    beforeEach(() => {
      getFoo.returns(fetch.pending());
      element = testTree(<Foo id={1} />, {
        context: { app: app }
      });
    });

    it('should show a pending message', () => {
      expect(element.message.innerText).to.eql('Waiting for foo');
    });
  });

  describe('when the fetch has failed', () => {
    beforeEach(() => {
      getFoo.returns(fetch.failed(new Error()));
      element = testTree(<Foo id={1} />, {
        context: { app: app }
      });
    });

    it('should show a pending message', () => {
      expect(element.message.innerText).to.eql('Failed to load foo');
    });
  });
});