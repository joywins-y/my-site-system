<template>
  <div class="app-container">
    <!-- 列表 -->
    <el-table v-loading="loading" :data="data" element-loading-text="数据正在加载中..." fit highlight-current-row>
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="项目名称" prop="name">
        <template slot-scope="scope">
          <a :href="scope.row.url" class="proName" target="_blank">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="项目描述" prop="description" />
      <el-table-column label="项目预览" prop="thumb">
        <template slot-scope="scope">
          <el-image style="width: 120px;" :src="scope.row.thumb" :preview-src-list="srcList" />
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="Github" placement="top" :hide-after="2000">
            <el-button
              type="primary"
              icon="iconfont icon-github"
              class="github"
              circle
              size="mini"
              @click="handleOpenGithub(scope.row)"
            />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleEdit(scope.row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="2000">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑项目信息" :visible.sync="visible">
      <el-form :model="form">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="项目描述（每一项描述以英文逗号分割）" prop="description">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="项目链接" prop="url">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="GitHub 地址" prop="github">
          <el-input v-model="form.github" />
        </el-form-item>
        <el-form-item label="预览图" prop="thumb">
          <UploadFile v-model="form.thumb" />
        </el-form-item>
        <el-form-item label="排序等级" prop="order">
          <el-select v-model="form.order" placeholder="分类等级">
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
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProject, removeProject } from '@/api/projects'
import UploadFile from '@/components/UploadFile'

export default {
  components: { UploadFile },
  props: {},
  data() {
    return {
      data: [],
      loading: false,
      srcList: [],
      visible: false,
      form: {
        name: '',
        description: '',
        url: '',
        github: '',
        thumb: '',
        order: 1
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getProject().then(({ data }) => {
        this.loading = false
        this.data = data
        for (const i of this.data) {
          this.srcList.push(i.thumb2)
        }
      })
    },
    handleOpenGithub(record) {
      window.open(record.github)
    },
    handleEdit(record) {
      this.visible = true
      this.form = { ...record, description: record.description.toString() }
    },
    handleDelete(record) {
      this.$confirm('确定要删除此项目吗？', '提示', {
        type: 'warning'
      }).then(() => {
        removeProject(record.id).then(() => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSubmit() {
      const obj = { ...this.form }
      obj.description = this.form.description.split(',')
      obj.order = parseInt(this.form.order)

      setProject(obj.id, obj).then(() => {
        this.visible = false
        this.fetchData()
        this.$message.success('修改成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.proName:hover {
  color: rgb(163, 163, 163);
}

.github {
  background-color: rgb(163, 163, 163);
  border: 1px solid rgb(163, 163, 163);
}
</style>
