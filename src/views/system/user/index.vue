<template>
  <div style="padding: 20px">
    <el-row>
      <el-col>
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        <el-button type="danger" :disabled="selectData.length === 0" @click="deleteUser(selectData)">删除</el-button>
      </el-col>
    </el-row>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="20%" @close="close">
      <el-form ref="user" :model="user" :rules="rules">
        <el-form-item label="用户名" label-width="90px" size="medium" prop="username" required>
          <el-input v-model="user.username" placeholder="请输入用户名" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称" label-width="90px" size="medium" prop="nickname" required>
          <el-input v-model="user.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="邮箱" label-width="90px" size="medium" prop="email" required>
          <el-input v-model="user.email" placeholder="请输入Email" />
        </el-form-item>
        <el-form-item label="角色" label-width="90px" size="medium" prop="roles" required>
          <el-select v-model="user.roles" multiple placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" label-width="90px" size="medium" prop="gender">
          <el-radio v-model="user.gender" label="1">男</el-radio>
          <el-radio v-model="user.gender" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="90px" size="medium" prop="enabled">
          <el-radio v-model="user.enabled" label="1">激活</el-radio>
          <el-radio v-model="user.enabled" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser('user')">确 定</el-button>
      </div>
    </el-dialog>

    <el-row>
      <el-col>
        <el-table
          v-loading="listLoading"
          :data="tableData"
          border
          stripe
          empty-text="暂无数据"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            min-width="200"
          />
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
            min-width="120"
          >
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
            min-width="150"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.enabled" type="success">激活</el-tag>
              <el-tag v-else type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
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
      listLoading: true,
      selectData: [],
      user: {
        username: '',
        nickname: '',
        email: '',
        roles: [],
        gender: '1',
        enabled: '1'
      },
      dialogFormVisible: false,

      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        gender: [],
        enabled: []
      },
      roles: [
        { value: 'admin', label: '超级管理员' },
        { value: 'user', label: '用户' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 编辑用户
    handleClick(row) {
      console.log(row)
    },

    // 加载数据
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },

    // 选择用户
    handleSelectionChange(val) {
      this.selectData = val
    },

    // 删除用户
    deleteUser(users) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(users)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {

      })
    },

    // 新增用户
    addUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 关闭新增用户dialog
    close() {
      this.dialogFormVisible = false
      this.$refs.user.resetFields()
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom:20px
}
</style>
