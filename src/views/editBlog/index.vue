<template>
  <div class="app-container">
    <EditBlog mode="edit" :isHint="isHint" @change="handleHint" ref="edit" />
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
    if(this.$refs.edit.form){
      console.log(this.$refs.edit.form);
    }
    if (!this.isHint) {
      next();
      return;
    }
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
