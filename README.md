# Taller de Testing en Javascript

En esta sesión vamos a ver como hacer testing unitario en Javascript (NodeJS).

Para ello vamos a hacer uso de las siguientes herramientas:
- [AVA](https://www.npmjs.com/package/ava)
- [Sinon](https://www.npmjs.com/package/sinon)
- [Mockery](https://www.npmjs.com/package/mockery)
- [Supertest](https://www.npmjs.com/package/supertest)

AVA se utiliza como libreria base donde montamos los tests. Es muy extensa y
tiene muy buena documentación que se puede ver en su página.

Un ejemplo muy básico sería el siguiente:

```
// library.js
function concat(character1, character2) {
  return `${character1}${character2}`;
}

module.exports = { concat };
```
```
// library.spec.js
const test = require('ava');
const library = require('./library');

test('It works', (t) => {
  const str = library('a', 'b');
  t.is(str, 'ab');
});
```

Sinon se utiliza para ver como se comportan funciones dentro de las funciones que vamos a testear,
al igual que AVA posee una documentación muy extensa, un ejemplo muy básico sería el siguiente:
```
// library.js
const repository = require('./repository');

exports.getId = (query) => {
  const { id } = repository.getTest(query);
  return id;
};

// repository.js
exports.getTest = (query) => {
  return query;
};
```
```
// library.spec.js
const test = require('ava');
const sinon = require('sinon');

test('It works', (t) => {
  const repository = require('./repository');
  const spy = sinon.spy(repository, 'getTest');
  const expectedReturnSpy = {
    id: 1234,
    name: 'test1'
  };

  const expectedReturn = {
    id: 1234
  };

  const service = require('./library');

  const id = service.getId({ id: 1234, name: 'test1' });
  t.deepEqual(id, { id: 1234 });
  t.truthy(spy.calledOnce);
  t.truthy(spy.withArgs({ id: 1234, name: 'test1' }).calledOnce);
  t.deepEqual(expectedReturnSpy, spy.returnValues[0]);
});
```

Mockery se utiliza para falsear librerias externas que por ejemplo
interaccionan con terceros, como bases de datos, APIS, al igual que
las anteriores la documentación es muy extensa y su uso, sencillo.
```
// index.js

// mongoose model
const { User } = require('./user.model');

async function getMyUser() {
  return User.findOne({ _id: 1234 });
}
```
```
// user.mock.js
const User = {
  findOne: (query) => {
    if (query._id === 1234) {
      return {
        _id: 1234,
        user: 'avantio'
      }
    }

    return {};
  }
}

// index.spec.js
const test = require('ava');
const mockery = require('mockery');
const UserMock = require('./user.mock');

mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false,
  useCleanCache: true
});


```

