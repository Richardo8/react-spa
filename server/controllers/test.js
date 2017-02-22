let User = require('../models/users');

let user = new User("liu", "123456");
console.log(user.save);
user.save();
