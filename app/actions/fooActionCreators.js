let Marty = require('marty');
let FooConstants = require('../constants/fooConstants');

class FooActionCreators extends Marty.ActionCreators {
  deleteFoo(id) {
    return this.app.fooAPI.deleteFoo(id)
      .then(() => this.dispatch(FooConstants.DELETE_FOO, id))
      .catch(err => this.dispatch(FooConstants.DELETE_FOO_FAILED, id));
  }
}

export default FooActionCreators;