<template>
  <div id="welcome">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/vote' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>欢迎用户</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <el-row v-if="userShow === 1" class="btn-row">
        <el-col :span="3">
          <span>欢迎用户：{{userlist.name}}</span>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" @click="logout">登 出</el-button>
        </el-col>
      </el-row>
      <el-row v-else class="btn-row">
        <el-col :span="4">
          <span>您还未登录，请先登录</span>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="login">点击登录</el-button>
        </el-col>
      </el-row>
      <!-- -->
      <h1>系统功能介绍</h1>
      <h2>普通登录用户</h2>
      <p>登录用户可以创建投票，管理自己的投票和查看自己所参与的所有投票。</p>
      <p>登录用户可以查看系统中所有用户创建的投票。</p>
      <p>点击详情后，对该投票已经投过票的用户可以看到不同选项的投票数，没用投过票的用户需要先行投票才能看到各项的投票数。</p>
      <p>投票详情中<el-button type="warning" size="mini">
        按钮</el-button>表示您还未对该票进行投票，可以点击选项进行投票。</p>
      <p>投票详情中<el-button type="success" size="mini">
      按钮</el-button>表示您对该票已进行投票，无法点击选项进行投票。</p>
      <p>未注册登录用户不具有上述权限。</p>
      <h2>超级管理员admin</h2>
      <p>超级管理员可以管理用户登录信息。</p>
    </el-card>
  </div>
</template>

<script>
import api from '../../api'

export default {
  name: 'welcome',
  data() {
    return {
      // 用户名信息
      userlist: {},
      // 控制显示用户名
      userShow: 0,
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await api.get('/userinfo')
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户失败,请确认您已登录')
      }
      console.log(res)
      this.userlist = res.data
      this.userShow = res.meta.code
    },
    async logout() {
      window.sessionStorage.clear()
      const { data: res } = await api.get('/logout')
      if (res.meta.status !== 200) {
        return this.$message.error('登出失败')
      }
      this.$message.success('登出成功')
      this.userShow = 0
    },
    login() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-row {
    display: flex;
    align-items: center;
  }
</style>
