<template>
  <div class="app-container">
    <!-- 评论列表 -->
    <el-table v-loading="loading" :data="data" element-loading-text="数据加载中..." fit highlight-current-row>
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">{{ scope.$index + (currentPage - 1) * eachPage + 1 }}</template>
      </el-table-column>
      <el-table-column label="头像" align="center" width="80">
        <template slot-scope="scope">
          <el-avatar shape="square" size="small" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" width="150" prop="nickname" />
      <el-table-column label="评论文章" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.blog.title }}</template>
      </el-table-column>
      <el-table-column label="评论内容" align="center" prop="content" />
      <el-table-column label="评论日期" align="center" width="230" prop="createDate" />
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="1500">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDelete(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        style="margin-top: 30px"
        background
        :page-size="eachPage"
        :page-sizes="[5, 10, 15, 20]"
        layout="prev, pager, next, total, ->,sizes, jumper"
        :total="count"
        :current-page.sync="pagerCurrentPage"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { getComment, removeComment } from '@/api/comment'
import { formatDate } from '@/utils/tools'

export default {
  props: {},
  data() {
    return {
      loading: false,
      currentPage: 1,
      eachPage: 10,
      totalPage: 0,
      total: 0,
      data: [],
      pagerCurrentPage: 1
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getComment(this.currentPage, this.eachPage).then(({ data }) => {
        this.loading = false
        this.data = data.rows
        for (const i of this.data) {
          i.createDate = formatDate(i.createDate) // 时间格式处理
        }
        this.total = data.total // 总条数
        this.totalPage = Math.ceil(this.total / this.eachPage) // 总页数
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage
          this.fetchData()
        }
      })
    },
    handleDelete({ id }) {
      this.$confirm('是否删除此条评论信息？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$message({ type: 'success', message: '删除成功！' })
        removeComment(id).then((res) => this.fetchData())
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    // 点击上一页，下一页，不用重新发送请求
    // 因为当前页码改变会触发 handleCurrentChange 事件，然后就会自动发送请求了
    // 点击上一页
    handlePrevClick() {
      this.currentPage -= 1
    },
    // 点击下一页
    handleNextClick() {
      this.currentPage += 1
    },
    // 点击页码
    handleCurrentChange(pageNum) {
      this.currentPage = ~~pageNum
      this.fetchData()
    },
    // 改变每页显示条数
    handleSizeChange(pagerNum) {
      this.currentPage = 1
      this.pagerCurrentPage = 1
      this.eachPage = ~~pagerNum
      this.fetchData()
    }
  }
}
</script>

<style>

</style>
