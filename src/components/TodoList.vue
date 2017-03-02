<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>
        欢迎：{{name}}！你的待办事项是：
      </span>
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!Done"> <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.status == false">
                  <span class="item">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="update(item.content, item.status)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(item.content)">删除</el-button>
                  </span>
                </div>
              </template>
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in list">
              <div class="todo-list" v-if="item.status == true">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="update(item.content, item.status)">还原</el-button>
                </span>
              </div>
            </template>
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script style="es6">
  import jwt from 'jsonwebtoken'

  export default {

    mounted(){
      this.$nextTick(() => {
        const userInfo = this.getUserInfo();
        if(userInfo != null){
          this.name = userInfo.name;
        }else{
          this.name = ''
        }
        this.getTodoList(this.name);
      })

    },

    data () {
      return {
        name: '',
        todos: '',
        activeName: 'first',
        list: [],
        count: 0
      }
    },
    computed: { // 计算属性用于计算是否已经完成了所有任务
      Done(){
        let count = 0;
        let length = this.list.length;
        for(let i in this.list){
          this.list[i].status == true ? count += 1 : '';
        }
        this.count = count;
        if(count == length || length == 0){
          return true
        }else{
          return false
        }
      }
    },

    methods: {
      addTodos() {
        if(this.todos == '')
          return
        let obj = {
          status: false,
          content: this.todos
        }
        this.list.push(obj);
        this.todos = '';
      },
      finished(index) {
        this.$set(this.list[index],'status',true) // 通过set的方法让数组的变动能够让Vue检测到
        this.$message({
          type: 'success',
          message: '任务完成'
        })
      },
      remove(index) {
        this.list.splice(index,1);
        this.$message({
          type: 'info',
          message: '任务删除'
        })
      },
      restore(index) {
        this.$set(this.list[index],'status',false)
        this.$message({
          type: 'info',
          message: '任务还原'
        })
      },
      getUserInfo(){
          const token = sessionStorage.getItem('token');
          if(token != null && token != 'null'){
            return jwt.verify(token, 'united');//token的加密在此处可以看到
          }else{
              return null;
          }
      },
      addTodos(){
          if(this.todos == ''){
            return false;
          }
          let obj = {
            status: 0,
            content: this.todos,
            name: this.name
          }
          this.$http.post('todolist', obj)
            .then((res) => {
              console.log(res);
              if(res.status == 200){ // 当返回的状态为200成功时
                this.$message({
                  type: 'success',
                  message: '创建成功！'
                })
                this.getTodoList(); // 获得最新的todolist
              }else{
                this.$message.error('创建失败！') // 当返回不是200说明处理出问题
              }
            }, (err) => {
              this.$message.error('创建失败！') // 当没有返回值说明服务端错误或者请求没发送出去
              console.log(err)
            })
          this.todos = '';
      },
      getTodoList(){
          this.$http.get('/todolist/' + this.name)
            .then((res) => {
              if(res.status == 200){
                  this.list = res.data
              } else{
                  this.$message.error('获取失败')
              }
            }, (err) => {
              this.$message.error('获取失败');
              console.log(err);
            })
      },
      update(content, status){
          let obj = {
              content: content,
              status: status
          }
          this.$http.post('/todolist/update', obj)
            .then((res) => {
              if(res.status == 200){
                  this.$message.success('更新成功')
                  this.getTodoList();
              }else{
                  this.$message.error('更新失败')
              }
            }, (err) => {
              this.$message.error('服务器错误')
              console.log(err)
            })
      },
      remove(content){
          let obj = {
              content: content
          }
          this.$http.post('/todolist/remove', obj)
            .then((res) => {
              if(res.status == 200){
                  this.$message.success('删除成功')
                  this.getTodoList()
              }else{
                  this.$message('删除失败')
              }
            }, (err) => {
              this.$message.error(err);
            })
      }
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
