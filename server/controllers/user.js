let User = require('../models/users');


async function getUserInfo(name){
  // let user = new User();
  //当使用静态方法时就不能实例化了，因为静态方法只有类能够使用。
  return await User.login(name);
}

module.exports = getUserInfo;


