<template>
  <div class="app-container">
    <EditBlog mode="add" ref="add" />
  </div>
</template>

<script>
import EditBlog from '@/components/EditBlog'

export default {
  props: {},
  components: { EditBlog },
  beforeRouteLeave(to, from, next) {
    const markdown = this.$refs.add.$refs.editor.invoke('getMarkdown') // markdown 需要单独监控
    let count = this.$refs.add.updateCount; // 编辑次数
    if (!!markdown) {
      count++;
    }
    if (count <= 1) { // count 大于 1 是编辑多次 需要提示；等于 1 或者小于 1 不需要提示
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

<style scoped lang="scss">

</style>
