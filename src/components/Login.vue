<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎登录
      </span>
      <el-row>
        <el-input
          v-model="account"
          placeholder="账号"
          type="text">
        </el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password"
          @keyup.enter.native="loginToDo">
        </el-input>
        <el-button type="primary" @click="loginToDo">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script type="es6">
  import md5 from 'md5'

  export default {
    data () {
      return {
        account: '',
        password: ''
      }
    },
    methods: {
        loginToDo(){
            let obj = {
                name: this.account,
                password: md5(this.password)
            }
            // 增加MD5加密，但是加密实际并不安全，在js中加密很容易被人获取到，MD5算法并非不可逆算法
            this.$http.post('/user', obj)
              .then((res) => {
                if(res.data.status == '1'){
                    sessionStorage.setItem('token', res.data.token);
                    //如果登陆成功，则将数据中的token放入Session Storage
                    this.$router.push('/todolist');
                    this.$message.success('登录成功');
                }else{
                    console.log(res.data.info);
                    this.$message.error(res.data.info);
                    sessionStorage.setItem('token', null);
                }
            }, (err) => {
                this.$message.error('请求错误');
                sessionStorage.setItem('token', null);
              })

        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-row.content
    padding 16px
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px
</style>
