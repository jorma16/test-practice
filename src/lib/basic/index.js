function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError(`a and b should be numbers and a: ${typeof a}, b: ${typeof b}`);
  }

  return a + b;
}

function sub(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError(`a and b should be numbers and a: ${typeof a}, b: ${typeof b}`);
  }

  return a - b;
}

module.exports = {
  sum,
  sub
};
