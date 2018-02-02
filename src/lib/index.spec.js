const test = require('ava');

test('sum returns the correct value', (t) => {
  const { sum } = require('./');
  const params = [1, 2];
  const expectedResult = 3;

  const test = sum(params[0], params[1]);
  t.is(test, expectedResult);
});

test('sum returns an error if one param is not a number', (t) => {
  const { sum } = require('./');
  const params = [1, '2'];

  try {
    sum(params[0], params[1]);
    t.fail();
  } catch (err) {
    t.is(err.name, 'TypeError');
    t.truthy(err.message.includes('a and b should be numbers'));
  }
});

test('sub returns the correct value', (t) => {
  const { sub } = require('./');
  const params = [1, 2];
  const expectedResult = -1;

  const test = sub(params[0], params[1]);
  t.is(test, expectedResult);
});
