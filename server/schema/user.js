let mongoose = require('mongoose'),
  db = require('../config/db');

db.on('error', console.error.bind(console, '连接错误'))

db.once('open', function () {
  console.log('finish');
  let PersonSchema = new mongoose.Schema({
    name:String   //定义一个属性name，类型为String
  });

  PersonSchema.methods.speak = function(){
    console.log('我的名字叫'+this.name);
  }

  let PersonModel = db.model('Person',PersonSchema);

  let personEntity = new PersonModel({name:'Krouky'});
  //打印这个实体的名字看看
  console.log(personEntity.name); //Krouky


  personEntity.speak();//我的名字叫Krouky

  personEntity.save();
})
