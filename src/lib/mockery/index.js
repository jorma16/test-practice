const axios = require('axios');

async function getPlaceHolders() {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    return data;
  } catch (err) {
    throw err;
  }
}

module.exports = { getPlaceHolders };
