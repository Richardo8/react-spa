# 使用Mongoose连接mongoDB

    $ npm install mongoose

然后在应用中将mongoose模块包含进来

    require('mongoose')

# 如何安装和使用mongodb

安装 MongoDB 很简单,去官网下载对应系统的 MongoDB 压缩包即可。解压后将文件夹重命名为 mongodb，并在 mongodb 文件夹里新建相应工程名称文件夹作为我们博客内容的存储目录。进入到 bin 目录下：

运行：

    mongod --dbpath ../blog/

以上命令的意思是:设置 blog 文件夹作为我们工程的存储目录并启动数据库。

# 分离

将连接数据库的代码写在config文件夹中，exports一个db，在schema文件夹中新建各类schema，并引入test，实现分离。


## 一. 名词解释

### 1.1 名词解释

`Schema`: 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力

`Model`: 由Schema发布生成的模型，具有抽象属性和行为的数据库操作对

`Entity`: 由Model创建的实体，他的操作也会影响数据库


**`Schema`, `Model`, `Entity`具有以下关系，`Schema`生成`Model`，`Model`创造`Entity`，`Model`和`Entity`都可对数据库操作造成影响，但`Model`比`Entity`更具操作性。**

require mongoose模块之后

    var db = mongoose.createConnection('localhos', 'test');

## 二. 使用

### 1. Schema

定义Schema：

    var BlogSchema = new Schema({
      title:String,
      author: String
    });

Schema.Types:

    var ExampleSchema = new Schema({
          name:String,
          binary:Buffer,
          living:Boolean,
          updated:Date,
          age:Number,
          mixed:Schema.Types.Mixed, //该混合类型等同于nested
          _id:Schema.Types.ObjectId,  //主键
          _fk:Schema.Types.ObjectId,  //外键
          array:[],
          arrOfString:[String],
          arrOfNumber:[Number],
          arrOfDate:[Date],
          arrOfBuffer:[Buffer],
          arrOfBoolean:[Boolean],
          arrOfMixed:[Schema.Types.Mixed],
          arrOfObjectId:[Schema.Types.ObjectId]
          nested:{
            stuff:String,
          }
        });

### 2. Schema的扩展


