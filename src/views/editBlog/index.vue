<template>
  <div class="app-container">
    <EditBlog mode="edit" ref="edit" />
  </div>
</template>

<script>
import EditBlog from '@/components/EditBlog'

export default {
  props: {},
  components: { EditBlog },
  beforeRouteLeave(to, from, next) {
    const content = this.$refs.edit.form.htmlContent; // 上一次更新的文章内容
    const html = this.$refs.edit.$refs.editor.invoke('getHTML') // markdown 需要单独监控
    let count = this.$refs.edit.updateCount; // 编辑次数

    if (content !== html) {
      count++;
    }
    if (count <= 2) { // count 大于 2 是编辑多次 需要提示；等于 2 或者小于 2 不需要提示
      next();
      return;
    }
    const answer = window.confirm('真的要离开吗？您有未保存的更改！')
    if (answer) {
      next()
    } else {
      return false
    }
  }
}
</script>

<style>

</style>
