<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <!-- name: {{ name }} -->
      欢迎使用！
    </div>
    <div class="echarts-box">
      <DataAnalysis />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DataAnalysis from './components/dataAnalysis.vue'

export default {
  name: 'Dashboard',
  components: { DataAnalysis },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.echarts-box {
  padding: 24px;
}
</style>
