<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="listLoading"
          :data="tableData"
          border
          stripe
          empty-text="暂无数据"
          style="width: 100%"
        >
          <el-table-column
            label="头像"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <img :src="scope.row.avatar" width="40" height="40" class="head_pic">
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            align="center"
            min-width="150"
          />
          <el-table-column
            prop="nickname"
            label="昵称"
            align="center"
            min-width="120"
          />
          <el-table-column
            label="性别"
            align="center"
            min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.gender == 0 ? '女' : '男' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
            min-width="120"
          />
          <el-table-column
            prop="lastLoginTime"
            label="最后一次登录时间"
            align="center"
            min-width="150"
          />
          <el-table-column
            label="状态"
            align="center"
            min-width="150">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.enabled">正常</el-tag>
              <el-tag type="danger" v-else>禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="text-align: center; margin-top: 10px">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="100"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getList } from '@/api/system/user'

export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },

    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.tableData = response.data
        console.log(this.tableData)
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
