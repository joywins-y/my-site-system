<template>
  <div>
    <el-form :model="form" label-position="top">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="文章内容">
        <Editor ref="editor" height="600px" :initial-value="form.content" :options="editorOptions" />
      </el-form-item>
      <el-form-item label="文章描述">
        <el-input v-model="form.description" type="textarea" :rows="6" />
      </el-form-item>
      <el-form-item label="文章封面">
        <UploadFile v-model="form.thumb" />
      </el-form-item>
      <el-form-item label="选择分类">
        <el-select slot="prepend" v-model="form.category" placeholder="请选择分类" @change="handleChange">
          <el-option v-for="item in blogTypes" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="handleSubmit">{{ btnText }}</el-button>
    </div>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/i18n/zh-cn'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import { getBlogType, searchBlogType } from '@/api/blogType'
import { searchBlog } from '@/api/blog'
import UploadFile from '@/components/UploadFile'

export default {
  components: {
    UploadFile,
    Editor
  },
  props: {
    mode: { type: String, default: '' }
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        description: '',
        thumb: '',
        category: ''
      },
      btnText: '发布',
      blogTypes: [],
      editorOptions: { language: 'zh-CN' }
    }
  },
  created() {
    /** 获取分类数组 */
    getBlogType().then(({ data }) => {
      this.blogTypes = data
    })
    if (this.mode === 'edit') {
      this.id = this.$route.params.id
      searchBlog(this.id).then(({ data }) => {
        this.form = data
        this.form.category = data.category === null ? '' : data.category.id
        this.$refs.editor.invoke('setHTML')
      })
    }
  },
  methods: {
    handleSubmit() {

    },
    handleChange() {

    }
  }
}
</script>

<style scoped lang="scss">

</style>
