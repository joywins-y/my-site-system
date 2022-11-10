<template>
  <div class="app-container">
    <el-form :model="form">
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入项目的名称" />
      </el-form-item>
      <el-form-item label="项目描述（每一项描述以英文逗号分割）" prop="description">
        <el-input v-model="form.description" placeholder="请输入项目的描述，每一项描述以英文逗号分割" />
      </el-form-item>
      <el-form-item label="项目链接" prop="url">
        <el-input v-model="form.url" placeholder="请输入项目的链接" />
      </el-form-item>
      <el-form-item label="GitHub 地址" prop="github">
        <el-input v-model="form.github" placeholder="请输入项目的 github 地址" />
      </el-form-item>
      <el-form-item label="预览图" prop="thumb">
        <UploadFile v-model="form.thumb" />
      </el-form-item>
      <el-form-item label="项目等级" prop="order">
        <el-select v-model="form.order" placeholder="分类等级">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="4" value="4" />
          <el-option label="5" value="5" />
        </el-select>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" plain @click="handleAddProject">发布项目</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addProject } from '@/api/projects'
import UploadFile from '@/components/UploadFile'

export default {
  components: { UploadFile },
  props: {},
  data() {
    return {
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
  methods: {
    handleAddProject() {
      const obj = { ...this.form }
      obj.description = obj.description.split(',')
      obj.order = parseInt(obj.order)
      addProject(obj).then(() => {
        this.$router.push('/projectsList')
        this.$message.success('项目发布成功')
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm('真的要离开吗？您有未保存的更改！')
    if (answer) {
      next()
    } else {
      return false
    }
  }
}
</script>

<style scoped lang="less">

</style>
