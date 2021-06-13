<template>
  <div id="admin">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item>超级管理员</el-breadcrumb-item>
      <el-breadcrumb-item>admin</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <el-row>
        <el-col :span="3">
          <el-button type="primary" @click="addDialogVisble = true">添加用户</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="danger" @click="logoutAdmin">登出超级管理员</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" :border="true">
        <el-table-column type="index" label="#" width="120">
        </el-table-column>
        <el-table-column label="用户名" prop="name">
        </el-table-column>
        <el-table-column label="邮箱" prop="email">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              @click="showeditUser(scope.row.id)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"
              @click="removeUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[20, 40, 60]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisble"
      width="50%" @close="addDialogClosed"
      >
      <!-- 内容显示区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="addDialogVisble = false">取 消</el-button>
        <el-button type="info" @click="addDialogClosed">重 置</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisble"
      width="50%" @close="editDialogClosed"
      >
      <!-- 内容显示区域 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editDialogVisble = false">取 消</el-button>
        <el-button type="info" @click="editDialogClosed">重 置</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../api'

export default {
  name: 'admin',
  data() {
    // 验证邮箱是否符合
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    return {
      userlist: [],
      // 信息数目
      total: 0,
      pagesize: 20,
      pagenum: 1,
      // 控制添加dialog
      addDialogVisble: false,
      // 控制编辑dialog
      editDialogVisble: false,
      // 添加用户信息
      addForm: {
        name: '',
        email: '',
        password: '',
      },
      // 修改用户信息
      editForm: '',
      // 添加规则
      addFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 8,
            message: '用户名长度在3到8个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 8,
            message: '用户名长度在6到15个字符',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
      },
      // 修改规则
      editFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 8,
            message: '用户名长度在3到8个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 8,
            message: '用户名长度在3到8个字符',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await api.get('/userlist')
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户信息失败，请确认您已登录')
      }
      console.log(res.data)
      this.userlist = res.data
      this.total = this.userlist.length
    },
    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage
      this.getUserList()
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    addUser() {
      // 添加前预检验 result为true才能发送，validate为检验函数
      this.$refs.addFormRef.validate(async (result) => {
        if (!result) {
          return
        }
        const { data: res } = await api.post('/register', this.addForm)
        if (res.meta.status !== 200) {
          return this.$message.error('添加失败,用户名已存在')
        }
        this.$message.success('添加成功')
        this.getUserList()
      })
    },
    async logoutAdmin() {
      window.sessionStorage.clear()
      const { data: res } = await api.get('/logout')
      if (res.meta.status !== 200) {
        return this.$message.error('登出失败')
      }
      this.$message.success('登出成功')
      this.$router.push('/login')
    },
    async showeditUser(id) {
      const { data: res } = await api.get('/users/' + id)
      if (res.meta.status !== 200) {
        this.$message.error('查询数据失败')
        return
      }
      this.editForm = res.data
      this.editDialogVisble = true
    },
    editUser() {
      this.$refs.editFormRef.validate(async (result) => {
        if (!result) {
          return
        }
        const { data: res } = await api.put('/users/' + this.editForm.id, this.editForm)
        if (res.meta.status !== 200) {
          this.$message.error('用户数据更新失败')
          return
        }
        // 关闭对话框
        this.editDialogVisble = false
        // 刷新数据
        this.getUserList()
        // 提示修改成功
        this.$message.success('用户数据修改成功')
      })
    },
    async removeUser(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该投票信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(confirmResult)
      // 如果用户点击确认返回confirm
      // 若果用户点击取消则返回值为错误  用catch接收错误，然后config出来s cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await api.delete('/users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('无法删除超级管理员用户')
      }
      this.$message.success('删除用户成功')
      // 刷新数据
      this.getUserList()
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
