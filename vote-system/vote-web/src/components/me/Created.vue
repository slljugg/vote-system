<template>
  <div id="created">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/vote' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的投票</el-breadcrumb-item>
      <el-breadcrumb-item>我创建的投票</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" @click="tocreate">创建投票</el-button>
        </el-col>
      </el-row>
      <el-table :data="createdSelfList" :border="true">
        <el-table-column type="index" label="#" width="80">
        </el-table-column>
        <el-table-column prop="id" label="投票号" width="80">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="desc" label="描述" width="200">
        </el-table-column>
        <el-table-column prop="anonymouse" label="实名/匿名" width="120">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.anonymouse === 1" size="mini">匿名</el-button>
            <el-button type="warning" v-else size="mini">实名</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="singleSelection" label="单选/多选" width="120">
          <template slot-scope="scope">
            <el-button type="primary"
              v-if="scope.row.singleSelection === 1" size="mini">单选</el-button>
            <el-button type="warning" v-else size="mini">多选</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="deadline" label="创建时间" width="200">
          <template slot-scope="scope">
            {{scope.row.deadline | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete"
              size="mini" @click="deletevote(scope.row.id)">删除</el-button>
            <el-button type="info" icon="el-icon-more"
            size="mini" @click="showVoteDetail(scope.row.id)">详情</el-button>
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
    <!-- 详情对话框 -->
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="info">
        <el-form-item label="标题">
          <el-input v-model="info.title" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="info.desc" disabled></el-input>
        </el-form-item>
      </el-form>
      <div class="option-btns" v-if="showinfo === 1">
        <el-button v-for="(item, idx) in options" type="success"
          :key="idx" class="option-btn">
          选项{{idx + 1}}:{{item.content}} --- {{ summary[item.id].length }}票
        </el-button>
        <el-button class="option-btn" type="success">你的选择:{{votedinfo.content}}</el-button>
      </div>
      <div class="option-btns" v-else>
        <el-button v-for="(item, idx) in options" type="warning"
          @click="tovote(item.id, item.voteid)"
          :key="idx" class="option-btn">选项{{idx + 1}}:{{item.content}}
        </el-button>
        <el-button class="option-btn" type="warning">你尚未投票，可以点击选项投票</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import api from '../../api'

export default {
  name: 'created',
  data() {
    return {
      // 个人用户投票信息
      createdSelfList: [],
      // 信息数目
      total: 0,
      pagesize: 20,
      pagenum: 1,
      // 控制dialog显示
      dialogVisible: false,
      // 详情所需数据
      info: {},
      options: [],
      voteups: [],
      // 用户选项信息
      votedinfo: {},
      // 控制用户显示是否投票div
      showinfo: 0,
    }
  },
  created() {
    this.getCreatedSelfList()
  },
  computed: {
    summary() {
      var obj = _.mapValues(_.keyBy(this.options, 'id'), () => [])
      return {
        ...obj,
        ..._.groupBy(this.voteups, 'optionid')
      }
    },
  },
  methods: {
    async getCreatedSelfList() {
      const { data: res } = await api.get('/createdself')
      if (res.meta.status !== 200) {
        return this.$message.error('获取个人投票信息失败，请确保您已登录')
      }
      console.log(res)
      this.createdSelfList = res.data
      this.total = this.createdSelfList.length
      // console.log(this.total)
    },
    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.getCreatedSelfList()
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage
      this.getCreatedSelfList()
    },
    async deletevote(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该投票信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(confirmResult)
      // 如果用户点击确认返回confirm
      // 若果用户点击取消则返回值为错误  用catch接收错误，然后config出来 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await api.delete('created/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除投票失败，请确认您已登录')
      }
      this.$message.success('删除投票成功')
      // 刷新数据
      this.getCreatedSelfList()
    },
    async showVoteDetail(id) {
      const { data: res } = await api.get('/voteinfo/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('请求数据详情失败,请确认您已登录')
      }
      console.log(res)
      this.info = res.data.info
      this.options = res.data.options
      this.voteups = res.data.voteups
      this.dialogVisible = true
      this.voteups = _.uniqBy(this.voteups, 'userid')
      const { data: rult } = await api.get('/contentinfo/' + id)
      if (rult.meta.status !== 200) {
        this.showinfo = 0
        return
      }
      // this.$message.success('请求用户选项成功')
      console.log(rult)
      this.votedinfo = rult.data.contents
      this.showinfo = rult.meta.code
      console.log(this.votedinfo.content)
    },
    async tovote(optionid, voteid) {
      const { data: res } = await api.post('/voteup', {
        optionid,
        voteid,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('投票失败')
      }
      console.log(res)
      this.$message.success('投票成功')
      this.showVoteDetail(voteid)
    },
    tocreate() {
      this.$router.push('/create')
    }
  }
}
</script>

<style lang="scss" scoped>
  .option-btns {
    width: 100%;
    margin-top: 35px;
    .option-btn {
      width: 80%;
      line-height: 16px;
      margin-top: 35px;
      margin-left: 10%;
      display: block;
    }
  }
</style>
