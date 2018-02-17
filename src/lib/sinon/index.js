const userService = require('./user.service');

const transformUser = (query) => {
  const user = userService.getUser(query);

  return {
    fullName: `${user.name} ${user.lastname}`
  };
};

module.exports = { transformUser };
