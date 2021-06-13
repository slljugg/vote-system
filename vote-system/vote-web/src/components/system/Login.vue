<template>
  <div id="login">
    <el-card class="login-card">
      <div class="login-wrap">
        <ul class="menu-wrap">
          <li v-for="item in items"
          :key="item.content"
          >{{item.content}}
          </li>
        </ul>
        <el-form :model="info" status-icon :rules="rules"
          ref="info" class="demo-ruleForm" label-position="top">
          <el-form-item prop="name" label="用户名">
            <el-input type="text" v-model="info.name"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="info.password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-row>
              <el-col :span="16">
                <el-button type="primary" @click="login" class="btn-login">登 录</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" class="btn-reg" @click="toreg">未注册？</el-button>
              </el-col>
            </el-row>
            <el-row class="btn-row">
              <el-col :span="16">
                <el-button type="info" @click="change" class="btn-forget">忘记密码</el-button>
              </el-col>
              <el-col :span="8">
                <el-button @click="resetForm('info')" class="btn-reset"
                  type="danger">重 置</el-button>
              </el-col>
            </el-row>
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
  #login {
    height: 100%;
    width: 100%;
    background-color: #344a5f;
  }
  .login-card {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-25%);
    width: 35%;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: rgb(212, 212, 212);
  }
  .login-wrap {
    width: 300px;
    margin: auto;
  }
  .login-wrap > ul {
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
    border-radius: 5px;
    background-color: rgba(64,158,255,1);;
  }
  .btns {
    // display: flex;
    // justify-content: space-between;
    margin-top: 35px;
    .btn-login {
      width: 100px;
    }
    .btn-reset {
      width: 100px;
    }
    .btn-forget {
      width: 100px;
    }
    .btn-reg {
      width: 100px;
    }
  }
  .btn-row {
    margin-top: 35px;
  }
</style>

<script>
import api from '../../api';

export default {
  name: 'login',
  data() {
    return {
      items: [
        {
          content: '登录',
          done: true,
        },
      ],
      info: {
        name: 'aaa',
        password: 'aaa',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3, max: 8, message: '长度在 3 到 10 个字符', trigger: 'blur'
          }
        ],
      },
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async login() {
      const { data: res } = await api.post('/login', this.info)
      if (res.meta.status !== 200) {
        return this.$message.error('用户名或密码错误')
      }
      console.log(res)
      window.sessionStorage.setItem('token', res.token)
      this.$router.push('/vote')
    },
    change() {
      this.$router.push('/change')
    },
    toreg() {
      this.$router.push('/register')
    }
  },
}
</script>
