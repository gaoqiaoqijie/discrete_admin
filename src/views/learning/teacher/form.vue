<template>
  <div class="app-container">
    <el-form ref="teacher" :model="teacher" label-width="80px">
      <div class="app-container">
        <el-form-item label="头像:"/>
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/oss/file/upload'"
          class="avatar-uploader">
          <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </div>

      <el-form-item label="教师姓名:" label-width="83px" :rules="[{ required: true, message: '请输入教师姓名', trigger: 'blur' }]" prop="username">
          <div >
            <i class="iconfont icon-tubiao211"/>
            <el-input v-model="teacher.username" type="text" placeholder="教师姓名"/>
          </div>
        </el-form-item>

      <el-form-item label="教师邮箱:" label-width="83px" :rules="[{ required: true, message: '请输入教师邮箱', trigger: 'blur' },{validator: checkMail, trigger: 'blur'}]" class="input-prepend restyle no-radius" prop="mail">
          <div>
            <el-input v-model="teacher.mail" type="text" placeholder="邮箱"/>
            <i class="iconfont icon-huaban14"/>
          </div>
      </el-form-item>
      <!-- <el-form-item label="教师姓名:">
        <el-input v-model="teacher.username" clearable placeholder="教师姓名" />
      </el-form-item>
      <el-form-item label="教师邮箱:">
        <el-input v-model="teacher.mail" clearable placeholder="教师邮箱" />
      </el-form-item> -->

      <el-form-item label="教师姓别:">
        <el-select v-model="teacher.gender" placeholder="请选择">
          <el-option label="男" :value="2"/>
          <el-option label="女" :value="1"/>
        </el-select>
      </el-form-item>

      <el-form-item label="用户权限">
        <el-select v-model="teacher.isAdmin" placeholder="请选择">
          <el-option label="普通教师" :value="2"/></el-option>
          <el-option label="系统管理员" :value="1"/></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="教师简介">
        <el-input v-model="teacher.introduce" type="textarea" placeholder="请输入教师简介" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" >{{ submitButton }}</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import userApi from '@/api/ucenter/user'
export default {
  data() {
    return {
      teacher: {
        username: '',
        mail: '',
        introduce: '',
        avatar: '',
        isAdmin: 2,
        permission: 1,
        gender: 2
      },
      submitButton: '立即创建',
      BASE_API: process.env.BASE_API
    }
  },

  watch: {
    // 监听路由变化，解决created只会执行一次，导致没有id也会回显数据的bug
    $route(to, from) {
      // 清空一下，并且添加默认图片
      this.user = {}
      this.submitButton = '立即创建'
    }
  },

  created() {
    // 只在有id的时候调用回显
    if (this.$route.params && this.$route.params.id) {
      // 从路径获取id值
      const id = this.$route.params.id
      // 修改按钮
      this.submitButton = '立即修改'
      // 调用回显
      this.getById(id)
    } else {
      // 没有id的时候清空
      this.teacher = {
        username: '',
        mail: '',
        introduce: '',
        avatar: '',
        permission: 1,
        isAdmin: 2,
        gender: 2,
        avatar: 'http://hsunnyc.oss-cn-beijing.aliyuncs.com/avatar/teacher.jpeg'
      }
    }
  },

  methods: {
    // 提交
    onSubmit() {
      // 判断是添加还是修改
      if (this.teacher.id != null) {
        // 不为空就是修改
        this.updateById(this.teacher.id, this.teacher)
      } else {
        // 为空就是添加
        this.addUser()
      }
    },
    // 邮箱格式检查
    checkMail(rule, value, callback) {
      if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
        return callback(new Error('邮箱格式不正确'))
      }
      return callback()
    },

    // 返回
    back() {
      this.$router.go(-1)
    },

    // 添加讲师
    addUser() {
      userApi.addTeacher(this.teacher)
        .then(response => {
          // 添加成功提示消息,然后跳转页面
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
          this.$router.push({ path: '/learning/teacher/list' })
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 修改讲师
    updateById(id) {
      userApi.updateById(id, this.teacher)
        .then(response => {
          // 修改成功消息，然后跳转页面
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.$router.push({ path: '/learning/teacher/list' })
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 根据id回显数据
    getById(id) {
      userApi.getUserById(id)
        .then(response => {
          this.teacher = response.data.user
        })
        .catch(error => {
          console.log(error)
        })
    },

    // 成功上传
    handleAvatarSuccess(res) {
      this.teacher.avatar = res.data.url
    },
    // 校验上传图片的大小是否符合要求（还可以校验格式等等）
    beforeAvatarUpload(file) {
      const isJPGorPng = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M && isJPGorPng
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
