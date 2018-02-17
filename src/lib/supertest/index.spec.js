const test = require('ava');
const request = require('supertest');

test('GET / (200) and correct response', async (t) => {
  const app = require('./');

  await request(app).get('/').expect(200);
});
