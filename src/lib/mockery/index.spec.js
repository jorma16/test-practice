const test = require('ava');
const mockery = require('mockery');
const AxiosMock = require('./axios.mock');

mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false,
  useCleanCache: true
});

test.afterEach(() => {
  mockery.deregisterAll();
  mockery.resetCache();
});

test.beforeEach(() => {
  mockery.deregisterAll();
  mockery.resetCache();
});

test('getPlaceHolders returns correctly', async (t) => {
  const axios = new AxiosMock({ fails: false });
  mockery.registerMock('axios', axios);

  const service = require('./index');

  const data = await service.getPlaceHolders();
  t.is(Boolean(data), true);
});

test('getPlaceHolders throw an error if axios fails', async (t) => {
  const axios = new AxiosMock({ fails: true });
  mockery.registerMock('axios', axios);

  const service2 = require('./index');
  try {
    await service2.getPlaceHolders();
    t.fail();
  } catch (err) {
    t.is(err.message, axios.errorMessage);
    t.truthy(axios.spies.get.calledOnce);
    t.truthy(axios.spies.get.withArgs('https://jsonplaceholder.typicode.com/posts/1'));
  }
});
