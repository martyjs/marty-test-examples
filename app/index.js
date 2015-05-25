let Marty = require('marty');
let { each } = require('lodash');
let bulk = require('bulk-require');

class Application extends Marty.Application {
  constructor(options) {
    super(options);

    let dependencies = bulk(__dirname, [
      'actions/*.js',
      'stores/*.js',
      'queries/*.js',
      'sources/*.js'
    ]);

    each(dependencies, dep => this.register(dep));
  }
}

export default Application;