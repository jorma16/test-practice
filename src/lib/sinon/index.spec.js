const test = require('ava');
const sinon = require('sinon');

test('transformUser returns the correct value', (t) => {
  const userService = require('./user.service');
  const spy = sinon.spy(userService, 'getUser');
  const expectedSpyReturn = {
    _id: 123123123,
    name: 'avantio',
    lastname: 'avantio dev'
  };

  const service = require('./index');
  const user = service.transformUser({});
  t.deepEqual(user, { fullName: 'avantio avantio dev' });
  t.truthy(spy.calledOnce);
  t.truthy(spy.calledWith({}));
  t.truthy(spy.withArgs({}).calledOnce);

  t.deepEqual(expectedSpyReturn, spy.returnValues[0]);
});
