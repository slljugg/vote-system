<template>
  <div id="changepassword">
    <el-card class="changepss-card">
      <div class="changepassword-wrap">
        <ul class="menu-wrap">
          <li v-for="item in items"
          :key="item.content"
          >{{item.content}}
          </li>
        </ul>
        <el-form :model="changePasswordinfo" status-icon :rules="rules"
          ref="changePasswordinfoRef" class="demo-ruleForm" label-position="top">
          <el-form-item prop="password" label="请输入新密码">
            <el-input type="password" v-model="changePasswordinfo.password"></el-input>
          </el-form-item>

          <el-form-item prop="password2" label="请再次输入新密码">
            <el-input type="password" v-model="changePasswordinfo.password2"></el-input>
          </el-form-item>

          <el-form-item class="btns">
            <el-button type="primary" @click="changePassword" class="btn-change">确 定</el-button>
            <el-button type="danger" @click="resetForm('changePasswordinfo')">重 置</el-button>
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
  #changepassword {
    height: 100%;
    width: 100%;
    background-color: #344a5f;
  }
  .changepss-card {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-25%);
    width: 35%;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: rgb(212, 212, 212);
  }
  .changepassword-wrap {
    width: 300px;
    margin: auto;
  }
  .changepassword-wrap > ul {
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
  .btns {
    margin-top: 35px;
    .btn-change {
      margin-right: 20px;
    }
  }
</style>

<script>
import api from '../../api';

export default {
  name: 'changepassword',
  data() {
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        callback()
      }
    };
    var checkPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.changePasswordinfo.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      items: [
        {
          content: '设置新密码',
          done: true,
        },
      ],
      changePasswordinfo: {
        password: '',
        password2: '',
      },
      rules: {
        password: [
          { validator: checkPassword, trigger: 'blur' },
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        password2: [
          { validator: checkPassword2, trigger: 'blur' },
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs.changePasswordinfoRef.resetFields()
    },
    async changepassword() {
      try {
        const tid = this.$route.params.token
        console.log(tid)
        const request = await api.post(('/change-password/' + tid), this.changePasswordinfo)
        alert('密码已重置成功，请返回登录页面重新登录')
      } catch (e) {
        alert(e.response.data.msg)
      }
    },
    changePassword() {
      // 登录前预检验 result为true才能发送，validate为检验函数
      this.$refs.changePasswordinfoRef.validate(async (result) => {
        if (!result) {
          return
        }
        const tid = this.$route.params.token
        const { data: res } = await api.post('/change-password/' + tid, this.changePasswordinfo)
        if (res.meta.status !== 200) {
          return this.$message.error('链接已失效，请重新申请链接')
        }
        this.$message.success('密码已重置成功，请返回登录页面重新登录')
      })
    }
  },
}
</script>
