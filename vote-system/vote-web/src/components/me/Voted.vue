<template>
  <div id="voted">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/vote' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的投票</el-breadcrumb-item>
      <el-breadcrumb-item>我参与的投票</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <!-- 表格视图 -->
      <el-table :data="votedlist" :border="true">
        <el-table-column type="index" label="#" width="90">
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
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-more"
            size="mini" @click="showVotedDetail(scope.row.optionid,scope.row.voteid)">详情</el-button>
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
    <el-drawer
      title="详情"
      :visible.sync="drawer"
      :direction="direction"
      size="30%"
      >
      <el-form :model="info" class="el-form">
        <el-form-item label="标题">
          <el-input v-model="info.title" disabled></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="info.desc" disabled></el-input>
        </el-form-item>
      </el-form>
      <div class="option-btns">
        <el-button v-for="(item, idx) in options" type="success"
          :key="idx" class="option-btn">
          选项{{idx + 1}}:{{item.content}} --- {{ summary[item.id].length }}票
        </el-button>
        <el-button class="option-btn" type="success">你的选择:{{votedinfo.content}}</el-button>
      </div>
      <el-button type="primary" @click="drawer = false" class="el-sure">确 定</el-button>
    </el-drawer>
    <!-- <el-dialog
      title="详情"
      :visible.sync="voteddialogVisible"
      width="30%">
      <el-form :model="info">
        <el-form-item label="标题">
          <el-input v-model="info.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="name">
          <el-input v-model="info.desc"></el-input>
        </el-form-item>
      </el-form>
      <div class="option-btns">
        <el-button v-for="(item, idx) in options" type="success"
          :key="idx" class="option-btn">
          选项{{idx + 1}}:{{item.content}} --- {{ summary[item.id].length }}票
        </el-button>
        <el-button class="option-btn" type="success">你的选择:{{votedinfo.content}}</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="voteddialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import _ from 'lodash'
import api from '../../api'

export default {
  name: 'voted',
  data() {
    return {
      votedlist: [],
      // 控制详情对话框
      // voteddialogVisible: false,
      drawer: false,
      direction: 'rtl',
      // 投票信息
      info: {},
      // 选项信息
      options: [],
      // 选择信息
      votedinfo: {},
      voteups: [],
      // 信息数目
      total: 0,
      pagesize: 20,
      pagenum: 1,
    }
  },
  created() {
    this.getVotedList()
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
    async getVotedList() {
      const { data: res } = await api.get('/votedlist')
      if (res.meta.status !== 200) {
        return this.$message.error('获取个人投票信息失败，请确认您已登录')
      }
      console.log(res)
      this.votedlist = res.data
      this.total = this.votedlist.length
    },
    async showVotedDetail(optionid, voteid) {
      const { data: res1 } = await api.get('/votedetail/' + voteid)
      if (res1.meta.status !== 200) {
        return this.$message.error('获取个人投票信息失败，请确认您已登录')
      }
      console.log(res1)
      this.info = res1.data.votes
      this.options = res1.data.options
      this.voteups = res1.data.voteups
      this.voteups = _.uniqBy(this.voteups, 'userid')
      const { data: res2 } = await api.get('/cententdetail/' + optionid)
      if (res2.meta.status !== 200) {
        return this.$message.error('获取个人投票信息失败，请确认您已登录')
      }
      console.log(res2)
      this.votedinfo = res2.data
      this.drawer = true
    },
    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.getVotedList()
    },
    handleCurrentChange(newPage) {
      this.pagenum = newPage
      this.getVotedList()
    },
  },
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
  .el-form {
    margin: 0 50px;
  }
  .el-sure {
    margin: 30px 50px;
  }
</style>
