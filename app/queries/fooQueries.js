let Marty = require('marty');
let FooConstants = require('../constants/fooConstants');

class FooQueries extends Marty.Queries {
  getFoo(id) {
    return this.app.fooAPI.getFoo(id)
      .then(foo => this.dispatch(FooConstants.RECEIVE_FOO, foo))
      .catch(err => this.dispatch(FooConstants.RECEIVE_FOO_FAILED, id));
  }
}

export default FooQueries;