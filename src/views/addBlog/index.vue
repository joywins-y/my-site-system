<template>
  <div class="app-container">
    <EditBlog mode="add" />
  </div>
</template>

<script>
import EditBlog from '@/components/EditBlog'

export default {
  props: {},
  components: { EditBlog },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm('真的要离开吗？您有未保存的更改！')
    if (answer) {
      // this.$router.push('/blog/blogList');
      next()
    } else {
      return false
    }
  }
}
</script>

<style scoped lang="scss">

</style>
