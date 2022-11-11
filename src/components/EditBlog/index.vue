<template>
  <div>
    <el-form ref="blogForm" :model="form" label-position="top" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <Editor ref="editor" height="600px" :initial-value="form.content" :options="editorOptions" />
      </el-form-item>
      <el-form-item label="文章描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="6" />
      </el-form-item>
      <el-form-item label="文章封面" prop="thumb">
        <UploadFile v-model="form.thumb" />
      </el-form-item>
      <el-form-item label="选择分类" prop="category">
        <el-select v-model="form.category" placeholder="请选择分类" @change="handleChange">
          <el-option v-for="item in blogTypes" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item align="right">
        <el-button type="primary" @click="handleSubmit('blogForm')">{{ btnText }}</el-button>
        <el-button @click="handleCancel">{{ mode === 'edit' ? "取消编辑" : "取消发布" }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import '@/utils/css.js'
import { Editor } from '@toast-ui/vue-editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import Prism from 'prismjs'

import { getBlogType } from '@/api/blogType'
import { addBlog, searchBlog, updateBlog } from '@/api/blog'
import UploadFile from '@/components/UploadFile'

export default {
  components: { UploadFile, Editor },
  props: {
    mode: { type: String, default: '' },
    isHint: { type: Boolean }
  },
  data() {
    const validateContent = (rule, value, callback) => {
      // 获取到的 html 是有值的，可能得到 <p><br /></p> 实际是空内容的情况
      // 判断 markdown 是否为空更准确
      const markdown = this.$refs.editor.invoke('getMarkdown')
      if (markdown) {
        callback()
      } else {
        callback(new Error('请输入文章内容'))
      }
    }
    return {
      form: {
        title: '',
        content: '',
        description: '',
        thumb: '',
        category: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2-100 个字符', trigger: 'blur' }
        ],
        content: [{ required: true, trigger: 'blur', validator: validateContent }],
        description: [{ required: true, message: '请输入文章描述', trigger: 'blur' }],
        category: [{ required: true, message: '请选择文章分类', trigger: 'blur' }]
      },
      btnText: '发布文章',
      blogTypes: [],
      editorOptions: { language: 'zh-CN', plugins: [colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]] }
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
        this.$refs.editor.invoke('setHTML', data.htmlContent)
      })
    }
  },
  methods: {
    handleChange() {
      // 迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。
      this.$forceUpdate()
    },
    /** 提交 */
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) { // 通过表单验证
          const html = this.$refs.editor.invoke('getHTML')
          const markdown = this.$refs.editor.invoke('getMarkdown')
          const obj = {
            title: this.form.title,
            description: this.form.description,
            categoryId: this.form.category,
            thumb: this.form.thumb,
            toc: [],
            htmlContent: html,
            markdownContent: markdown
          }
          if (this.mode === 'add') { // 新增
            obj.createDate = new Date().getTime()
            addBlog(obj).then(() => {
              this.$router.push('/blog/blogList')
            })
          } else { // 编辑
            obj.updateDate = new Date().getTime()
            updateBlog({ id: this.form.id, data: obj }).then(() => {
              this.$router.push('/blog/blogList')
              this.$message.success('修改成功')
            })
          }
          this.$emit('change', false);
        } else {
          console.log('error submit')
          this.$message.error('请填写所有内容')
          return false
        }
      })
    },
    /** 取消 */
    handleCancel() {
      this.$router.push('/blog/blogList')
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  text-align: right;
}
</style>
