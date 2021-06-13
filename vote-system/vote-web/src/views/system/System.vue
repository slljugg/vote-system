<template>
  <div id="system" v-if="userShow === 1">
    <el-card class="system-card">
      <div class="system-wrap">
        <div class="system-menu">
          <span class="wrap11">欢迎用户</span>
          <span class="wrap12">{{ userlist.name }}</span>
        </div>
        <el-form status-icon class="demo-ruleForm">
          <el-form-item>
            <router-link class="tickets" to="/vote">投票系统</router-link>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="logout" class="logout-btn">登出</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" class="homebtn" @click="homepage">回到主页</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
  <div id="system" v-else>
    <el-card class="system-card">
      <div class="system-wrap">
        <router-link class="wrap" to="/login">登录</router-link>
        <router-link class="wrap" to="/register">注册</router-link>
      </div>
      <el-form status-icon class="demo-ruleForm">
        <el-form-item>
          <el-button type="success" class="homebtn1" @click="homepage">回到主页</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
  html, body {
    margin: 0;
    height: 100%;
  }
  #system {
    height: 100%;
    width: 100%;
    background-color: #344a5f;
    text-align: center;
    position: relative;
  }
  .system-card {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-25%);
    width: 35%;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: rgb(212, 212, 212);
  }
  .system-wrap {
    width: 250px;
    margin: auto;
    text-align: center;
  }
  .system-menu {
    width: 250px;
    height: 40px;
  }
  .wrap {
    display: inline-block;
    width: 100px;
    line-height: 40px;
    font-size: 14px;
    color:#fff;
    border-radius: 5px;
    text-decoration: none;
    margin:10px;
    margin-top: 0px;
    margin-bottom: 0px;
    background-color:rgba(64,158,255,1);
  }
  .wrap11, .wrap12 {
    display: inline-block;
    width: 100px;
    line-height: 40px;
    font-size: 14px;
    color:#fff;
    border-radius: 5px;
    background-color: rgba(64,158,255,1);
  }
  .wrap11 {
    float: left;
  }
  .wrap12 {
    float: right;
  }
  .logout-btn {
    display: block;
    width: 250px;
    margin-top:35px;
    margin-bottom: 0px;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  .create, .tickets {
    margin-top: 35px;
    width: 250px;
    height: 40px;
    display: block;
    border-radius: 4px;
    color: #fff;
    text-decoration: none;
    background-color: rgba(64,158,255,1);
  }
  .tickets {
    background-color: #909399;
  }
  .homebtn {
    margin-top: 35px;
    width: 250px;
  }
  .homebtn1 {
    margin-top: 35px;
    width: 220px;
  }
</style>

<script>
import api from '../../api';

export default {
  name: 'system',
  data() {
    return {
      userlist: {},
      userShow: 0,
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await api.get('/userinfo')
      if (res.meta.status !== 200) {
        return
      }
      console.log(res)
      this.userlist = res.data
      this.userShow = res.meta.code
    },
    async logout() {
      await api.get('/logout')
      this.userShow = 0
    },
    homepage() {
      this.$router.push('/home')
    }
  },
}
</script>
