<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>
        欢迎：{{name}}！请编辑：
      </span>

    </el-col>
  </el-row>
</template>
<script style="es6" >
  import jwt from 'jsonwebtoken'

  export default{
    mounted(){
        this.$nextTick(() => {
          const userInfo = this.getUserInfo();
          if(userInfo != null){
            this.name = userInfo.name;
          }else{
            this.name = ''
          }
        })
    },
    data () {
      return {
        name: '',
        todos: '',
        activeName: 'first',
        unfinishedList: [],
        finishedList: [],
        count: 0,
        page: 1,
        finishedNum: 0,
        unfinishedNum: 0
      }
    },
    method: {
      getUserInfo(){
        const token = sessionStorage.getItem('token');
        if(token != null && token != 'null'){
          return jwt.verify(token, 'united');//token的加密在此处可以看到
        }else{
          return null;
        }
      },
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-input
    margin 20px auto
  .todo-list
    width 100%
    margin-top 8px
    padding-bottom 8px
    border-bottom 1px solid #eee
    overflow hidden
      text-align left
  .item
    font-size 20px
    &.finished
      text-decoration line-through
        color #ddd
          .pull-right
            float right
</style>
