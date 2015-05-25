let Marty = require('marty');

class FooAPI extends Marty.HttpStateSource {
  deleteFoo(id) {
    return this.delete(`/foos/${id}`).then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete foo');
      }
    });
  }

  getFoo(id) {
    return this.get(`/foos/${id}`).then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Failed to get foo');
    });
  }
}

export default FooAPI;