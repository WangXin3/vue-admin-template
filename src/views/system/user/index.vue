<template>
  <div style="padding: 20px">
    <el-row>
      <el-col>
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        <el-button type="danger" :disabled="selectData.length === 0" @click="deleteUser(selectData, 1)">删除</el-button>
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
        <el-form-item label="角色" label-width="90px" size="medium" prop="tempRoles" required>
          <el-select v-model="user.tempRoles" multiple placeholder="请选择">
            <el-option
              v-for="(item, index) in roles"
              :key="index"
              :label="item.description"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" label-width="90px" size="medium" prop="gender">
          <el-radio v-model="user.gender" :label="1">男</el-radio>
          <el-radio v-model="user.gender" :label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="90px" size="medium" prop="enabled">
          <el-radio v-model="user.enabled" :label="true">激活</el-radio>
          <el-radio v-model="user.enabled" :label="false">禁用</el-radio>
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
            prop="roles"
            label="角色"
            align="center"
            min-width="150"
          >
            <template slot-scope="scope">
              <el-tag v-for="(role, index) in scope.row.roles" :key="index" type="warning">{{ role.description }}</el-tag>
            </template>
          </el-table-column>
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
              <el-button type="text" size="small" @click="deleteUser(scope.row, 2)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="text-align: center; margin-top: 10px">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="pager.pageNum"
            :page-size="pager.pageSize"
            :page-count="pager.pageCount"
            @current-change="pageChange"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserList, addUser, delUser, editUser } from '@/api/system/user'
import { getRoleList } from '@/api/system/role'

export default {
  name: 'Index',
  data() {
    return {
      pager: {
        pageNum: 1,
        pageSize: 5,
        pageCount: 0
      },
      tableData: [],
      listLoading: true,
      selectData: [],
      user: {
        username: '',
        nickname: '',
        email: '',
        roles: [],
        tempRoles: [],
        gender: 1,
        enabled: true
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
        tempRoles: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        gender: [],
        enabled: []
      },
      roles: []
    }
  },
  created() {
    this.fetchData()
    this.loadRole()
  },
  methods: {
    // 编辑用户
    handleClick(row) {
      this.user = row
      this.user.tempRoles = this.user.roles.map(role => {
        return role.id
      })
      this.dialogFormVisible = true
    },

    // 加载数据
    fetchData() {
      this.tableData = []
      this.listLoading = true
      getUserList(this.pager.pageNum, this.pager.pageSize).then(response => {
        response.data.list.map(item => {
          this.tableData.push(Object.assign({}, item, { tempRoles: [] }))
        })
        this.pager.pageCount = response.data.pages
        this.pager.pageNum = response.data.pageNum
        this.pager.pageSize = response.data.pageSize
        this.listLoading = false
      })
    },

    // 选择用户
    handleSelectionChange(val) {
      this.selectData = val
    },

    // 删除用户
    deleteUser(users, type) {
      if (type === 2) {
        users = [users]
      }

      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(users).then(response => {
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 避免全删本页所有数据导致的bug
            this.pager.pageNum = 1
            this.fetchData()
          }
        })
      }).catch(() => {

      })
    },

    // 新增/编辑用户
    addUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 处理roles
          this.user.roles = this.user.tempRoles.map(role => {
            return { 'id': role }
          })

          if (this.user.id) {
            // 编辑
            editUser(this.user).then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                })
              }
              this.dialogFormVisible = false
              this.fetchData()
            })
          } else {
            // 新增
            addUser(this.user).then(response => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                this.dialogFormVisible = false
                this.fetchData()
              }
            })
          }
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
      this.user = {
        username: '',
        nickname: '',
        email: '',
        roles: [],
        tempRoles: [],
        gender: 1,
        enabled: true
      }
    },

    // 加载角色
    loadRole() {
      getRoleList().then(response => {
        this.roles = response.data
      })
    },

    pageChange(val, e, form, jobExpLabel, pageform, searchVal) {
      this.pager.pageNum = val
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom:20px
}
</style>
