<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%;">
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + (currentPage - 1) * eachPage + 1 }}</template>
      </el-table-column>

      <el-table-column prop="title" label="文章名称">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="文章预览图" width="230" trigger="hover">
            <el-image style="width: 200px" :src="scope.row.thumb" fit="contain" :preview-src-list="imgs" />
            <a slot="reference" href="#" target="_blank" @click="goToTitle(scope.row)">{{ scope.row.title }}</a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="description" label="文章描述" />

      <el-table-column prop="scanNumber" label="浏览量" width="80" />

      <el-table-column prop="commentNumber" label="评论数" width="80" />

      <el-table-column prop="cetagory" label="所属分类" width="100">
        <template slot-scope="scope">
          {{ scope.row.category === null ? "未分类" : scope.row.category.name }}
        </template>
      </el-table-column>

      <el-table-column prop="createDate" label="创建日期" />

      <el-table-column prop="updateDate" label="最近更新" />

      <!-- 操作 -->
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

    <!-- 分页 -->
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      :total="total"
      :current-page.sync="pagerCurPage"
      layout="total, prev, pager, next, ->, sizes, jumper"
      @size-change="changeSize"
      @current-change="changeCurrent"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    />
  </div>
</template>

<script>
import { getBlogList, removeBlog } from '@/api/blog'
import { formatDate } from '@/utils/tools'
import { frontEnd_URL } from '@/utils/url'

export default {
  props: {},
  data() {
    return {
      data: [], // 文章列表
      imgs: [], // 预览图链接数组
      eachPage: 5, // 每一页显示的条数
      currentPage: 1, // 当前页码
      totalPage: 0, // 总页数
      total: 0, // 数据总条数
      pagerCurPage: 1 // 分页栏当前页码
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    /** 获取文章列表 */
    fetchData() {
      getBlogList(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows
        for (const i of this.data) {
          i.createDate = formatDate(i.createDate)
          i.updateDate = formatDate(i.updateDate)
          this.imgs.push(i.thumb)
        }
        this.total = data.total
        this.totalPage = Math.ceil(this.total / this.eachPage)

        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage
          this.fetchData()
        }
      })
    },
    goToTitle(record) {
      window.open(`${frontEnd_URL}/blog/${record.id}`)
    },
    /** 编辑文章 */
    handleEdit(record) {
      this.$router.push(`/blog/editBlog/${record.id}`)
    },
    /** 删除文章 */
    handleDelete(record) {
      this.$confirm('删除该文章会将文章下的评论一同删除，是否继续？', '是否删除该文章', {
        type: 'warning'
      }).then(() => {
        removeBlog(record.id).then(() => {
          this.fetchData()
          this.$message({ type: 'success', message: '删除成功！' })
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '取消删除' })
      })
    },
    changeSize(pageNum) {
      this.eachPage = parseInt(pageNum)
      this.currentPage = 1
      this.pagerCurPage = 1
      this.fetchData()
    },
    changeCurrent(pageNum) {
      this.currentPage = parseInt(pageNum)
      this.fetchData()
    },
    handlePrevClick() {
      this.currentPage -= 1
    },
    handleNextClick() {
      this.currentPage += 1
    }
  }
}
</script>

<style>

</style>
