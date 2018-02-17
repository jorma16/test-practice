const sinon = require('sinon');

class AxiosMock {
  constructor(options) {
    this.options = options;
    this.errorMessage = 'AXIOS_MOCK_ERROR';
    this.spies = { get: sinon.spy() };
  }

  async get(url) {
    this.spies.get();
    if (this.options.fails) {
      throw new Error(this.errorMessage);
    }

    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      data: [{
        mock: true,
        id: 1
      }, {
        mock: true,
        id: 2
      }]
    };
  }
}

module.exports = AxiosMock;
