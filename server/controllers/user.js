let User = require('../models/users');


async function getUserInfo(name){
  // let user = new User();
  return await User.login(name);
}

module.exports = getUserInfo;


