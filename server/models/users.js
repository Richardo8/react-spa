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
    (async () => {
      let backData = await userModel.findOne({'name': data.name});
    })();
    //如何将backData返回？？？？？
    //使用async await实现数据查询
    // userModel.findOne({'name': data.name}, function (err, data) {
    //   if(err){
    //     console.log(err);
    //   }else{
    //     console.log(data);
    //     callback(null, data);
    //   }
    // })
  }
}

module.exports = User;
