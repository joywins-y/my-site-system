<template>
  <div class="app-container">
    <!-- 列表 -->
    <el-table :data="data" v-loading="loading" element-loading-text="数据正在加载中..." fit highlight-current-row>
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column label="项目名称" prop="name">
        <template slot-scope="scope">
          <a :href="scope.row.url" class="pro_name" target="_blank">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="项目描述" prop="description"></el-table-column>
      <el-table-column label="项目预览" prop="thumb">
        <template slot-scope="scope">
          <el-image style="width: 120px;" :src="scope.row.thumb" :preview-src-list="srcList"></el-image>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="Github" placement="top" :hide-after="2000">
            <el-button type="primary" icon="iconfont icon-github" class="github" circle size="mini"
              @click="handleOpenGithub(scope.row)" />
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

  </div>
</template>

<script>
import { getProject, removeProject } from '@/api/projects';

export default {
  props: {},
  components: {},
  data() {
    return {
      data: [],
      loading: false,
      srcList: [],
      visible: false,
      form: {

      }
    }
  },
  methods: {
    fetchData() {
      this.loading = true;
      getProject().then(({ data }) => {
        this.loading = false;
        this.data = data;
        for (const i of this.data) {
          this.srcList.push(i.thumb2);
        }
      })
    },
    handleOpenGithub(record) {
      window.open(record.github);
    },
    handleEdit(record) {
      this.visible = true;
      this.form = { ...record, description: record.description.toString() }
    },
    handleDelete(record) {
      this.$confirm("确定要删除此项目吗？", "提示", {
        type: 'warning'
      }).then(() => {
        removeProject(record.id).then(() => {
          this.fetchData();
          this.$message({
            type: "success",
            message: "删除成功！",
          });
        });
      })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        })
    }
  }
}
</script>

<style>

</style>
