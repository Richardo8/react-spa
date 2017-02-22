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

  save(){
    let data = {
      name: this.name,
      password: this.password
    }
    userModel.create(data, function (err) {
      if(err){
        console.log(err)
      }else{
        console.log('finish')
      }
    })
  }
}

module.exports = User;
