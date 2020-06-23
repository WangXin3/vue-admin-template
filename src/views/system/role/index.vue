<template>
  <div style="padding: 20px">
    <el-row>
      <el-col>
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        <el-button type="danger" :disabled="selectData.length === 0" @click="deleteRole(selectData, 1)">删除</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="18">
        <el-table
          v-loading="listLoading"
          :data="tableData"
          border
          stripe
          empty-text="暂无数据"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @row-click="loadMenusByRoleId"
        >
          <el-table-column
            type="selection"
            min-width="200"
          />
          <el-table-column
            prop="id"
            label="ID"
            align="center"
            min-width="100"
          />
          <el-table-column
            prop="description"
            label="角色名称"
            align="center"
            min-width="150"
          />
          <el-table-column
            prop="roleName"
            label="角色标识"
            align="center"
            min-width="120"
          />
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteRole(scope.row, 2)">删除</el-button>
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

      <el-col :span="6">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>菜单分配</span>
              <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
            </div>
            <div>
              <el-tree
                :data="menuData"
                show-checkbox
                node-key="id"
                ref="tree"
                :props="defaultProps"
                check-strictly
              />
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getRoleListPage } from '@/api/system/role'
import { getMenusTreeByRoleId, getMenusTree } from '@/api/system/menu'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      pager: {
        pageNum: 1,
        pageSize: 5,
        pageCount: 0
      },
      listLoading: true,
      selectData: [],

      menuData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectMenuData: []
    }
  },
  created() {
    this.fetchData()
    this.getMenusTree()
  },
  methods: {
    // 加载数据
    fetchData() {
      this.tableData = []
      this.listLoading = true
      getRoleListPage(this.pager.pageNum, this.pager.pageSize).then(response => {
        this.tableData = response.data
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
    pageChange(val, e, form, jobExpLabel, pageform, searchVal) {
      this.pager.pageNum = val
      this.fetchData()
    },

    deleteRole(role, type) {

    },

    handleClick(role) {

    },

    loadMenusByRoleId(row, column, event) {
      getMenusTreeByRoleId(row.id).then(response => {
        this.$refs.tree.setCheckedKeys(response.data.map(
          function(x) {
            return x.id
          }
        ))
      })
    },

    getMenusTree() {
      getMenusTree().then(response => {
        this.menuData = response.data
      })
    }
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom:20px
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-left: 20px;
  }
</style>
