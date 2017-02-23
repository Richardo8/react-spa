let mongoose = require('mongoose'),
  db = require('../config/db'),
  userSchema = require('../schema/users');

let userModel = db.model('User', userSchema);

class User {
  constructor(name, password){
    this.name = name;
    this.password = password;
  }

  speak(){
    console.log('我的名字叫'+this.name);
  }


  //实现将数据存储到数据库中
  save(){
    let data = {
      name: this.name,
      password: this.password
    }
    userModel.create(data, (err) => {
      if(err){
        console.log(err)
      }else{
        console.log('finish')
      }
    })
  }

  login(){
    let data = {
      name: this.name,
      password: this.password
    };
    return async function get() {
      return await userModel.findOne({'name': data.name});
    }();
    // return (async () => {
    //   return await userModel.findOne({'name': data.name});
    // })();
    /*
    * 使用async返回数据。
    * 不想在model中设计逻辑判断的话，需要将数据返回到controller中，所以需要将获得的数据return，以上两种写法均可。至此，不需要回调函数。
    * node中运行时别忘了加 --harmony-async-await*/
  }
}

module.exports = User;
