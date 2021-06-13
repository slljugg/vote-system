<template>
  <div id="change">
    <el-card class="change-card">
      <div class="change-wrap">
        <ul class="menu-wrap">
          <li v-for="item in items"
          :key="item.content"
          >{{item.content}}
          </li>
        </ul>
        <el-form :model="changeinfo" status-icon :rules="rules"
          ref="changeinfoRef" class="demo-ruleForm" label-position="top">
          <el-form-item prop="email" label="邮箱">
            <el-input type="text" v-model="changeinfo.email"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="change" class="btn-cha">确 定</el-button>
            <el-button type="danger" @click="resetForm('changeinfo')">重 置</el-button>
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
  #change {
    height: 100%;
    width: 100%;
    background-color: #344a5f;
  }
  .change-card {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-25%);
    width: 35%;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: rgb(212, 212, 212);
  }
  .change-wrap {
    width: 300px;
    margin: auto;
  }
  .change-wrap > ul {
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
  .btn-cha {
    margin-top: 7px;
    margin-right: 19px;
  }
</style>

<script>
import api from '../../api';

export default {
  name: 'change',
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
          content: '请输入邮箱',
          done: true,
        },
      ],
      changeinfo: {
        email: '',
      },
      rules: {
        email: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs.changeinfoRef.resetFields()
    },
    change() {
      // 登录前预检验 result为true才能发送，validate为检验函数
      this.$refs.changeinfoRef.validate(async (result) => {
        if (!result) {
          return
        }
        const { data: res } = await api.post('/change', this.changeinfo)
        if (res.meta.status !== 200) {
          return this.$message.error('发送修改链接失败')
        }
        this.$message.success('发送修改链接成功')
        this.$router.push('/login')
      })
    }
  },
}
</script>
