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
                password: this.password
            }
            this.$http.post('/user', obj)
              .then((res) => {
                console.log(res);
                if(res.data.status == '1'){
                    this.$router.push('/todolist');
                    this.$message.success('登录成功');
                }else{
                    console.log(res.data.info);
                    this.$message.error(res.data.info);
                }
            }, (err) => {
                this.$message.error('请求错误');
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
