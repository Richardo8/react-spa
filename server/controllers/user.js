let User = require('../models/users');


async function getUserInfo(name){
  let user = new User();
  return await user.login(name);
}

// module.exports = getUserInfo;
module.exports = getUserInfo;


