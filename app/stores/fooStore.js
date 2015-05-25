let Marty = require('marty');
let FooConstants = require('../constants/fooConstants');

class FooStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.state = {};
    this.handlers = {
      deleteFoo: FooConstants.DELETE_FOO,
      receiveFoo: FooConstants.RECEIVE_FOO
    };
  }

  deleteFoo(id) {
    delete this.state[id];
    this.hasChanged();
  }

  receiveFoo(foo) {
    this.state[foo.id] = foo;
    this.hasChanged();
  }

  getFoo(id) {
    return this.fetch({
      id: id,
      locally() {
        return this.state[id];
      },
      remotely() {
        return this.app.fooQueries.getFoo(id);
      }
    });
  }
}

export default FooStore;