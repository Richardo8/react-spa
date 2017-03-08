<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>
        欢迎：{{name}}！请编辑：
      </span>
      <el-upload
        name="avatar"
        class="avatar-uploader"
        action="/edit/profile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
          this.getAvatar();
        })
    },
    data () {
      return {
        name: '',
        imageUrl: ''
      }
    },
    methods: {
      getUserInfo(){
        const token = sessionStorage.getItem('token');
        if(token != null && token != 'null'){
          return jwt.verify(token, 'united');//token的加密在此处可以看到
        }else{
          return null;
        }
      },
      handleAvatarSuccess(res, file){
          this.imageUrl = URL.createObjectURL(file.raw);
          this.setAvatar();
      },
      beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        console.log(file);
        return isJPG && isLt2M;
      },
      async setAvatar(){
        let objJson = JSON.stringify({
          name: this.name,
          url: this.imageUrl
        })
        console.log(objJson)
        let saveData = await fetch('/user/setAvatar', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: objJson
        })
        console.log(saveData);
      },
      async getAvatar(){
          try{
            let response = await fetch('user/getAvatar/' + this.name, {
                method: 'GET'
            } );
            let eventData = await response.json();
            console.log(eventData)

          }catch(err){
            console.log("Oops, error", err);
            this.$message.error('服务器错误， 错误信息：' + err)
          }
      }
    }
  }

</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
