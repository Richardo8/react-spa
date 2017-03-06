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
              <template v-for="(item, index) in unfinishedList">
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
              <div class="block">
                <el-pagination
                  @current-change="handleCurrentChange"
                  layout="prev, pager, next"
                  :total="500"></el-pagination>
              </div>
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in finishedList">
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
        this.getTenUnfinishedTodoList();
        this.getTenFinishedTodoList();
        console.log(this.list)
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
        page: 1
      }
    },
    computed: { // 计算属性用于计算是否已经完成了所有任务
      Done(){
        let count = 0;
        let length = this.unfinishedList.length;
        for(let i in this.finishedList){
          this.finishedList[i].status == true ? count += 1 : '';
        }
        this.count = count;
        if(length == 0){
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
      async addTodos(){
          try{
            if(this.todos == ''){
              return false;
            }
            let objJson = JSON.stringify({
              status: 0,
              content: this.todos,
              name: this.name
            })
            console.log(objJson)
            let saveData = await fetch('/todolist', {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: objJson
            })
            //fetch的post需要有headers说明传输数据的类型，而且传输的body也需要转换为json()格式
            let result = await saveData.json()
            if(result.status == '1'){
                this.$message.success(result.info)
                this.getTenUnfinishedTodoList();
            }else{
                this.$message.error(result.info)
            }

              this.todos = '';
          }catch(err){
            this.$message.error(err)
          }

      },
//      async getTodoList(){
//          this.$http.get('/todolist/' + this.name)
//            .then((res) => {
//              if(res.status == 200){
//                  this.list = this.list.concat(res.data);
//              } else{
//                  this.$message.error('获取失败')
//              }
//            }, (err) => {
//              this.$message.error('获取失败');
//              console.log(err);
//            })
//      },
      async getTenUnfinishedTodoList(){
//          this.$http.get('/todolist/ten/' + this.name)
//            .then((res) => {
//              console.log(res)
//              if(res.status == 200){
//                  this.list = res.data
//              } else{
//                  this.$message.error('获取失败')
//              }
//            }, (err) => {
//              this.$message.error('获取失败');
//              console.log(err);
//            })
        let name = this.name;
        try {
          let response = await fetch('/todolist/ten/unfinished/' + name + '/' + this.page);
          let eventData = await response.json();
          if(eventData.status == '0'){
            this.$message.error(eventData.info);
          }else{
              this.unfinishedList = eventData;
          }
        } catch(err) {
          console.log("Oops, error", err);
          this.$message.error('服务器错误， 错误信息：' + err)
        }
        //vue也可以将方法写成async形式，这样就可以在获取数据之后直接放入当前this中的内容里
        //fetch可以代替axios进行数据交互，相对来说更清楚一些
        //服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
        //await response.json()如果返回的对象是reject的话，该方法会被catch，显示错误，如果是resolve则正常显示
        //由于返回的对象是reject就会被catch到错误，所以可以先.json(),然后根据json化后的数据中的参数进行判断，这样可以自定义错误，如果数据库查询出现错误的话可以返回错误值。
      },
      async getTenFinishedTodoList(){
        let name = this.name;
        try {
          let response = await fetch('/todolist/ten/finished/' + name);
          let eventData = await response.json();
          if(eventData.status == '0'){
            this.$message.error(eventData.info);
          }else{
            this.finishedList = eventData;
          }
        } catch(err) {
          console.log("Oops, error", err);
          this.$message.error('服务器错误， 错误信息：' + err)
        }
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
                  this.getTenUnfinishedTodoList();
                  this.getTenFinishedTodoList();
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
                  this.getTenUnfinishedTodoList();
                  this.getTenFinishedTodoList();
              }else{
                  this.$message('删除失败')
              }
            }, (err) => {
              this.$message.error(err);
            })
      },
      handleCurrentChange(val){
          console.log('当前页面是' + val);
          this.page = val;
          this.getTenUnfinishedTodoList();
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
