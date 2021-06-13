<template>
  <div id="create">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/vote' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的投票</el-breadcrumb-item>
      <el-breadcrumb-item>创建投票</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="create-card">
      <div class="create-bg">
        <el-form :model="voteInfo" ref="voteInfoRef">
          <el-form-item prop="title" class="item">
            <el-input type="text" v-model="voteInfo.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item prop="desc">
            <el-input type="text" v-model="voteInfo.desc" placeholder="描述"></el-input>
          </el-form-item>
          <el-form-item v-for="(option,idx) in voteInfo.options" :key="idx" class="option-btn">
            <el-input class="option" type="text"
            v-model="voteInfo.options[idx]"
            :placeholder="'选择' + (idx + 1)">
            </el-input>
            <el-button class="btns" type="danger"
            @click="voteInfo.options.splice(idx,1)"
            >-</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="voteInfo.options.push('')">添加选项</el-button>
          </el-form-item>
          <el-form-item>
            <!-- <el-input type="datetime-local" v-model="voteInfo.deadline"></el-input> -->
            <el-date-picker
              v-model="voteInfo.deadline"
              type="datetime"
              placeholder="选择日期时间"
              align="left"
              value-format="timestamp"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <div class="radio-wrap">
            <el-radio v-model="voteInfo.anonymouse" label="1">匿名</el-radio>
            <el-radio v-model="voteInfo.anonymouse" label="0">实名</el-radio>
            <!-- <label class="wrap">
              实名<input class="wrap" type="radio" value="1"
              v-model="voteInfo.anonymouse" style="margin-right: 70px;">
            </label>
            <label class="wrap">
              匿名<input class="wrap" type="radio" value="0" v-model="voteInfo.anonymouse">
            </label> -->
          </div>
          <div clas="options-wrap">
            <!-- <select class="option-wrap" v-model="voteInfo.singleSelection">
              <option value="1">单选</option>
              <option value="0">双选</option>
            </select> -->
            <el-select v-model="voteInfo.singleSelection" placeholder="请选择">
              <el-option
                v-for="item in items"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-form-item>
            <el-button type="primary" @click="create">创建</el-button>
            <el-button @click="resetForm" type="info">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import api from '../../api'

export default {
  name: 'create',
  data() {
    return {
      voteInfo: {
        title: '',
        desc: '',
        options: ['', ''],
        deadline: '',
        anonymouse: '1',
        singleSelection: '1'
      },
      items: [
        {
          value: '1',
          label: '单选'
        },
        {
          value: '0',
          label: '多选'
        }
      ],
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  methods: {
    resetForm() {
      this.$refs.voteInfoRef.resetFields()
    },
    async create() {
      const { data: res } = await api.post('/create', this.voteInfo)
      // this.$router.push('/vote/' + request.data.id)
      if (res.meta.status !== 200) {
        return this.$message.error('创建投票失败，请确保您已登录')
      }
      this.$message.success('创建投票成功')
      this.$router.push('/created')
    }
  },
}
</script>

<style lang="scss" scoped>
  .create-card {
    display: flex;
    justify-content: center;
    // align-items: center;
  }
  .create-bg {
    margin-left: 00px;
    // width: 500px;
  }
  .option-btn {
    .option {
      width: 433px;
    }
    .btns {
      margin-left: 20px;
    }
  }
  .option-wrap {
    margin-top: 20px;
    margin-bottom: 20px;
    height: 35px;
  }
  .wrap {
    line-height: 20px;
    font-size: 14px;
  }
  .el-select {
  margin: 20px 0;
  }
</style>
