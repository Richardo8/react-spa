let User = require('../models/users');


async function getUserInfo(name){
  // let user = new User();
  //当使用静态方法时就不能实例化了，因为静态方法只有类能够使用。
  return await User.login(name);
}

async function postUserInfo(data) {
  let userData = await getUserInfo(data.request.body.name);
  console.log(userData);
  if(data.request.body.password == userData.password){
    return obj = {
      status: 1,
      info: 'success'
    }
  }else{
    return obj = {
      status: 0,
      info: 'failed'
    }
  }
}

module.exports = {
  getUserInfo,
  postUserInfo
}


