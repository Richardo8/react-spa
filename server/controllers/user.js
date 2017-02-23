let User = require('../models/users');

let user = new User("liu1", "123456");

async function getUserInfo(){
  let backData = await user.login();
  console.log(backData);
  if(backData.password == user.password){
    console.log('成功');
  }
}


// module.exports = getUserInfo;
module.exports = getUserInfo;


