let User = require('../models/users');
let jwt = require('koa-jwt');


async function getUserInfo(name){
  // let user = new User();
  //当使用静态方法时就不能实例化了，因为静态方法只有类能够使用。
  return await User.login(name);
}

async function postUserInfo(data) {
  let userData = await getUserInfo(data.request.body.name);
  if(userData){
    if(userData instanceof Error){
      return obj = {
        status: 0,
        info: '服务器错误'
      }
    }else{
      if(data.request.body.password == userData.password){
        // 使用jwt对token进行简单加密
        let userToken = {
          name: userData.name
        }
        let secret = 'united'
        let token = jwt.sign(userToken, secret)
        return obj = {
          status: 1,
          token: token,
          info: '登录成功'
        }
      }else{
        return obj = {
          status: 0,
          info: '密码错误'
        }
      }
    }
  }else{
    return {
      status: 0,
      info: '未查找到该账号'
    }
  }

}

async function setAvatarUrl(name, url) {
  let returnData = await User.setAvatar(name, url);
  if(returnData){
    if(returnData instanceof Error){
      return obj = {
        status: 0,
        info: '数据库错误'
      }
    }else{
      return obj = {
        status: 1,
        info: '设置成功'
      }
    }
  }else{
    return {
      status: 0,
      info: '未查找到该账号'
    }
  }
}

async function getAvatarUrl(name, url) {
  let returnData = await User.getAvatar(name, url);
  if(returnData){
    if(returnData instanceof Error){
      return obj = {
        status: 0,
        info: '数据库错误'
      }
    }else{
      return returnData
    }
  }else{
    return {
      status: 0,
      info: '未查找到该账号'
    }
  }
}

module.exports = {
  getUserInfo,
  postUserInfo,
  setAvatarUrl,
  getAvatarUrl
}


