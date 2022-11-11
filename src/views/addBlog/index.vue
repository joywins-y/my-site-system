<template>
  <div class="app-container">
    <EditBlog mode="add" :isHint="isHint" @change="handleHint" ref="add" />
  </div>
</template>

<script>
import EditBlog from '@/components/EditBlog'

export default {
  props: {},
  components: { EditBlog },
  data() {
    return {
      isHint: true,
    }
  },
  methods: {
    handleHint(data) {
      this.isHint = data
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

<style scoped lang="scss">

</style>
