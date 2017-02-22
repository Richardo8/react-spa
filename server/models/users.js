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
}

module.exports = User;
