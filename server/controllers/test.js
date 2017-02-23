let User = require('../models/users');

let user = new User("liu1", "123456");
// user.login();
// console.log(user.login());

(async () => {
  let backData = await user.login();
  console.log(backData);
  if(backData.password == user.password){
    console.log('成功');
  }
  // console.log(backData);
})()


