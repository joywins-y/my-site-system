<template>
  <div class="app-container">
    <!-- 新增分类 -->
    <div style="margin-top: 16px">
      <el-input v-model="input" placeholder="请输入" class="input-with-select input">
        <el-select slot="prepend" v-model="select" placeholder="请选择" style="width: 100px;">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="4" value="4" />
          <el-option label="5" value="5" />
        </el-select>
      </el-input>
      <el-button type="primary" style="margin-left: 8px;" @click="handleAddType">添加</el-button>
    </div>

    <!-- 列表 -->
    <el-table :data="data" style="width: 100%;">
      <el-table-column type="index" label="序号" width="100" align="center" />

      <el-table-column prop="name" label="文章类型" />

      <el-table-column prop="articleCount" label="文章数量" />

      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="2000">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑分类 -->
    <el-dialog title="编辑文章分类" :visible.sync="visible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="排序等级">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBlogType, addBlogType, searchBlogType, removeBlogType, updateBlogType } from '@/api/blogType'

export default {
  props: {},
  data() {
    return {
      input: '',
      select: '',
      data: [],
      loading: false,
      visible: false,
      form: {
        name: '',
        order: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getBlogType().then(res => {
        this.loading = false
        this.data = res.data
      })
    },
    /** 新增分类 */
    handleAddType() {
      if (this.input) {
        addBlogType({ name: this.input, order: this.select }).then(() => {
          this.fetchData()
          this.$message.success('添加分类成功')
        })
      } else {
        this.$message.error('分类名称不能为空')
      }
    },
    /** 编辑分类 */
    handleEdit({ id }) {
      searchBlogType(id).then(res => {
        this.form = res.data
        this.visible = true
      })
    },
    /** 删除分类 */
    handleDelete({ id }) {
      this.$confirm('删除该分类后，该分类下面的所有文章将变为未分类状态，是否继续？', '是否删除此文章分类', {
        type: 'warning'
      }).then(() => {
        removeBlogType(id).then(() => {
          this.fetchData()
          this.$message.success('删除成功')
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '取消删除' })
      })
    },
    /** 提交编辑 */
    handleConfirm() {
      updateBlogType({ id: this.form.id, data: this.form }).then(() => {
        this.$message.success('更新分类信息成功')
        this.fetchData()
        this.visible = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.input {
  width: 400px;
  max-width: 100%;
  margin-bottom: 24px;
}
</style>
