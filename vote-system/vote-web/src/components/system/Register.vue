<template>
  <div id="register">
    <el-card class="register-card">
      <div class="register-wrap">
        <ul class="menu-wrap">
          <li v-for="item in items"
          :key="item.content"
          >{{item.content}}
          </li>
        </ul>
        <el-form :model="info" status-icon :rules="rules"
          ref="infoRef" class="demo-ruleForm" label-position="top">
          <el-form-item prop="name" label="用户名">
            <el-input type="text" v-model="info.name"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input type="text" v-model="info.email"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="info.password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="register" class="btn-register">注 册</el-button>
            <el-button @click="resetForm('info')" type="danger">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
  html, body {
    margin: 0;
  }
  #register {
    height: 100%;
    width: 100%;
    background-color: #344a5f;
  }
  .register-card {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-25%);
    width: 35%;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: rgb(212, 212, 212);
  }
  .register-wrap {
    width: 300px;
    margin: auto;
  }
  .register-wrap > ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .menu-wrap {
    text-align: center;
  }
  .menu-wrap > li {
    display: inline-block;
    width: 100px;
    line-height: 40px;
    font-size: 14px;
    color:#fff;
    background-color: rgba(64,158,255,1);
    border-radius: 5px;
  }
  .btn-register {
    margin-right: 30px;
  }
  .btns {
    margin-top: 35px;
  }
</style>

<script>
import api from '../../api';

export default {
  name: 'register',
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    return {
      items: [
        {
          content: '注册',
          done: true,
        },
      ],
      info: {
        name: '',
        email: '',
        password: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'
          }
        ]
      },
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs.infoRef.resetFields()
    },
    register() {
      // 注册前预检验 result为true才能发送，validate为检验函数
      this.$refs.infoRef.validate(async (result) => {
        if (!result) {
          return
        }
        const { data: res } = await api.post('/register', this.info)
        if (res.meta.status !== 200) {
          return this.$message.error('注册失败')
        }
        this.$message.success('注册成功')
        this.$router.push('/login')
      })
    }
  },
}
</script>
