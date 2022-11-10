<template>
  <div class="app-container">
    <EditBlog mode="edit" />
  </div>
</template>

<script>
import EditBlog from '@/components/EditBlog'

export default {
  components: { EditBlog },
  props: {},
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

<style>

</style>
