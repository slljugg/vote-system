<template>
  <div id="vote">
    <el-container class="vote_container">
      <el-header height="60px">
        <el-button type="info" class="vote-btn" @click="homepage">回到主页</el-button>
        <span>用户投票系统</span>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu :unique-opened="true" :router="true" :default-active="activePath">
            <el-submenu :index="adminlist.id + ''" v-show="adminshow === 'admin'">
              <!-- 一级 -->
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>{{ adminlist.authname }}</span>
              </template>
                <!-- 二级 -->
                <el-menu-item :index="'/' + adminlist.children.path"
                  @click="isactivePath('/' + adminlist.children.path)">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ adminlist.children.authname }}</span>
                  </template>
                </el-menu-item>
            </el-submenu>
            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <!-- 一级 -->
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>{{ item.authname }}</span>
              </template>
                <!-- 二级 -->
                <el-menu-item :index="'/' + item1.path"
                  v-for="item1 in item.children" :key="item1.id"
                  @click="isactivePath('/' + item1.path)">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ item1.authname }}</span>
                  </template>
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import api from '../../api'

export default {
  name: 'vote',
  data() {
    return {
      // 用户列表
      menulist: [
        {
          id: 1,
          authname: '首页',
          children: [
            { id: 1, authname: '欢迎用户', path: 'welcome' },
          ]
        },
        {
          id: 2,
          authname: '我的投票',
          children: [
            { id: 2, authname: '创建投票', path: 'create' },
            { id: 3, authname: '我创建的投票', path: 'created' },
            { id: 4, authname: '我参与的投票', path: 'voted' },
          ]
        },
        {
          id: 3,
          authname: '所有投票',
          children: [
            { id: 5, authname: '所有用户投票', path: 'tickets' },
          ]
        },
      ],
      // 超级管理员列表
      adminlist: {
        id: 4,
        authname: '超级管理员',
        children: { id: 1, authname: '用户信息', path: 'admin' },
      },
      adminshow: '',
      activePath: '',
    }
  },
  created() {
    this.getAdmin()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    async getAdmin() {
      const { data: res } = await api.get('/userinfo')
      if (res.meta.status !== 200) {
        return
      }
      console.log(res)
      this.adminshow = res.data.name
    },
    isactivePath(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    homepage() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  #vote {
    width: 100%;
    height: 100%;
  }
  .vote_container {
    width: 100%;
    height: 100%;
    .el-header {
      background-color: #373d41;
      text-align: center;
      span {
        color: white;
        font-size: 24px;
        line-height: 60px;
      }
    }
    .el-main {
      background-color: #eee;
    }
  }
  .vote-btn {
    position: absolute;
    left: 40px;
    top: 10px
  }
  .el-menu {
    border: 0px;
  }
</style>
