<template>
  <div class="app-container">
    <EditProject mode="add" ref="add" />
  </div>
</template>

<script>
import EditProject from '@/components/EditProject'

export default {
  props: {},
  components: { EditProject },
  beforeRouteLeave(to, from, next) {
    let count = this.$refs.add.updateCount; // 编辑次数
    console.log(count);
    if (count < 1) { // count 大于 1 是编辑多次 需要提示；等于 1 或者小于 1 不需要提示
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

<style scoped lang="less">

</style>
