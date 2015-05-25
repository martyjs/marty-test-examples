let React = require('react');
let Marty = require('marty');

class Foo extends React.Component {
  render() {
    return (
      <div className="Foo">
        <span ref="name">{this.props.foo.name}</span>
      </div>
    );
  }
}

export default Marty.createContainer(Foo, {
  listenTo: 'fooStore',
  fetch: {
    foo() {
      return this.app.fooStore.getFoo(this.props.id);
    }
  },
  pending() {
    return (
      <div className="Foo-pending">
        <span ref="message">Waiting for foo</span>
      </div>
    );
  },
  failed() {
    return (
      <div className="Foo-failed">
        <span ref="message">Failed to load foo</span>
      </div>
    );
  }
});